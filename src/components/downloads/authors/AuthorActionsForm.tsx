"use client"

import { kickAuthor } from "@/actions/author/kickAuthor";
import { Author } from "@/models/Author";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormState } from "react-dom";

export default function AuthorActionsForm({ downloadId, author }: { downloadId: string, author: Author }) {
    const [kickState, kickAction] = useFormState(kickAuthor.bind(null, downloadId, author.id), {})

    return (
        <div>
            {!author.isOwner &&
                <form action={kickAction}>
                    <button type="submit" className="size-8 rounded-full transition hover:bg-dark-700 active:bg-dark-750">
                        <FontAwesomeIcon icon={faUserXmark} />
                    </button>
                </form>
            }
        </div>
    )
}