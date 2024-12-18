import { Download } from "@/models/Download";
import Modal from "../modal/Modal";
import ModalHeader from "../modal/ModalHeader";
import FileIcon from "./files/FileIcon";
import prettyBytes from "pretty-bytes";
import ModalFooter from "../modal/ModalFooter";

export interface FileModalProps {
    show: boolean
    setShow: (value: boolean) => void
    download: Download
    files: DownloadFile[]
}

export default function FileModal({ download, files, show, setShow }: FileModalProps) {
    return (
        <Modal show={show} setShow={setShow}>
            <ModalHeader>
                <h3 className="text-xl">Download {download.title}</h3>
            </ModalHeader>
            <ul className="px-5 pb-5 space-y-1">
                {files.length === 0 && 
                    <p>No files here...</p>
                }
                {files.map(file => {
                    return (
                        <li key={file.id} className="space-x-2">
                            <FileIcon file={file} />
                            <a href={`/downloads/${download.id}/file/${file.filename}`}
                                className="transition text-link hover:text-link-hover hover:underline">
                                {file.filename}
                            </a>
                            <span className="font-semibold">
                                {prettyBytes(file.size)}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </Modal>
    )
}
