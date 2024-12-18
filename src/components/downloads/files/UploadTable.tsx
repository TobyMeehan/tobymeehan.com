import Table from "@/components/tables/Table";
import TableRow from "@/components/tables/TableRow";
import Uppy from "@uppy/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faPause, faPauseCircle, faPlay, faRotateRight, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/components/IconButton";
import useUppyState from "@uppy/react/lib/useUppyState.js"

export interface UploadTableProps {
    uppy: Uppy
}

export default function UploadTable({ uppy }: UploadTableProps) {
    const files = useUppyState(uppy, state => state.files)

    return (
        <Table>
            {Object.values(files).map((file, i) => {
                return (
                    <TableRow key={i}>
                        <td className="p-4 text-nowrap">
                            {file.error
                                ? <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                                : !!file.isPaused
                                    ? <FontAwesomeIcon icon={faPauseCircle} className="mr-2" />
                                    : <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                            }

                            <span>
                                {file.meta["x-filename"] as string ?? file.name}
                            </span>
                        </td>
                        <td className="w-full">
                            {file.error
                                ? <div className="text-negative">
                                    {file.error}
                                </div>
                                : <div className="h-5 rounded overflow-hidden bg-dark-700">
                                    <div style={{ width: `${file.progress.percentage ?? 0}%` }}
                                        className={`${!!file.isPaused ? "bg-cautious" : "bg-positive"} h-full transition-[width] ease-in-out duration-1000`}></div>
                                </div>
                            }

                        </td>
                        <td className="py-1.5 px-3 space-x-5 text-nowrap">
                            {file.error &&
                                <IconButton icon={faRotateRight} onClick={() => uppy.retryUpload(file.id)} />
                            }
                            <IconButton icon={!!file.isPaused ? faPlay : faPause} onClick={() => uppy.pauseResume(file.id)} />
                            <IconButton icon={faXmark} onClick={() => uppy.removeFile(file.id)} />
                        </td>
                    </TableRow>
                )
            })}
        </Table>
    )
}
