import Link from "next/link"

export default function Products(){
    return (
        <div>
            <Link href={"/products/new"} className="btn-primary">Add new Products</Link>
        </div>
    )
}