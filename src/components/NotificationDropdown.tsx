import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { BellIcon } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnimatedProfile } from "@/components/Profiles"
import { useRouter } from 'next/navigation'
import { KeyedMutator } from 'swr'

interface NotificationDropdownProps {
    notifications: any[] | undefined
    setNotifications: React.Dispatch<React.SetStateAction<any[]>>
    mutateNotifications: KeyedMutator<any>
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications, setNotifications, mutateNotifications }) => {
    const router = useRouter()

    const clearNotifications = async () => {
        await fetch('/api/notifications/clear', { method: 'POST' })
        setNotifications([])
        mutateNotifications()
    }

    const handleNotificationClick = async (notification: any) => {
        if (notification.chatId) {
            await fetch(`/api/notifications/${notification.id}/read`, { method: 'POST' })
            setNotifications(prev => prev.filter(n => n.id !== notification.id))
            mutateNotifications()
            router.push(`/chats/${notification.chatId}`)
        }
    }

    console.log(notifications)
    const notificationCount = notifications?.length || 0

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <BellIcon className="h-4 w-4" />
                    {notificationCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            {notificationCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <ScrollArea className="h-[300px]">
                    {!notifications || notifications.length === 0 ? (
                        <DropdownMenuItem>No new notifications</DropdownMenuItem>
                    ) : (
                        notifications.map((notification) => (
                            <DropdownMenuItem key={notification.id} onSelect={() => handleNotificationClick(notification)} className="flex items-center p-4">
                                <AnimatedProfile
                                    imageUrl={notification.sender?.profileImage || "/placeholder-user.jpg"}
                                    size="sm"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-medium">{notification.content}</p>
                                    <p className="text-xs text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
                                </div>
                            </DropdownMenuItem>
                        ))
                    )}
                </ScrollArea>
                {notificationCount > 0 && (
                    <DropdownMenuItem onSelect={clearNotifications} className="text-center text-sm text-blue-500 hover:text-blue-700">
                        Clear all notifications
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
