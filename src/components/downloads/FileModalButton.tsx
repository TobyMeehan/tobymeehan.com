"use client"

import { useState } from "react"
import Button from "../Button"
import { createPortal } from "react-dom"
import FileModal from "./FileModal"
import { Download } from "@/models/Download"

export interface FileModalButtonProps {
    download: Download
    files: DownloadFile[]
}

export default function FileModalButton({ download, files }: FileModalButtonProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button onClick={() => setShowModal(true)}>
                Download
            </Button>

            {showModal && createPortal(
                <FileModal download={download} files={files} show={showModal} setShow={setShowModal} />,
                document.body
            )}
        </>
    )
}