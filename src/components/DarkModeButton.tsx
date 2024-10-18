"use client"

import { toggleDarkMode } from "@/actions/darkMode";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DarkModeButton({ isDarkMode }: { isDarkMode: boolean }) {
    return (
        <button onClick={() => toggleDarkMode()}>
            <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
        </button>
    )
}