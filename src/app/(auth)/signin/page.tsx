'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

type SignInForm = {
    username: string,
    password: string,
}
export default function SignIn() {
    const [form, setForm] = useState<SignInForm>({ username: "", password: "" })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const toaster = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const result = await signIn('credentials', {
                username: form.username,
                password: form.password,
                redirect: false,
            })

            if (result?.error) {
                console.error(result.error)
            } else {
                // Clean Slate at Home
                toaster.toast({ title: `Welcome back ${form.username}!`, duration: 3000 })
                router.replace('/')
                router.refresh()
            }
        } catch (error) {
            console.error('An error occurred on signin:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="user">Username</Label>
                            <Input
                                id="user"
                                type="text"
                                value={form.username}
                                onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={form.password}
                                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Log in
                        </Button>
                        <div className="text-sm text-center">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="text-blue-500 hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
