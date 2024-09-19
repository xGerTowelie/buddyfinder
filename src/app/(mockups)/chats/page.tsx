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
                <h2 className="text-2xl font-semibold mb-4">Users</h2>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                        <AnimatedProfile
                            imageUrl="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D"
                            size="md"
                        />
                        <span>Celine</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                        <AnimatedProfile
                            imageUrl="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                            showSupportBadge={true}
                            size="md"
                            variant="hologram"
                        />
                        <span>Fabian</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                        <AnimatedProfile
                            imageUrl="https://img.freepik.com/foto-gratis/retrato-hombre-reir_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.1488620777.1708128000&semt=ais"
                            size="md"
                        />
                        <span>Markus</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                        <AnimatedProfile
                            imageUrl="https://cdn.hero.page/pfp/303fefb0-e239-42fa-b7ea-d18f40119ff3-clumsy-chibi-character-humorous-cute-pfp-for-school-1.png"
                            size="md"
                        />
                        <span>Michael</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                        <AnimatedProfile
                            imageUrl="https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532"
                            size="md"
                        />
                        <span>Rene</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                        <AnimatedProfile
                            imageUrl="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                            showSupportBadge={true}
                            size="md"
                            variant="morph"
                        />
                        <span>Pedro</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <div className="bg-white p-3 rounded-lg shadow">
                            <p className="text-sm">Hello! How're doing today?</p>
                            <p className="text-xs text-gray-500 mt-1">Celine - 9:00 AM</p>
                        </div>
                        <div className="bg-gray-200 p-3 rounded-lg shadow ml-auto max-w-[80%]">
                            <p className="text-sm">Hi Alice! I'm doing great, thanks for asking. How did you start into the day? 🌞😎</p>
                            <p className="text-xs text-gray-500 mt-1">You - 9:02 AM</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow">
                            <p className="text-sm">I wake up super early to study alot. Therefor I'm really tired. But I will do a small nap later in the day 😊</p>
                            <p className="text-xs text-gray-500 mt-1">Celine - 9:12 AM</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg shadow">
                            <p className="text-sm">What are your plans for this weekend? Wanna go watch a movie with my friends. Before we are always going to play some billard 🎱</p>
                            <p className="text-xs text-gray-500 mt-1">Celine - 9:15 AM</p>
                        </div>
                        <div className="bg-gray-200 p-3 rounded-lg shadow ml-auto max-w-[80%]">
                            <p className="text-sm">Hm...</p>
                            <p className="text-xs text-gray-500 mt-1">You - 9:42 AM</p>
                        </div>
                        <div className="bg-gray-200 p-3 rounded-lg shadow ml-auto max-w-[80%]">
                            <p className="text-sm">Sounds like a plan, cause my weekend is completly free. I wanted to code on some projects but going out sounds much better. What time?</p>
                            <p className="text-xs text-gray-500 mt-1">You - 9:42 AM</p>
                        </div>

                    </div>
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
