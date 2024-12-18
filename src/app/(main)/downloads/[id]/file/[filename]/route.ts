import { auth } from "@/auth";
import { postBackend } from "@/data/fetch";
import { DownloadFile } from "@/models/File";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string, filename: string } }) {
    console.log(`/downloads/${params.id}/file/${params.filename} requested`)

    const session = await auth()

    const dataResponse = await postBackend<DownloadFile & { url: string }>(`/downloads/${params.id}/downloads`, session, {
        filename: params.filename
    })

    if (dataResponse.status === 403 || dataResponse.status === 401) {
        return new Response("You do not have permission to view this file.", { status: 403 })
    }

    if (dataResponse.status === 404) {
        return new Response("File not found.", { status: 404 })
    }

    if (dataResponse.status !== 200) {
        return new Response("Something went wrong...", { status: 500 })
    }

    const file = dataResponse.data

    const range = parseRange(request.headers, file.size)

    const headers = new Headers()

    if (range.isRangeRequest) {
        if (!range.isValid) {
            const response = new NextResponse(null, { status: 416 })

            response.headers.set("Content-Range", `bytes */${file.size}`)

            return response
        }

        headers.set("Range", `bytes=${range.start}-${range.end}`)
    }

    const fileResponse = await fetch(file.url, { headers })

    if (fileResponse.status === 416) {
        return new Response(null, { status: 416 })
    }

    if (!fileResponse.ok) {
        return new Response("Something went wrong...", { status: 500 })
    }

    const response = new NextResponse(fileResponse.body, { status: range.isRangeRequest ? 206 : 200 })

    response.headers.set("Content-Type", file.contentType)
    response.headers.set("Content-Length", file.size.toString())
    response.headers.set("Content-Disposition", `attachment;filename=${file.filename}`)

    if (range.isRangeRequest) {
        response.headers.set("Content-Range", `bytes ${range.start}-${range.end}/${file.size}`)
    } else {
        response.headers.set("Accept-Ranges", "bytes")
    }

    return response
}

function parseRange(headers: Headers, fileSize: number): {
    isRangeRequest: false
} | {
    isRangeRequest: true
    isValid: false
} | {
    isRangeRequest: true
    isValid: true
    start: number
    end: number
    length: number
} {
    const range = headers.get("Range")

    if (!range || range.trim().length === 0) {
        return {
            isRangeRequest: false
        }
    }

    if (range.includes(",")) {
        return {
            isRangeRequest: false
        }
    }

    if (!range.startsWith("bytes=")) {
        return {
            isRangeRequest: false
        }
    }

    const [start, end] = range.replace("bytes=", "").split("-").map(x => parseInt(x, 10))

    if (isNaN(start) || isNaN(end)) {
        return {
            isRangeRequest: false
        }
    }

    if (start > fileSize || end > fileSize) {
        return {
            isRangeRequest: true,
            isValid: false
        }
    }

    return {
        isRangeRequest: true,
        isValid: true,
        start,
        end,
        length: start - end + 1
    }
}
