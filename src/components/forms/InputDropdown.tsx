"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

export interface InputDropdownProps {
    id?: string
    name?: string
    options: { value: string, label: ReactNode }[]
    defaultValue?: string
}

export default function InputDropdown({ id, name, options, defaultValue }: InputDropdownProps) {
    const [showDropdown, setShowDropdown] = useState(false)
    const [currentOption, setCurrentOption] = useState(options.find(x => x.value === defaultValue) ?? options[0])

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
                <input name={name} type="hidden" value={currentOption.value} />
                {currentOption.label}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className="ml-auto size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
            </button>
            <div className={`${showDropdown ? "" : "hidden"} absolute w-full p-3 mt-2 space-y-1 rounded-lg overflow-hidden bg-dark-900 shadow-lg`}>
                {options.map(option => {
                    return (
                        <button key={option.value} type="button" onClick={() => {
                            setShowDropdown(false)
                            setCurrentOption(option)
                        }}
                            className="block w-full p-1 px-2 rounded transition hover:bg-dark-950 text-lg text-left">
                            {option.label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}