import AuthorTable from "@/components/downloads/authors/AuthorTable";
import SearchUserForm from "@/components/downloads/authors/SearchUserForm";

export default function AuthorsPage({ params }: { params: { id: string } }) {
    return (
        <>
            <h2 className="text-3xl font-light">Authors</h2>
            <hr className="border-dark-700 my-5" />
            <div className="max-w-2xl mx-auto my-8">
                <SearchUserForm downloadId={params.id} />
            </div>

            <AuthorTable downloadId={params.id} />
        </>
    )
}
