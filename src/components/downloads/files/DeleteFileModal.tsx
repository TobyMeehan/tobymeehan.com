import Modal from "@/components/modal/Modal"
import ModalHeader from "@/components/modal/ModalHeader"
import DeleteFileForm from "./DeleteFileForm"
import ModalFooter from "@/components/modal/ModalFooter"
import SubmitButton from "@/components/forms/SubmitButton"
import { DownloadFile } from "@/models/File"

export interface DeleteFileModalProps {
    downloadId: string
    file: DownloadFile
    show: boolean
    setShow: (value: boolean) => void
    onDeleted?: () => void
}

export default function DeleteFileModal({ downloadId, file, show, setShow, onDeleted }: DeleteFileModalProps) {
    return (
        <Modal show={show} setShow={setShow}>
            <ModalHeader>
                <h3 className="text-xl">Delete {file.filename}</h3>
            </ModalHeader>
            <DeleteFileForm downloadId={downloadId} file={file} onDeleted={() => {
                setShow(false)
                if (onDeleted) {
                    onDeleted()
                }
            }}
                submit={
                    <ModalFooter>
                        <SubmitButton appearance="negative">Delete</SubmitButton>
                    </ModalFooter>
                } />
        </Modal>
    )
}
