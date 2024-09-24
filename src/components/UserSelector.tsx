import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatedProfile } from "@/components/Profiles"
import { Search } from "lucide-react"

interface User {
    id: string
    username: string
    profileImage: string | null
}

interface UserSelectorProps {
    isOpen: boolean
    onClose: () => void
    onSelectUser: (userId: string) => void
}

export function UserSelector({ isOpen, onClose, onSelectUser }: UserSelectorProps) {
    const [users, setUsers] = useState<User[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])

    useEffect(() => {
        if (isOpen) {
            fetchUsers()
        }
    }, [isOpen])

    useEffect(() => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredUsers(filtered)
    }, [searchTerm, users])

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users')
            if (response.ok) {
                const data = await response.json()
                setUsers(data)
            } else {
                console.error('Failed to fetch users')
            }
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>Start a New Chat</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <div className="flex items-center space-x-2 mb-4">
                        <Search className="w-4 h-4 text-gray-500" />
                        <Input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1"
                        />
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {filteredUsers.map((user) => (
                            <Button
                                key={user.id}
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => onSelectUser(user.id)}
                            >
                                <AnimatedProfile
                                    imageUrl={user.profileImage || "/placeholder-user.jpg"}
                                    size="sm"
                                />
                                <span className="ml-2">{user.username}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
