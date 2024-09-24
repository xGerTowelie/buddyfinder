'use client'

import { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { MenuIcon, UserIcon, MessageSquareIcon, SettingsIcon, FileTextIcon, MessageSquare, LogOut, Search } from "lucide-react"
import Link from "next/link"
import { AnimatedProfile } from "@/components/Profiles"
import { SearchBar } from '@/components/Searchbar'
import { FeedbackModal } from '@/components/FeedbackModal'
import { NotificationDropdown } from '@/components/NotificationDropdown'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Toaster } from '@/components/ui/toaster'
import { signOut } from '@/auth/auth'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
    const { data: user, error: userError } = useSWR('/api/user', fetcher)
    const { data: notifications, error: notificationsError, mutate: mutateNotifications } = useSWR('/api/notifications', fetcher)

    if (userError) console.error('Failed to load user data:', userError)
    if (notificationsError) console.error('Failed to load notifications:', notificationsError)

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white hidden md:block">
                <div className="p-4 h-16 flex items-center border-b">
                    <h1 className="text-2xl font-bold">BuddyFinder</h1>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/profile">
                                <Button variant="ghost" className="w-full justify-start"><UserIcon className="mr-2 h-4 w-4" />Profile</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/search">
                                <Button variant="ghost" className="w-full justify-start"><Search className="mr-2 h-4 w-4" />Search</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/requests">
                                <Button variant="ghost" className="w-full justify-start"><FileTextIcon className="mr-2 h-4 w-4" />Requests</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/chats">
                                <Button variant="ghost" className="w-full justify-start"><MessageSquareIcon className="mr-2 h-4 w-4" />Chats</Button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/settings">
                                <Button variant="ghost" className="w-full justify-start"><SettingsIcon className="mr-2 h-4 w-4" />Settings</Button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <div className="flex-1 flex flex-col">
                <header className="bg-white h-16 py-4 px-8 flex gap-3 justify-between items-center border-b">
                    <Button variant="ghost" className="md:hidden"><MenuIcon className="h-6 w-6" /></Button>
                    <div className="flex items-center space-x-4 flex-1">
                        <SearchBar hideOnSearch={true} />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsFeedbackModalOpen(true)}>
                        <MessageSquare className="h-4 w-4" />
                    </Button>
                    <NotificationDropdown
                        notifications={notifications}
                        setNotifications={(newNotifications) => mutateNotifications(newNotifications, false)}
                        mutateNotifications={mutateNotifications}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <AnimatedProfile
                                    imageUrl={user?.profileImage || "/placeholder-user.jpg"}
                                    size="sm"
                                    showSupportBadge={true}
                                    variant="ripple"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={async () => await signOut()}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex-1">
                    <ScrollArea className="h-[calc(100vh-64px)] px-6 py-4">
                        {children}
                    </ScrollArea>
                </main>
            </div>
            <FeedbackModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} />
            <Toaster />
        </div>
    )
}
