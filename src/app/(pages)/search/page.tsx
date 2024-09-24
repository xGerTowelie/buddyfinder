'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatedProfile } from '@/components/Profiles'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SearchBar } from '@/components/Searchbar'

interface User {
    id: string
    nickname: string
    username: string
    profileImage: string | null
    keywords: string[]
    matchingKeywords: number
}

export default function SearchPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            const keywords = searchParams.get('q')
            const response = await fetch(`/api/search${keywords ? `?keywords=${keywords}` : ''}`)
            if (response.ok) {
                const data = await response.json()
                setUsers(data)
            } else {
                console.error('Failed to fetch users')
            }
            setLoading(false)
        }

        fetchUsers()
    }, [searchParams])

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Search Users</h1>
            <div className="mb-6">
                <SearchBar />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : users.length === 0 ? (
                <p>No users found. Try different keywords.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <Card key={user.id}>
                            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                <AnimatedProfile
                                    imageUrl={user.profileImage || "/placeholder-user.jpg"}
                                    size="md"
                                    enableHover={false}
                                />
                                <div>
                                    <CardTitle>{user.nickname || user.username}</CardTitle>
                                    <p className="text-sm text-gray-500">@{user.username}</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-2">
                                    <span className="font-semibold">Matching Keywords:</span> {user.matchingKeywords}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {user.keywords.map((keyword, index) => (
                                        <Badge key={index} variant="secondary">{keyword}</Badge>
                                    ))}
                                </div>
                                <Button className="w-full mt-4">View Profile</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
