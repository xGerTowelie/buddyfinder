"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BellIcon, CreditCardIcon, LockIcon, UserIcon } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile")

    const tabs = [
        { id: "profile", label: "Profile", icon: UserIcon },
        { id: "notifications", label: "Notifications", icon: BellIcon },
        { id: "security", label: "Security", icon: LockIcon },
        { id: "billing", label: "Billing", icon: CreditCardIcon },
    ]

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white px-8 py-4 rounded-xl overflow-hidden shadow-sm border-[1px] border-neutral-200 shadow-slate-300">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-6">Settings</h1>
                <div className="flex flex-col md:flex-row gap-6">
                    <nav className="w-full md:w-64 space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 w-full px-4 py-2 text-left rounded-lg ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                    <div className="flex-1">
                        {activeTab === "profile" && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Profile Settings</h2>
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" defaultValue="John Doe" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="john@example.com" />
                                </div>
                                <Button>Update Profile</Button>
                            </div>
                        )}
                        {activeTab === "notifications" && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Notification Preferences</h2>
                                <div className="flex items-center space-x-2">
                                    <Input id="emailNotifications" type="checkbox" className="w-4 h-4" />
                                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input id="pushNotifications" type="checkbox" className="w-4 h-4" />
                                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                                </div>
                                <Button>Save Preferences</Button>
                            </div>
                        )}
                        {activeTab === "security" && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Security Settings</h2>
                                <div>
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input id="currentPassword" type="password" />
                                </div>
                                <div>
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" type="password" />
                                </div>
                                <Button>Change Password</Button>
                            </div>
                        )}
                        {activeTab === "billing" && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Billing Information</h2>
                                <p>Your current plan: Pro</p>
                                <Button>Upgrade Plan</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
