"use client"

import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useRef, useEffect, ReactNode } from "react"

export interface InputOwnerDropdownProps {
    id?: string
    currentUser: ReactNode
}

export default function InputOwnerDropdown({ id, currentUser }: InputOwnerDropdownProps) {
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const click = (event: MouseEvent) => {
            if (!dropdownRef.current?.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }

        addEventListener("click", click)

        return () => removeEventListener("click", click)
    })

    return (
        <div ref={dropdownRef} className="relative">
            <button id={id} type="button" onClick={() => setShowDropdown(!showDropdown)}
                className={`${showDropdown ? "bg-dark-950" : "bg-dark-900"} flex items-center w-full py-1.5 pl-3 pr-1 rounded text-lg text-light transition focus:bg-dark-950 shadow-md hover:bg-dark-950 hover:shadow-none hover:cursor-pointer`}>
                {currentUser}
            </button>
            <div className={`${showDropdown ? "" : "hidden"} absolute w-full p-3 mt-2 space-y-1 rounded-lg overflow-hidden bg-dark-900 shadow-lg`}>
                <button type="button" onClick={() => setShowDropdown(false)}
                    className="block w-full p-1 px-2 rounded transition hover:bg-dark-800 text-lg text-left">
                    {currentUser}
                </button>
                <button type="submit" className="flex items-center w-full p-1 px-2 rounded transition hover:bg-dark-800 text-lg text-left">
                    <FontAwesomeIcon icon={faUserCircle} className="size-6 mr-2" />
                    Change account...
                </button>
            </div>
        </div>
    )
}
