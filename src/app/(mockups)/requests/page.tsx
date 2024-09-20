"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedProfile } from "@/components/Profiles"
import { CheckIcon, XIcon, UserPlusIcon, UserCheckIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockIncomingRequests = [
    { id: 1, name: "Alice Johnson", interests: ["Music", "Travel"], message: "Hey! I saw we both love music. Let's connect!", sent: "2 days ago" },
    { id: 2, name: "Bob Smith", interests: ["Sports", "Cooking"], message: "Hi there! I'm always looking for new recipes. Want to exchange some?", sent: "5 days ago" },
]

const mockOutgoingRequests = [
    { id: 3, name: "Charlie Brown", interests: ["Coding", "Gaming"], message: "Fellow coder here! Would love to chat about the latest tech.", sent: "1 week ago" },
    { id: 4, name: "Diana Lee", interests: ["Art", "Yoga"], message: "Namaste! I'd love to connect with a fellow art enthusiast.", sent: "3 days ago" },
]

export default function FriendRequestsMockup2() {
    const [incomingRequests, setIncomingRequests] = useState(mockIncomingRequests)
    const [outgoingRequests, setOutgoingRequests] = useState(mockOutgoingRequests)

    const handleAccept = (id: number) => {
        setIncomingRequests(incomingRequests.filter(request => request.id !== id))
        // Here you would typically make an API call to accept the friend request
    }

    const handleDecline = (id: number) => {
        setIncomingRequests(incomingRequests.filter(request => request.id !== id))
        // Here you would typically make an API call to decline the friend request
    }

    const handleCancel = (id: number) => {
        setOutgoingRequests(outgoingRequests.filter(request => request.id !== id))
        // Here you would typically make an API call to cancel the outgoing friend request
    }

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white px-8 py-4 rounded-xl overflow-hidden shadow-sm border-[1px] border-neutral-200 shadow-slate-300">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Friend Requests</h1>
                <Tabs defaultValue="incoming" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="incoming">Incoming Requests</TabsTrigger>
                        <TabsTrigger value="outgoing">Outgoing Requests</TabsTrigger>
                    </TabsList>
                    <TabsContent value="incoming">
                        {incomingRequests.length === 0 ? (
                            <p className="text-center text-gray-500 text-lg mt-4">No incoming friend requests.</p>
                        ) : (
                            <div className="space-y-4 mt-4">
                                {incomingRequests.map((request) => (
                                    <Card key={request.id}>
                                        <CardContent className="p-6 flex items-center">
                                            <AnimatedProfile imageUrl="/placeholder-user.jpg" size="lg" />
                                            <div className="ml-6 flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h2 className="text-2xl font-semibold">{request.name}</h2>
                                                        <p className="text-sm text-gray-500">Sent {request.sent}</p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            onClick={() => handleAccept(request.id)}
                                                            className="bg-green-500 hover:bg-green-600"
                                                        >
                                                            <CheckIcon className="mr-2 h-4 w-4" />
                                                            Accept
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleDecline(request.id)}
                                                            variant="outline"
                                                            className="border-red-500 text-red-500 hover:bg-red-50"
                                                        >
                                                            <XIcon className="mr-2 h-4 w-4" />
                                                            Decline
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap gap-2 my-2">
                                                    {request.interests.map((interest, index) => (
                                                        <span key={index} className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                                                            {interest}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-gray-700">{request.message}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="outgoing">
                        {outgoingRequests.length === 0 ? (
                            <p className="text-center text-gray-500 text-lg mt-4">No outgoing friend requests.</p>
                        ) : (
                            <div className="space-y-4 mt-4">
                                {outgoingRequests.map((request) => (
                                    <Card key={request.id}>
                                        <CardContent className="p-6 flex items-center">
                                            <AnimatedProfile imageUrl="/placeholder-user.jpg" size="lg" />
                                            <div className="ml-6 flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h2 className="text-2xl font-semibold">{request.name}</h2>
                                                        <p className="text-sm text-gray-500">Sent {request.sent}</p>
                                                    </div>
                                                    <Button
                                                        onClick={() => handleCancel(request.id)}
                                                        variant="outline"
                                                        className="border-red-500 text-red-500 hover:bg-red-50"
                                                    >
                                                        <XIcon className="mr-2 h-4 w-4" />
                                                        Cancel Request
                                                    </Button>
                                                </div>
                                                <div className="flex flex-wrap gap-2 my-2">
                                                    {request.interests.map((interest, index) => (
                                                        <span key={index} className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                                                            {interest}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-gray-700">{request.message}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
