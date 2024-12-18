"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Uppy, { } from "@uppy/core"
import DropTarget from "@uppy/drop-target"
import { RestrictionError } from "@uppy/core/lib/Restricter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faUpload } from "@fortawesome/free-solid-svg-icons";

export interface InputFilesProps {
    uppy: Uppy
}

export default function InputFiles({ uppy }: InputFilesProps) {
    const uploadRef = useRef<HTMLLabelElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const [dragging, setDragging] = useState(false)
    const [errors, setErrors] = useState<string[]>([])

    useEffect(() => {
        if (uppy.getPlugin("droptarget")) {
            return
        }

        uppy.use(DropTarget, {
            id: "droptarget",
            target: uploadRef.current,
            onDragOver() {
                setDragging(true)
            },
            onDragLeave() {
                setDragging(false)
            },
            onDrop() {
                setDragging(false)
            }
        })
    }, [uppy, uploadRef])

    const change = (event: ChangeEvent<HTMLInputElement>) => {
        setErrors([])

        const files = Array.from(event.target.files ?? [])

        files.forEach(file => {
            try {
                uppy.addFile({
                    source: "file input",
                    name: file.name,
                    type: file.type,
                    data: file
                })
            } catch (error) {
                if (error instanceof RestrictionError) {
                    setErrors([error.message])
                }
            }
        })
    }

    uppy.on("file-removed", () => {
        inputRef.current!.value = null!
    })

    uppy.on("complete", () => {
        inputRef.current!.value = null!
    })

    return (
        <div className="p-3 rounded border border-dark-700">
            <label htmlFor="files" ref={uploadRef}
                className={`block grow rounded-lg p-3 transition border border-dark-900 hover:bg-dark-950 hover:cursor-pointer hover:shadow-none ${dragging ? "border border-positive bg-dark-950" : "bg-dark-900 shadow-lg"}`}>

                <div>
                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                    Drop here or <span className="text-link hover:underline">browse</span>
                </div>

                <input type="file" id="files" ref={inputRef} className="hidden" onChange={change} />

            </label>


            {errors.map(error => {
                return (
                    <div className="text-negative mt-3">
                        <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
                        <span>{error}</span>
                    </div>
                )
            })

            }
        </div>
    )
}
