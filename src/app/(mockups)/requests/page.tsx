"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckIcon, XIcon } from "lucide-react"
import { AnimatedProfile } from "@/components/Profiles"

const mockRequests = [
    { id: 1, name: "Alice Johnson", sent: "2 days ago", imageUrl: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 2, name: "Bob Smith", sent: "5 days ago", imageUrl: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D" },
    { id: 3, name: "Charlie Brown", sent: "1 week ago", imageUrl: "https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D" },
]

export default function RequestsPage() {
    const [requests, setRequests] = useState(mockRequests)

    const handleAccept = (id: number) => {
        setRequests(requests.filter(request => request.id !== id))
        // Here you would typically make an API call to accept the friend request
    }

    const handleDecline = (id: number) => {
        setRequests(requests.filter(request => request.id !== id))
        // Here you would typically make an API call to decline the friend request
    }

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white px-8 py-4 rounded-xl overflow-hidden shadow-sm border-[1px] border-neutral-200 shadow-slate-300">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Friend Requests</h1>
                {requests.length === 0 ? (
                    <p className="text-center text-gray-500">No pending friend requests.</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {requests.map((request) => (
                            <Card key={request.id} className="overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <AnimatedProfile
                                            imageUrl={request.imageUrl}
                                            size="md"
                                        />
                                        <div className="flex-1">
                                            <h2 className="text-lg font-semibold">{request.name}</h2>
                                            <p className="text-sm text-gray-500">{request.sent}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <Button
                                            onClick={() => handleAccept(request.id)}
                                            className="bg-green-500 hover:bg-green-600"
                                        >
                                            <CheckIcon className="w-4 h-4 mr-2" />
                                            Accept
                                        </Button>
                                        <Button
                                            onClick={() => handleDecline(request.id)}
                                            variant="outline"
                                            className="border-red-500 text-red-500 hover:bg-red-50"
                                        >
                                            <XIcon className="w-4 h-4 mr-2" />
                                            Decline
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
