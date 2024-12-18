"use client"

import { inviteAuthor } from "@/actions/author/inviteAuthor"
import { searchUser, SearchUserResult } from "@/actions/author/searchUsers"
import InputText from "@/components/forms/InputText"
import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useState } from "react"
import { useFormState } from "react-dom"

export default function SearchUserForm({ downloadId }: { downloadId: string }) {
    const [searchState, setSearchState] = useState<SearchUserResult>({})
    const [inviteState, inviteAction] = useFormState(inviteAuthor.bind(null, downloadId), {})

    return (
        <>
            <div className="flex items-center">
                <InputText id="search" name="query" required maxLength={41}
                    placeholder="Search for users e.g. @John"
                    valid={searchState.errors?.query?.length ?? 0 > 0 ? false : undefined}
                    onChange={async event => {
                        const result = await searchUser(event.currentTarget.value)
                        setSearchState(result)
                    }} />
            </div>
            <span className="text-sm text-negative">
                {searchState.errors?.query?.at(0)}
            </span>

            <div className="my-3 mx-auto">
                {searchState.result?.status === "success"
                    ? <div className="flex flex-col items-center">
                        <div className="flex items-center">
                            <Image src={`https://thavyra.xyz/api/users/${searchState.result.user.id}/avatar.png`} alt="Avatar"
                                width={500} height={500} className="size-10 rounded-full mr-2" />

                            <span className="text-2xl text-bright font-semibold">
                                {searchState.result.user.username}
                            </span>

                            <form action={inviteAction} className="ml-3">
                                <input type="hidden" name="userId" value={searchState.result.user.id} />
                                <button type="submit" className="size-10 rounded-full transition hover:bg-dark-700 active:bg-dark-750 text-xl">
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </button>
                            </form>
                        </div>
                        <span className="text-sm text-negative">
                            {inviteState.result?.status === "failed" && inviteState.result.message}
                            {inviteState.errors?.userId?.at(0)}
                        </span>
                    </div>
                    : <></>
                }
            </div>


        </>
    )
}
