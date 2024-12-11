import AuthorTable from "@/components/downloads/authors/AuthorTable";
import SearchUserForm from "@/components/downloads/authors/SearchUserForm";

export default function AuthorsPage({ params }: { params: { id: string } }) {
    return (
        <>
            <div className="max-w-2xl mx-auto mb-8">
                <SearchUserForm downloadId={params.id} />
            </div>

            <AuthorTable downloadId={params.id} />
        </>
    )
}
