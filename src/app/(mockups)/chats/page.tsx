"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedProfile } from "@/components/Profiles"
import { SendIcon } from "lucide-react"

const mockChats = [
    {
        id: 1,
        name: "Alice Johnson",
        lastMessage: "Hey, how's it going?",
        imageUrl: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D",
        messages: [
            { id: 1, sender: "Alice", content: "Hey, how's it going?", timestamp: "10:30 AM" },
            { id: 2, sender: "You", content: "Hi Alice! I'm doing well, thanks. How about you?", timestamp: "10:32 AM" },
            { id: 3, sender: "Alice", content: "I'm great! Just finished a really interesting book. Have you read anything good lately?", timestamp: "10:35 AM" },
        ],
        hasNewMessages: false,
    },
    {
        id: 2,
        name: "Bob Smith",
        lastMessage: "Did you see the latest update?",
        imageUrl: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D",
        messages: [
            { id: 1, sender: "Bob", content: "Did you see the latest update?", timestamp: "Yesterday" },
            { id: 2, sender: "You", content: "No, what update?", timestamp: "Yesterday" },
            { id: 3, sender: "Bob", content: "They added a new feature to the app. It's pretty cool!", timestamp: "Yesterday" },
        ],
        hasNewMessages: true,
    },
    {
        id: 3,
        name: "Charlie Brown",
        lastMessage: "Let's catch up soon!",
        imageUrl: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D",
        messages: [
            { id: 1, sender: "Charlie", content: "Let's catch up soon!", timestamp: "2 days ago" },
            { id: 2, sender: "You", content: "Definitely! How about this weekend?", timestamp: "2 days ago" },
            { id: 3, sender: "Charlie", content: "Sounds good! I'll give you a call on Saturday.", timestamp: "2 days ago" },
        ],
        hasNewMessages: false,
    },
]

export default function ChatsPage() {
    const [chats, setChats] = useState(mockChats)
    const [selectedChat, setSelectedChat] = useState<number | null>(null)
    const [message, setMessage] = useState("")
    const messageEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [selectedChat, chats])

    const handleSendMessage = () => {
        if (message.trim() && selectedChat !== null) {
            const newMessage = {
                id: chats[selectedChat].messages.length + 1,
                sender: "You",
                content: message.trim(),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
            const updatedChats = chats.map((chat, index) => {
                if (index === selectedChat) {
                    return {
                        ...chat,
                        messages: [...chat.messages, newMessage],
                        lastMessage: message.trim(),
                    }
                }
                return chat
            })
            setChats(updatedChats)
            setMessage("")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white px-8 py-4 rounded-xl overflow-hidden shadow-sm border-[1px] border-neutral-200 shadow-slate-300">
            <div className="w-1/3 border-r pr-4 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Chats</h2>
                {chats.map((chat, index) => (
                    <Card
                        key={chat.id}
                        className={`mb-2 cursor-pointer ${selectedChat === index ? 'bg-primary text-primary-foreground' : ''}`}
                        onClick={() => {
                            setSelectedChat(index)
                            const updatedChats = [...chats]
                            updatedChats[index].hasNewMessages = false
                            setChats(updatedChats)
                        }}
                    >
                        <CardContent className="p-4 flex items-center space-x-4">
                            <AnimatedProfile imageUrl={chat.imageUrl} size="sm" />
                            <div className="flex-1">
                                <h3 className="font-semibold">{chat.name}</h3>
                                <p className="text-sm truncate">{chat.lastMessage}</p>
                            </div>
                            {chat.hasNewMessages && (
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="w-2/3 pl-4 flex flex-col">
                {selectedChat !== null ? (
                    <>
                        <div className="flex-1 overflow-y-auto mb-4">
                            {chats[selectedChat].messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`mb-4 ${msg.sender === "You" ? "text-right" : "text-left"}`}
                                >
                                    <div
                                        className={`inline-block p-2 rounded-lg ${msg.sender === "You"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-gray-200 text-gray-800"
                                            }`}
                                    >
                                        <p>{msg.content}</p>
                                        <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messageEndRef} />
                        </div>
                        <div className="mt-4 flex items-end">
                            <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                className="flex-1 mr-2 resize-none"
                                rows={1}
                                maxRows={4}
                            />
                            <Button onClick={handleSendMessage}>
                                <SendIcon className="h-4 w-4" />
                            </Button>
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
