import Link from 'next/link'
import { client, urlFor } from "@/sanity/lib/client";

async function getData() {
    const query = `*[_type == "about"]{aboutName, "aboutSlug":aboutSlug.current}`
    const data = await client.fetch(query);
    return data;
};

export default async function MobileMenu() {
    return <nav className="bottom-2 fixed flex gap-2 w-full px-2 h-10 left-0 right-0">

        <Link href="/" className="flex-1 flex items-center justify-center bg-gray-300 border border-gray-600 shadow-md">
            Home
        </Link>
        <Link href="/about" className="flex-1 flex items-center justify-center bg-gray-300 border border-gray-600 shadow-md">
            About
        </Link>
        <Link href="/blog" className="flex-1 flex items-center justify-center bg-gray-300 border border-gray-600 shadow-md">
            Blog
        </Link>
        <Link href="/contact" className="flex-1 flex items-center justify-center bg-gray-300 border border-gray-600 shadow-md">
            Contact
        </Link>

    </nav>;
}