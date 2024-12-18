"use client"

import Button, { ButtonProps } from "@/components/Button"
import { Download } from "@/models/Download"
import { useState } from "react"
import { createPortal } from "react-dom"
import DeleteDownloadModal from "./DeleteDownloadModal"

export interface DeleteDownloadButtonProps extends ButtonProps {
    download: Download
}

export default function DeleteDownloadButton({ download, ...props }: DeleteDownloadButtonProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button onClick={() => setShowModal(true)} {...props} appearance="negative">
                Delete
            </Button>

            {showModal && createPortal(
                <DeleteDownloadModal show={showModal} setShow={setShowModal} download={download} />,
                document.body
            )}
        </>
    )
}
