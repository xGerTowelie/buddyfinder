"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedProfile } from "@/components/Profiles"

const mockUsers = [
    { id: 1, name: "Alice Johnson", interests: ["Music", "Travel", "Photography"], location: "New York, USA" },
    { id: 2, name: "Bob Smith", interests: ["Sports", "Cooking", "Reading"], location: "London, UK" },
    { id: 3, name: "Charlie Brown", interests: ["Coding", "Gaming", "Hiking"], location: "San Francisco, USA" },
    // Add more mock users as needed
]

export default function SearchBuddies() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredUsers, setFilteredUsers] = useState(mockUsers)

    const handleSearch = () => {
        const filtered = mockUsers.filter(user =>
            user.interests.some(interest =>
                interest.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredUsers(filtered)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Find New Buddies</h1>
            <div className="flex mb-4">
                <Input
                    type="text"
                    placeholder="Search by interest..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 mr-2"
                />
                <Button onClick={handleSearch}>Search</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map((user) => (
                    <Card key={user.id}>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-4 mb-2">
                                <AnimatedProfile imageUrl="/placeholder-user.jpg" size="md" />
                                <div>
                                    <h2 className="text-lg font-semibold">{user.name}</h2>
                                    <p className="text-sm text-gray-500">{user.location}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Interests:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.interests.map((interest, index) => (
                                        <span key={index} className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <Button className="w-full mt-4">Connect</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
