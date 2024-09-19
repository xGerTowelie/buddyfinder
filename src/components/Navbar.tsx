import Link from 'next/link'
import AuthButton from "@/auth/AuthButton.server"
import { getLoggedInUser } from "@/server/actions"

export async function Navbar() {
    const user = await getLoggedInUser()

    return (
        <nav className="bg-black text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Auth Demo
                </Link>
                <div className="flex items-center space-x-4">
                    <AuthButton />
                    {user && <span>Welcome, {user}</span>}
                </div>
            </div>
        </nav>
    )
}
