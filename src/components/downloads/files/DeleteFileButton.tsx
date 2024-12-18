"use client"

import IconButton from "@/components/IconButton"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { createPortal } from "react-dom"
import DeleteFileModal from "./DeleteFileModal"
import { DownloadFile } from "@/models/File"

export interface DeleteFileButtonProps {
    downloadId: string
    file: DownloadFile
    onDeleted?: () => void
}

export default function DeleteFileButton({ downloadId, file, onDeleted }: DeleteFileButtonProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <IconButton icon={faTrash} aria-label="Delete" onClick={() => setShowModal(true)} />

            {showModal && createPortal(
                <DeleteFileModal show={showModal} setShow={setShowModal} downloadId={downloadId} file={file} onDeleted={onDeleted} />,
                document.body
            )}
        </>
    )
}
