"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"
import ProfileExamples, { AnimatedProfile } from "@/components/Profiles"

export default function ChatPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-[calc(100vh-120px)] bg-gray-100 rounded-xl overflow-hidden shadow-sm border-[1px] border-neutral-200 shadow-slate-300">
            <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-64 bg-white p-4 border-r`}>
                <h2 className="text-lg font-semibold mb-4">Users</h2>
                <div className="space-y-2">
                    {['Alice', 'Bob', 'Charlie', 'David'].map((user) => (
                        <div key={user} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                            <AnimatedProfile
                                imageUrl="https://avatars.githubusercontent.com/u/124599?v=4"
                                showSupportBadge={true}
                                size="md"
                                variant="ripple"
                            />
                            <span>{user}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <div className="bg-white p-3 rounded-lg shadow">
                            <p className="text-sm">Hello! How's everyone doing today?</p>
                            <p className="text-xs text-gray-500 mt-1">Alice - 9:00 AM</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg shadow ml-auto max-w-[80%]">
                            <p className="text-sm">Hi Alice! I'm doing great, thanks for asking.</p>
                            <p className="text-xs text-gray-500 mt-1">You - 9:02 AM</p>
                        </div>
                    </div>
                    <ProfileExamples />
                </ScrollArea>
                <div className="bg-white border-t p-4">
                    <div className="flex space-x-2 max-w-2xl mx-auto">
                        <Input placeholder="Type your message..." className="flex-grow" />
                        <Button>Send</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
