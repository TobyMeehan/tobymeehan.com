import Modal from "@/components/modal/Modal"
import ModalHeader from "@/components/modal/ModalHeader"
import EditFileForm from "./EditFileForm"
import SubmitButton from "@/components/forms/SubmitButton"
import ModalFooter from "@/components/modal/ModalFooter"

export interface EditFileModalProps {
    downloadId: string
    file: DownloadFile
    show: boolean
    setShow: (value: boolean) => void
    onEdited: (file: DownloadFile) => void
}

export default function EditFileModal({ downloadId, file, show, setShow, onEdited }: EditFileModalProps) {
    return (
        <Modal show={show} setShow={setShow}>
            <ModalHeader>
                <h3 className="text-xl">Edit File</h3>
            </ModalHeader>
            <EditFileForm downloadId={downloadId} file={file} onChange={f => {
                setShow(false)
                onEdited(f)
            }} submit={
                <ModalFooter>
                    <SubmitButton>Save</SubmitButton>
                </ModalFooter>
            } />
        </Modal>
    )
}
