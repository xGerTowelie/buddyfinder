'use client'

import { useState, useEffect } from 'react'
import { AnimatedProfile } from '@/components/Profiles'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useSWR from 'swr'
import { useToast } from '@/hooks/use-toast'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Keyword {
    id: string
    word: string
    description: string
}

interface TopKeyword {
    id: string
    word: string
    rank: number
}

interface Icebreaker {
    id: string
    question: string
}

interface User {
    id: string
    nickname: string
    username: string
    email: string
    profileImage: string | null
    bio: string | null
    keywords: Keyword[]
    topKeywords: TopKeyword[]
    icebreakers: Icebreaker[]
}

export default function ProfilePage() {
    const { data: user, error, mutate } = useSWR<User>('/api/user', fetcher)
    const { toast } = useToast()
    const [isEditing, setIsEditing] = useState(false)
    const [editedUser, setEditedUser] = useState<User | null>(null)
    const [newKeyword, setNewKeyword] = useState({ word: '', description: '' })
    const [newIcebreaker, setNewIcebreaker] = useState('')

    useEffect(() => {
        if (user) {
            setEditedUser(user)
        }
    }, [user])

    if (error) return <div className="text-center p-4">Failed to load user data</div>
    if (!user || !editedUser) return <div className="text-center p-4">Loading...</div>

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = async () => {
        if (!editedUser) return

        try {
            const response = await fetch('/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedUser),
            })

            if (response.ok) {
                mutate(editedUser)
                setIsEditing(false)
                toast({
                    title: "Profile updated",
                    description: "Your profile has been successfully updated.",
                })
            } else {
                throw new Error('Failed to update profile')
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            toast({
                title: "Error",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleImageChange = async (file: File) => {
        const formData = new FormData()
        formData.append('image', file)

        try {
            const response = await fetch('/api/user/profile-image', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const updatedUser = await response.json()
                mutate(updatedUser)
                toast({
                    title: "Profile image updated",
                    description: "Your profile image has been successfully updated.",
                })
            } else {
                throw new Error('Failed to update profile image')
            }
        } catch (error) {
            console.error('Error updating profile image:', error)
            toast({
                title: "Error",
                description: "Failed to update profile image. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleAddKeyword = async () => {
        if (newKeyword.word && newKeyword.description) {
            try {
                const response = await fetch('/api/user/keywords', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newKeyword),
                })

                if (response.ok) {
                    const updatedUser = await response.json()
                    mutate(updatedUser)
                    setNewKeyword({ word: '', description: '' })
                    toast({
                        title: "Keyword added",
                        description: "Your new keyword has been successfully added.",
                    })
                } else {
                    throw new Error('Failed to add keyword')
                }
            } catch (error) {
                console.error('Error adding keyword:', error)
                toast({
                    title: "Error",
                    description: "Failed to add keyword. Please try again.",
                    variant: "destructive",
                })
            }
        }
    }

    const handleRemoveKeyword = async (keywordId: string) => {
        try {
            const response = await fetch(`/api/user/keywords/${keywordId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                const updatedUser = await response.json()
                mutate(updatedUser)
                toast({
                    title: "Keyword removed",
                    description: "The keyword has been successfully removed.",
                })
            } else {
                throw new Error('Failed to remove keyword')
            }
        } catch (error) {
            console.error('Error removing keyword:', error)
            toast({
                title: "Error",
                description: "Failed to remove keyword. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleAddIcebreaker = async () => {
        if (newIcebreaker) {
            try {
                const response = await fetch('/api/user/icebreakers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question: newIcebreaker }),
                })

                if (response.ok) {
                    const updatedUser = await response.json()
                    mutate(updatedUser)
                    setNewIcebreaker('')
                    toast({
                        title: "Icebreaker added",
                        description: "Your new icebreaker has been successfully added.",
                    })
                } else {
                    throw new Error('Failed to add icebreaker')
                }
            } catch (error) {
                console.error('Error adding icebreaker:', error)
                toast({
                    title: "Error",
                    description: "Failed to add icebreaker. Please try again.",
                    variant: "destructive",
                })
            }
        }
    }

    const handleRemoveIcebreaker = async (icebreakerId: string) => {
        try {
            const response = await fetch(`/api/user/icebreakers/${icebreakerId}`, {
                method: 'DELETE',
            })

            if (response.ok) {
                const updatedUser = await response.json()
                mutate(updatedUser)
                toast({
                    title: "Icebreaker removed",
                    description: "The icebreaker has been successfully removed.",
                })
            } else {
                throw new Error('Failed to remove icebreaker')
            }
        } catch (error) {
            console.error('Error removing icebreaker:', error)
            toast({
                title: "Error",
                description: "Failed to remove icebreaker. Please try again.",
                variant: "destructive",
            })
        }
    }

    const handleDragEnd = async (result: any) => {
        if (!result.destination || !editedUser) return

        const newTopKeywords = Array.from(editedUser.topKeywords || [])
        const [reorderedItem] = newTopKeywords.splice(result.source.index, 1)
        newTopKeywords.splice(result.destination.index, 0, reorderedItem)

        const updatedTopKeywords = newTopKeywords.map((keyword, index) => ({
            ...keyword,
            rank: index + 1,
        }))

        setEditedUser({ ...editedUser, topKeywords: updatedTopKeywords })

        try {
            const response = await fetch('/api/user/top-keywords', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topKeywords: updatedTopKeywords }),
            })

            if (response.ok) {
                mutate({ ...user, topKeywords: updatedTopKeywords })
                toast({
                    title: "Top keywords updated",
                    description: "Your top keywords have been successfully reordered.",
                })
            } else {
                throw new Error('Failed to update top keywords')
            }
        } catch (error) {
            console.error('Error updating top keywords:', error)
            toast({
                title: "Error",
                description: "Failed to update top keywords. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center space-x-8 mb-8">
                <AnimatedProfile
                    imageUrl={user.profileImage || "/placeholder-user.jpg"}
                    size="lg"
                    enableHover={true}
                    onImageChange={handleImageChange}
                />
                <div>
                    <h1 className="text-3xl font-bold">{user.nickname || user.username}</h1>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>

            {isEditing ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
                    <div>
                        <Label htmlFor="nickname">Nickname</Label>
                        <Input
                            id="nickname"
                            value={editedUser.nickname || ''}
                            onChange={(e) => setEditedUser({ ...editedUser, nickname: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            value={editedUser.bio || ''}
                            onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <Button type="submit">Save</Button>
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold">Bio</h2>
                        <p>{user.bio || 'No bio available'}</p>
                    </div>
                    <Button onClick={handleEdit}>Edit Profile</Button>
                </div>
            )}

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {editedUser.keywords && editedUser.keywords.map((keyword) => (
                            <Badge key={keyword.id} variant="secondary" className="p-2">
                                {keyword.word}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2 h-4 w-4 p-0"
                                    onClick={() => handleRemoveKeyword(keyword.id)}
                                >
                                    &times;
                                </Button>
                            </Badge>
                        ))}
                    </div>
                    <div className="flex space-x-2">
                        <Input
                            placeholder="New keyword"
                            value={newKeyword.word}
                            onChange={(e) => setNewKeyword({ ...newKeyword, word: e.target.value })}
                        />
                        <Input
                            placeholder="Description"
                            value={newKeyword.description}
                            onChange={(e) => setNewKeyword({ ...newKeyword, description: e.target.value })}
                        />
                        <Button onClick={handleAddKeyword}>Add</Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Top Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="topKeywords">
                            {(provided) => (
                                <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                    {editedUser.topKeywords && editedUser.topKeywords.length > 0 ? (
                                        editedUser.topKeywords.map((keyword, index) => (
                                            <Draggable key={keyword.id} draggableId={keyword.id} index={index}>
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="flex items-center justify-between p-2 bg-secondary rounded"
                                                    >
                                                        <span>{keyword.word}</span>
                                                        <span className="text-sm text-gray-500">Rank: {index + 1}</span>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))
                                    ) : (
                                        <li>No top keywords added yet.</li>
                                    )}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <p className="mt-4 text-sm text-gray-500">Drag and drop to reorder your top keywords.</p>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Icebreakers</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 mb-4">
                        {editedUser.icebreakers && editedUser.icebreakers.map((icebreaker) => (
                            <li key={icebreaker.id} className="flex items-center justify-between">
                                <span>{icebreaker.question}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveIcebreaker(icebreaker.id)}
                                >
                                    Remove
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex space-x-2">
                        <Input
                            placeholder="New icebreaker question"
                            value={newIcebreaker}
                            onChange={(e) => setNewIcebreaker(e.target.value)}
                        />
                        <Button onClick={handleAddIcebreaker}>Add</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
