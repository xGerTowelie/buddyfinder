"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedProfile } from "@/components/Profiles"
import { SendIcon, PlusIcon } from "lucide-react"
import { io, Socket } from "socket.io-client"
import useSWR from 'swr'
import { getLoggedInUser } from "@/server/actions"
import { UserSelector } from "@/components/UserSelector"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function ChatsPage() {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [selectedChat, setSelectedChat] = useState<string | null>(null)
    const [message, setMessage] = useState("")
    const messageEndRef = useRef<HTMLDivElement>(null)
    const [user, setUser] = useState<any>(null)
    const [isUserSelectorOpen, setIsUserSelectorOpen] = useState(false)

    const { data: chats, error: chatsError, mutate: mutateChats } = useSWR('/api/chats', fetcher)
    const { data: messages, error: messagesError, mutate: mutateMessages } = useSWR(selectedChat ? `/api/chats/${selectedChat}/messages` : null, fetcher)

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getLoggedInUser()
            setUser(userData)
        }
        fetchUser()

        const newSocket = io()
        setSocket(newSocket)

        return () => {
            newSocket.close()
        }
    }, [])

    useEffect(() => {
        if (socket && selectedChat) {
            socket.emit('join chat', selectedChat)

            socket.on('new message', (newMessage) => {
                mutateMessages((prevMessages) => [...(prevMessages || []), newMessage], false)
            })

            return () => {
                socket.emit('leave chat', selectedChat)
                socket.off('new message')
            }
        }
    }, [socket, selectedChat, mutateMessages])

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSendMessage = async () => {
        if (message.trim() && selectedChat && user) {
            try {
                const response = await fetch(`/api/chats/${selectedChat}/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content: message.trim(),
                        senderId: user.id,
                    }),
                })

                if (response.ok) {
                    const newMessage = await response.json()
                    mutateMessages((prevMessages) => [...(prevMessages || []), newMessage], false)
                    setMessage("")
                } else {
                    console.error('Failed to send message')
                }
            } catch (error) {
                console.error('Error sending message:', error)
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleCreateNewChat = async (userId: string) => {
        try {
            const response = await fetch('/api/chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ participantId: userId }),
            })

            if (response.ok) {
                const newChat = await response.json()
                await mutateChats()
                setSelectedChat(newChat.id)
                setIsUserSelectorOpen(false)
            } else {
                console.error('Failed to create new chat')
            }
        } catch (error) {
            console.error('Error creating new chat:', error)
        }
    }

    if (chatsError) return <div className="p-4">Failed to load chats</div>
    if (!chats) return <div className="p-4">Loading chats...</div>

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white px-8 py-4 rounded-xl overflow-hidden shadow-sm border-[1px] border-neutral-200 shadow-slate-300">
            <div className="w-1/3 border-r pr-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Chats</h2>
                    <Button onClick={() => setIsUserSelectorOpen(true)} size="sm">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        New Chat
                    </Button>
                </div>
                {Array.isArray(chats) && chats.length > 0 ? (
                    chats.map((chat: any) => (
                        <Card
                            key={chat.id}
                            className={`mb-2 cursor-pointer ${selectedChat === chat.id ? 'bg-primary text-primary-foreground' : ''}`}
                            onClick={() => setSelectedChat(chat.id)}
                        >
                            <CardContent className="p-4 flex items-center space-x-4">
                                <AnimatedProfile imageUrl={chat.participants[0].profileImage || "/placeholder-user.jpg"} size="sm" />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{chat.participants[0].username}</h3>
                                    <p className="text-sm truncate">{chat.messages[0]?.content || "No messages yet"}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center text-gray-500 mt-4">
                        No chats yet. Start a new conversation!
                    </div>
                )}
            </div>
            <div className="w-2/3 pl-4 flex flex-col">
                {selectedChat ? (
                    <>
                        <div className="flex-1 overflow-y-auto mb-4">
                            {messagesError && <div>Failed to load messages</div>}
                            {!messages && <div>Loading messages...</div>}
                            {messages && messages.length > 0 ? (
                                messages.map((msg: any) => (
                                    <div
                                        key={msg.id}
                                        className={`mb-4 ${msg.senderId === user?.id ? "text-right" : "text-left"}`}
                                    >
                                        <div
                                            className={`inline-block p-2 rounded-lg ${msg.senderId === user?.id
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-gray-200 text-gray-800"
                                                }`}
                                        >
                                            <p>{msg.content}</p>
                                            <p className="text-xs mt-1 opacity-70">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 mt-4">
                                    No messages yet. Start the conversation!
                                </div>
                            )}
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
            <UserSelector
                isOpen={isUserSelectorOpen}
                onClose={() => setIsUserSelectorOpen(false)}
                onSelectUser={handleCreateNewChat}
            />
        </div>
    )
}
