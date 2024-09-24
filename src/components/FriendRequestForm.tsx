'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/hooks/use-toast'

interface Icebreaker {
    id: string
    question: string
}

interface FriendRequestFormProps {
    userId: string
    icebreakers: Icebreaker[]
}

export function FriendRequestForm({ userId, icebreakers }: FriendRequestFormProps) {
    const [selectedIcebreaker, setSelectedIcebreaker] = useState<string | null>(null)
    const [answer, setAnswer] = useState('')
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedIcebreaker) {
            toast({
                title: "Error",
                description: "Please select an icebreaker question.",
                variant: "destructive",
            })
            return
        }

        try {
            const response = await fetch('/api/friend-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receiverId: userId,
                    icebreakerId: selectedIcebreaker,
                    answer,
                }),
            })

            if (response.ok) {
                toast({
                    title: "Friend request sent",
                    description: "Your friend request has been sent successfully.",
                })
                setSelectedIcebreaker(null)
                setAnswer('')
            } else {
                throw new Error('Failed to send friend request')
            }
        } catch (error) {
            console.error('Error sending friend request:', error)
            toast({
                title: "Error",
                description: "Failed to send friend request. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <RadioGroup value={selectedIcebreaker || ''} onValueChange={setSelectedIcebreaker}>
                {icebreakers.map((icebreaker) => (
                    <div key={icebreaker.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={icebreaker.id} id={icebreaker.id} />
                        <Label htmlFor={icebreaker.id}>{icebreaker.question}</Label>
                    </div>
                ))}
            </RadioGroup>
            {selectedIcebreaker && (
                <div>
                    <Label htmlFor="answer">Your Answer</Label>
                    <Input
                        id="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type your answer here..."
                    />
                </div>
            )}
            <Button type="submit" disabled={!selectedIcebreaker || !answer}>
                Send Friend Request
            </Button>
        </form>
    )
}
