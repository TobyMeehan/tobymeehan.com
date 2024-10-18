"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function toggleDarkMode() {
    const isDarkMode = (cookies().get("darkMode")?.value ?? "on") === "on"

    cookies().set("darkMode", isDarkMode ? "off": "on")

    revalidatePath("/")

}