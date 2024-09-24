"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedProfile } from "@/components/Profiles"
import { SearchBar } from "@/components/Searchbar"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, ChevronUp } from "lucide-react"

const mockUsers = [
    { id: 1, name: "Alice Johnson", interests: ["Music", "Travel", "Photography"], location: "New York, USA" },
    { id: 2, name: "Bob Smith", interests: ["Sports", "Cooking", "Reading"], location: "London, UK" },
    { id: 3, name: "Charlie Brown", interests: ["Coding", "Gaming", "Hiking"], location: "San Francisco, USA" },
    { id: 4, name: "Diana Lee", interests: ["Art", "Yoga", "Gardening"], location: "Tokyo, Japan" },
    { id: 5, name: "Ethan Hunt", interests: ["Movies", "Fitness", "Technology"], location: "Los Angeles, USA" },
    { id: 6, name: "Fiona Green", interests: ["Fashion", "Travel", "Cooking"], location: "Paris, France" },
]

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState(mockUsers)
    const [showFilters, setShowFilters] = useState(false)
    const [locationRadius, setLocationRadius] = useState(50)
    const [ageRange, setAgeRange] = useState([18, 65])

    const handleSearch = () => {
        // Implement your search logic here
        // This is just a mock implementation
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
                <div className="mb-4">
                    <Button
                        onClick={() => setShowFilters(!showFilters)}
                        variant="outline"
                        className="flex items-center"
                    >
                        {showFilters ? <ChevronUp className="mr-2" /> : <ChevronDown className="mr-2" />}
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                </div>
                {showFilters && (
                    <div className="mb-6 p-4 border rounded-md">
                        <div className="mb-4">
                            <label className="block mb-2">Location Radius (km)</label>
                            <Slider
                                value={[locationRadius]}
                                onValueChange={(value) => setLocationRadius(value[0])}
                                max={500}
                                step={10}
                            />
                            <span>{locationRadius} km</span>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Age Range</label>
                            <Slider
                                value={ageRange}
                                onValueChange={(value) => setAgeRange(value)}
                                max={100}
                                step={1}
                            />
                            <span>{ageRange[0]} - {ageRange[1]} years</span>
                        </div>
                    </div>
                )}
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
