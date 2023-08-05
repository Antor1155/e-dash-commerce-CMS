import Link from "next/link"

export default function Products(){
    return (
        <div>
            <Link href={"/products/new"} className="bg-blue-900 text-white rounded-md py-1 px-2">Add new Products</Link>
        </div>
    )
}