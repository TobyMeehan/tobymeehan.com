"use client"

import { useState } from "react"
import Button, { ButtonProps } from "../Button"
import { createPortal } from "react-dom"
import FileModal from "./FileModal"
import { Download } from "@/models/Download"

export interface FileModalButtonProps extends ButtonProps {
    download: Download
    files: DownloadFile[]
}

export default function FileModalButton({ download, files, ...props }: FileModalButtonProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Button onClick={() => setShowModal(true)} {...props} />

            {showModal && createPortal(
                <FileModal download={download} files={files} show={showModal} setShow={setShowModal} />,
                document.body
            )}
        </>
    )
}