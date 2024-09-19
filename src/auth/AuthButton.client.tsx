"use client"

import { signOut } from "@/auth/helpers"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import Link from "next/link"

export const AuthButton = () => {
    const session = useSession()

    if (session.data?.user) {
        return (
            <Button variant="secondary" onClick={async () => signOut().then(() => window.location.reload())}>Sign Out</Button>
        )
    } else {
        return (
            <>
                <Link href="/signup"><Button variant="outline">Sign Up</Button></Link>
                <Link href="/signin"><Button variant="secondary">Sign In</Button></Link>
            </>
        )
    }

}

export default AuthButton
