"use client"

import IconButton from "@/components/IconButton"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { createPortal } from "react-dom"
import EditFileModal from "./EditFileModal"
import { DownloadFile } from "@/models/File"

export interface EditFileButtonProps {
    downloadId: string
    file: DownloadFile
    onEdited: (file: DownloadFile) => void
}

export default function EditFileButton({ downloadId, file, onEdited }: EditFileButtonProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <IconButton icon={faPen} aria-label="Edit" onClick={() => setShowModal(true)} />

            {showModal && createPortal(
                <EditFileModal downloadId={downloadId} file={file} show={showModal} setShow={setShowModal} onEdited={onEdited} />,
                document.body
            )}
        </>
    )
}
