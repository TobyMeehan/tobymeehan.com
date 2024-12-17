export type Download = {
    id: string

    title: string
    summary: string
    description: string

    visibility: "public" | "unlisted" | "private"
    version: string | null

    createdAt: string | null
    updatedAt: string | null
}