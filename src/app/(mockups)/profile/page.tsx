"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { UserIcon, SettingsIcon, TagIcon, MoreHorizontalIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function ProfileSettingsPage() {
    const [activeTab, setActiveTab] = useState("general")

    const tabs = [
        { id: "general", label: "General", icon: UserIcon },
        { id: "optional", label: "Optional", icon: SettingsIcon },
        { id: "keywords", label: "Keywords", icon: TagIcon },
        { id: "other", label: "Other", icon: MoreHorizontalIcon },
    ]

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white px-8 py-4 rounded-xl overflow-hidden shadow-sm border-[1px] border-neutral-200 shadow-slate-300">
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
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
                        {activeTab === "general" && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">General Information</h2>
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" defaultValue="John Doe" />
                                </div>
                                <div>
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" defaultValue="johndoe" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="john@example.com" />
                                </div>
                                <div>
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea id="bio" defaultValue="I'm a software developer." />
                                </div>
                                <Button>Update General Information</Button>
                            </div>
                        )}
                        {activeTab === "optional" && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Optional Information</h2>
                                <div>
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" placeholder="e.g., New York, USA" />
                                </div>
                                <div>
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" type="url" placeholder="https://example.com" />
                                </div>
                                <div>
                                    <Label htmlFor="company">Company</Label>
                                    <Input id="company" placeholder="Company name" />
                                </div>
                                <Button>Update Optional Information</Button>
                            </div>
                        )}
                        {activeTab === "keywords" && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Keywords</h2>
                                <div>
                                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                                    <Input id="skills" placeholder="e.g., JavaScript, React, Node.js" />
                                </div>
                                <div>
                                    <Label htmlFor="interests">Interests (comma-separated)</Label>
                                    <Input id="interests" placeholder="e.g., Web Development, AI, Machine Learning" />
                                </div>
                                <Button>Update Keywords</Button>
                            </div>
                        )}
                        {activeTab === "other" && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Other Settings</h2>
                                <div>
                                    <Label htmlFor="language">Preferred Language</Label>
                                    <Input id="language" defaultValue="English" />
                                </div>
                                <div>
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Input id="timezone" defaultValue="UTC-5" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input id="publicProfile" type="checkbox" className="w-4 h-4" />
                                    <Label htmlFor="publicProfile">Make profile public</Label>
                                </div>
                                <Button>Update Other Settings</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
