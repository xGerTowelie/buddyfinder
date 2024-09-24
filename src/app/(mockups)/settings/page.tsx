'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { BellIcon, LockIcon, UserIcon, GlobeIcon } from "lucide-react"
import { updateSettings, getSettings } from "@/server/settings-actions"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile")
    const [settings, setSettings] = useState({
        nickname: "",
        email: "",
        publicProfile: false,
        emailNotifications: false,
        pushNotifications: false,
        language: "en",
    })
    const { toast } = useToast()

    useEffect(() => {
        const fetchSettings = async () => {
            const fetchedSettings = await getSettings()
            if (fetchedSettings) {
                setSettings(fetchedSettings)
            }
        }
        fetchSettings()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setSettings(prev => ({ ...prev, [name]: value }))
    }

    const handleSwitchChange = (name: string) => {
        setSettings(prev => ({ ...prev, [name]: !prev[name] }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await updateSettings(settings)
        if (result.success) {
            toast({
                title: "Settings updated",
                description: "Your settings have been successfully updated.",
            })
        } else {
            toast({
                title: "Error",
                description: result.error || "Failed to update settings",
                variant: "destructive",
            })
        }
    }

    const tabs = [
        { id: "profile", label: "Profile", icon: UserIcon },
        { id: "privacy", label: "Privacy", icon: LockIcon },
        { id: "notifications", label: "Notifications", icon: BellIcon },
        { id: "language", label: "Language", icon: GlobeIcon },
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
                    <form onSubmit={handleSubmit} className="flex-1">
                        {activeTab === "profile" && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Profile Settings</h2>
                                <div>
                                    <Label htmlFor="nickname">Nickname</Label>
                                    <Input
                                        id="nickname"
                                        name="nickname"
                                        value={settings.nickname}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={settings.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}
                        {activeTab === "privacy" && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Privacy Settings</h2>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="publicProfile">Public Profile</Label>
                                    <Switch
                                        id="publicProfile"
                                        checked={settings.publicProfile}
                                        onCheckedChange={() => handleSwitchChange("publicProfile")}
                                    />
                                </div>
                            </div>
                        )}
                        {activeTab === "notifications" && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Notification Preferences</h2>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                                    <Switch
                                        id="emailNotifications"
                                        checked={settings.emailNotifications}
                                        onCheckedChange={() => handleSwitchChange("emailNotifications")}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                                    <Switch
                                        id="pushNotifications"
                                        checked={settings.pushNotifications}
                                        onCheckedChange={() => handleSwitchChange("pushNotifications")}
                                    />
                                </div>
                            </div>
                        )}
                        {activeTab === "language" && (
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Language Settings</h2>
                                <div>
                                    <Label htmlFor="language">Preferred Language</Label>
                                    <select
                                        id="language"
                                        name="language"
                                        value={settings.language}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                    </select>
                                </div>
                            </div>
                        )}
                        <Button type="submit" className="mt-6">Save Settings</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
