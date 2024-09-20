"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AnimatedProfile } from "@/components/Profiles"

const mockChats = [
    { id: 1, name: "Alice Johnson", lastMessage: "Hey, how's it going?", imageUrl: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 2, name: "Bob Smith", lastMessage: "Did you see the latest update?", imageUrl: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 3, name: "Charlie Brown", lastMessage: "Let's catch up soon!", imageUrl: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D" },
]

export default function ChatsPage() {
    const [chats, setChats] = useState(mockChats)
    const [selectedChat, setSelectedChat] = useState<number | null>(null)
    const [message, setMessage] = useState("")

    const handleSendMessage = () => {
        if (message.trim() && selectedChat) {
            // Here you would typically send the message to your backend
            console.log(`Sending message to chat ${selectedChat}: ${message}`)
            setMessage("")
        }
    }

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white px-8 py-4 rounded-xl overflow-hidden shadow-sm border-[1px] border-neutral-200 shadow-slate-300">
            <div className="w-1/3 border-r pr-4">
                <h2 className="text-2xl font-bold mb-4">Chats</h2>
                {chats.map((chat) => (
                    <Card key={chat.id} className={`mb-2 cursor-pointer ${selectedChat === chat.id ? 'bg-primary text-primary-foreground' : ''}`} onClick={() => setSelectedChat(chat.id)}>
                        <CardContent className="p-4 flex items-center space-x-4">
                            <AnimatedProfile imageUrl={chat.imageUrl} size="sm" showSupportBadge={true} variant={'ripple'} />
                            <div>
                                <h3 className="font-semibold">{chat.name}</h3>
                                <p className="text-sm truncate">{chat.lastMessage}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="w-2/3 pl-4 flex flex-col">
                {selectedChat ? (
                    <>
                        <div className="flex-1 overflow-y-auto">
                            {/* Chat messages would go here */}
                        </div>
                        <div className="mt-4 flex">
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 mr-2"
                            />
                            <Button onClick={handleSendMessage}>Send</Button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    )
}
