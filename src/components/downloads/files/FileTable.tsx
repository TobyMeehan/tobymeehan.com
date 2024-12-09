import Table from "@/components/tables/Table"
import TableRow from "@/components/tables/TableRow"
import FileIcon from "./FileIcon"
import prettyBytes from "pretty-bytes"
import ClientDateTime from "@/components/ClientDateTime"
import DeleteFileButton from "./DeleteFileButton"
import EditFileButton from "./EditFileButton"
import DownloadFileButton from "./DownloadFileButton"

export interface FileTableProps {
    downloadId: string
    files: DownloadFile[]
    onFileDeleted?: (file: DownloadFile) => void
    onFileEdited?: (file: DownloadFile) => void
}

export default function FileTable({ downloadId, files, onFileEdited, onFileDeleted }: FileTableProps) {
    return (
        <Table>
            {files.length === 0 &&
                <tr>
                    <td className="p-4 text-center" colSpan={4}>
                        No files yet!
                    </td>
                </tr>
            }
            {files.map(file => {
                return (
                    <TableRow key={file.id}>
                        <td className="p-4 text-nowrap">
                            <FileIcon file={file} />
                            <span className="ml-2 text-bright">
                                {file.filename}
                            </span>
                        </td>
                        <td className="p-3">
                            {prettyBytes(file.size)}
                        </td>
                        <td className="p-3 text-center">
                            <ClientDateTime dateTime={file.createdAt} />
                        </td>
                        <td className="py-1.5 px-3 space-x-5 text-right">
                            <DownloadFileButton downloadId={downloadId} file={file} />
                            {onFileEdited &&
                                <EditFileButton downloadId={downloadId} file={file} onEdited={onFileEdited} />
                            }
                            {onFileDeleted &&
                                <DeleteFileButton downloadId={downloadId} file={file} onDeleted={() => onFileDeleted(file)} />
                            }
                        </td>
                    </TableRow>
                )
            })}
        </Table>
    )
}
