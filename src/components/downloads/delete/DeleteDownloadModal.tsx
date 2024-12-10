import Modal from "@/components/modal/Modal";
import ModalHeader from "@/components/modal/ModalHeader";
import { Download } from "@/models/Download";
import DeleteDownloadForm from "./DeleteDownloadForm";
import ModalFooter from "@/components/modal/ModalFooter";
import SubmitButton from "@/components/forms/SubmitButton";

export interface DeleteDownloadModalProps {
    download: Download
    show: boolean
    setShow: (value: boolean) => void
}

export default function DeleteDownloadModal({ download, show, setShow }: DeleteDownloadModalProps) {
    return (
        <Modal show={show} setShow={setShow}>
            <ModalHeader>
                <h3 className="text-xl">Delete <span className="font-bold">{download.title}</span>?</h3>
            </ModalHeader>
            <DeleteDownloadForm download={download} submit={
                <ModalFooter>
                    <SubmitButton appearance="negative">Delete</SubmitButton>
                </ModalFooter>
            } />
        </Modal>
    )
}
