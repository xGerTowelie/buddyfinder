'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function FeedbackModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [feedback, setFeedback] = useState('')

    const handleSubmit = () => {
        // Here you would typically send the feedback to your server
        console.log('Feedback submitted:', feedback)
        setFeedback('')
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Provide Feedback</DialogTitle>
                </DialogHeader>
                <Textarea
                    placeholder="Share your thoughts or feature requests..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={5}
                />
                <DialogFooter>
                    <Button onClick={handleSubmit}>Submit Feedback</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
