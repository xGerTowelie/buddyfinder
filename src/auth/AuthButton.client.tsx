"use client"

import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { signOut } from "."

export const AuthButton = () => {
    const session = useSession()

    const handleSignOut = async () => {
        await signOut()
        window.location.reload()
    }

    // Logged In
    if (session.data?.user) {
        return <Button variant="secondary" onClick={handleSignOut}>Sign Out</Button>
    }

    // Logged Out
    return (
        <>
            <Link href="/signup">
                <Button variant="outline">Sign Up</Button>
            </Link>

            <Link href="/signin">
                <Button variant="secondary">Sign In</Button>
            </Link>
        </>
    )
}

export default AuthButton
