import { Session } from "next-auth";
import { env } from "next-runtime-env";

type FetchResult =
    | OkResult
    | FailedResult

type DataFetchResult<T> =
    | DataResult<T>
    | FailedResult

type OkResult = {
    status: SuccessStatus
    data?: any
}

type DataResult<T> = {
    status: SuccessStatus
    data: T
}

type SuccessStatus = 200 | 201 | 204

type FailedResult =
    | BadRequestResult
    | ForbiddenResult
    | NotFoundResult
    | ServerErrorResult
    | ExceptionResult

type BadRequestResult = {
    status: 400
    errors: ValidationError[]
}

type ForbiddenResult = {
    status: 403
    errors?: ValidationError[]
}

type NotFoundResult = {
    status: 404
}

type ServerErrorResult = {
    status: 500 | 503
}

type ExceptionResult = {
    status: "Exception"
}

type ValidationError = {
    name: string
    reason: string
}

export async function getBackend<T>(path: string, session?: Session | null, init?: RequestInit): Promise<DataFetchResult<T>> {
    const response = await fetchBackend(path, session, undefined, { ...init, method: "GET" })

    if (response.status === 200) {
        return {
            status: response.status,
            data: response.data as T
        }
    }

    return response as FailedResult
}

export async function postBackend<T>(path: string, session?: Session | null, body?: any, init?: RequestInit): Promise<DataFetchResult<T>> {
    const response = await fetchBackend(path, session, body, { ...init, method: "POST" })

    if (response.status === 201) {
        return {
            status: response.status,
            data: response.data as T
        }
    }

    return response as FailedResult
}

export async function patchBackend<T>(path: string, session?: Session | null, body?: any, init?: RequestInit): Promise<DataFetchResult<T>> {
    const response = await fetchBackend(path, session, body, { ...init, method: "PATCH" })

    if (response.status === 200) {
        return {
            status: response.status,
            data: response.data as T
        }
    }

    return response as FailedResult
}

export async function putBackend<T>(path: string, session?: Session | null, body?: any, init?: RequestInit): Promise<DataFetchResult<T>> {
    const response = await fetchBackend(path, session, body, { ...init, method: "PUT" })

    if (response.status === 200) {
        return {
            status: response.status,
            data: response.data as T
        }
    }

    return response as FailedResult
}

export async function deleteBackend(path: string, session?: Session | null, init?: RequestInit) {
    const response = await fetchBackend(path, session, undefined, { ...init, method: "DELETE" })

    return response
}

async function fetchBackend(path: string, session?: Session | null, body?: any, init?: RequestInit): Promise<FetchResult> {
    let headers: HeadersInit = {
        ...init?.headers
    }

    if (session) {
        headers = {
            ...headers,
            "Authorization": `Bearer ${session.apiToken}`
        }
    }

    if (body && !(body instanceof FormData)) {
        headers = {
            ...headers,
            "Content-Type": "application/json"
        }
    }

    const response = await fetch(env("API_URL") + path, {
        ...init,
        headers: headers,
        body: body instanceof FormData ? body
            : JSON.stringify(body)
    })

    try {

        const data = await response.json()

        if (!response.ok) {
            return data
        }

        return {
            status: response.status as SuccessStatus,
            data: data
        }

    } catch (error) {

        console.error(error)

        return {
            status: response.status
        } as FetchResult

    }
}