import { auth } from "@/auth";
import { getBackend, postBackend } from "@/data/fetch";
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

    const fileResponse = await fetch(file.url)

    if (fileResponse.status === 416) {
        return new Response(null, { status: 416 })
    }

    if (!fileResponse.ok) {
        return new Response("Something went wrong...", { status: 500 })
    }

    const data = await fileResponse.blob()

    const range = parseRange(request.headers, file.size)

    if (!range.isRangeRequest) {
        const response = new NextResponse(data, { status: 200 })

        response.headers.set("Content-Type", file.contentType)
        response.headers.set("Content-Length", file.size.toString())
        response.headers.set("Content-Disposition", `attachment;filename=${file.filename}`)
        response.headers.set("Accept-Ranges", "bytes")

        return response
    }

    if (!range.isValid) {
        const response = new NextResponse(null, { status: 416 })

        response.headers.set("Content-Range", `bytes */${file.size}`)

        return response
    }

    const response = new NextResponse(data.slice(range.start, range.end), {status: 206})

    response.headers.set("Content-Type", file.contentType)
    response.headers.set("Content-Length", range.length.toString())
    response.headers.set("Content-Range", `bytes ${range.start}-${range.end}/${file.size}`)
    response.headers.set("Content-Disposition", `attachment;filename=${file.filename}`)

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
