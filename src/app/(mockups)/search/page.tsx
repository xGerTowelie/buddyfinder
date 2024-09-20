"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedProfile } from "@/components/Profiles"
import { SearchIcon } from "lucide-react"
import { SearchBar } from "@/components/Searchbar"

const mockUsers = [
    { id: 1, name: "Alice Johnson", interests: ["Music", "Travel", "Photography"], location: "New York, USA" },
    { id: 2, name: "Bob Smith", interests: ["Sports", "Cooking", "Reading"], location: "London, UK" },
    { id: 3, name: "Charlie Brown", interests: ["Coding", "Gaming", "Hiking"], location: "San Francisco, USA" },
    { id: 4, name: "Diana Lee", interests: ["Art", "Yoga", "Gardening"], location: "Tokyo, Japan" },
    { id: 5, name: "Ethan Hunt", interests: ["Movies", "Fitness", "Technology"], location: "Los Angeles, USA" },
    { id: 6, name: "Fiona Green", interests: ["Fashion", "Travel", "Cooking"], location: "Paris, France" },
]

export default function SearchMockup1() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredUsers, setFilteredUsers] = useState(mockUsers)

    const handleSearch = () => {
        const filtered = mockUsers.filter(user =>
            user.interests.some(interest =>
                interest.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredUsers(filtered)
    }

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white px-8 py-4 rounded-xl overflow-hidden shadow-sm border-[1px] border-neutral-200 shadow-slate-300">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Find New Buddies</h1>
                <SearchBar />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredUsers.map((user) => (
                        <Card key={user.id}>
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <AnimatedProfile
                                        imageUrl="https://yt3.ggpht.com/c1FuHjy6VWExRUIjTVgYVp1I2Fyc8CROTiT9wxBdaUmAel_NXXTCBx0gBVqbTmbJVReHHeSV=s108-c-k-c0x00ffffff-no-rj"
                                        size="sm"
                                        showSupportBadge={true}
                                        variant="ripple"
                                    />
                                    <div>
                                        <h2 className="text-xl font-semibold">{user.name}</h2>
                                        <p className="text-sm text-gray-500">{user.location}</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {user.interests.map((interest, index) => (
                                            <span key={index} className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Button className="w-full">View Profile</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
