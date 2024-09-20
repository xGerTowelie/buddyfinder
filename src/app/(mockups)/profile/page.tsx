// app/profile/page.tsx

'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { AnimatedProfile } from "@/components/Profiles"
import { PlusIcon, XIcon } from "lucide-react"
import { updateProfile, getProfile, FullProfile } from "@/server/profile-actions"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("general")
    const [profile, setProfile] = useState<FullProfile | null>()
    const toaster = useToast()

    useEffect(() => {
        const fetchProfile = async () => {
            const fetchedProfile = await getProfile()
            console.log('profile fetched:', fetchedProfile)
            if (fetchedProfile) {
                setProfile(fetchedProfile)
            }
        }
        fetchProfile()
    }, [])

    if (!profile) {
        return (
            <div className="flex h-[calc(100vh-120px)] bg-white px-8 py-4 rounded-xl overflow-hidden shadow-sm border-[1px] border-neutral-200 shadow-slate-300">
                Something went wrong. We couldnt find your user. Try relog!
            </div>
        )
    }


    const tabs = [
        { id: "general", label: "General" },
        { id: "keywords", label: "Keywords" },
        { id: "topKeywords", label: "Top Keywords" },
        { id: "icebreakers", label: "Icebreakers" },
        { id: "privacy", label: "Privacy" },
    ]

    const handleKeywordChange = (index: number, field: 'word' | 'description', value: string) => {
        if (!profile) return

        const newKeywords = [...profile.keywords]
        newKeywords[index][field] = value
        setProfile({ ...profile, keywords: newKeywords })
    }

    const handleTopKeywordChange = (index: number, field: 'word' | 'description', value: string) => {
        const newTopKeywords = [...profile.topKeywords]
        newTopKeywords[index][field] = value
        setProfile({ ...profile, topKeywords: newTopKeywords })
    }

    const addKeyword = () => {
        setProfile({
            ...profile,
            keywords: [...profile.keywords, { word: "", description: "" }]
        })
    }

    const removeKeyword = (index: number) => {
        const newKeywords = profile.keywords.filter((_, i) => i !== index)
        setProfile({ ...profile, keywords: newKeywords })
    }

    const addIcebreaker = () => {
        setProfile({
            ...profile,
            icebreakers: [...profile.icebreakers, ""]
        })
    }

    const removeIcebreaker = (index: number) => {
        const newIcebreakers = profile.icebreakers.filter((_, i) => i !== index)
        setProfile({ ...profile, icebreakers: newIcebreakers })
    }

    const handleSaveProfile = async () => {
        const result = await updateProfile(profile)
        if (result.success) {
            toaster.toast({ title: "Profile updated successfully" })
        } else {
            toaster.toast({ title: "Failed to update profile" })
        }
    }

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white px-8 py-4 rounded-xl overflow-hidden shadow-sm border-[1px] border-neutral-200 shadow-slate-300">
            <div className="w-64 border-r pr-4">
                <div className="mb-6 flex flex-col items-center">
                    <AnimatedProfile
                        imageUrl="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D"
                        size="xl"
                        showSupportBadge={true}
                        variant="ripple"
                    />
                    <h2 className="text-xl font-semibold mt-2">{profile.nickname}</h2>
                    <p className="text-gray-500">{profile.location}</p>
                </div>
                <nav className="space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full px-4 py-2 text-left rounded-lg ${activeTab === tab.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="flex-1 pl-8 overflow-y-auto">
                {activeTab === "general" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">General Information</h2>
                        <div>
                            <Label htmlFor="nickname">Nickname</Label>
                            <Input
                                id="nickname"
                                value={profile.nickname}
                                onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="age">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                value={profile.age}
                                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Input
                                id="gender"
                                value={profile.gender}
                                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={profile.location}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            />
                        </div>
                    </div>
                )}
                {activeTab === "keywords" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Keywords</h2>
                        {profile.keywords.map((keyword, index) => (
                            <div key={index} className="space-y-2 pb-4 border-b">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        value={keyword.word}
                                        onChange={(e) => handleKeywordChange(index, 'word', e.target.value)}
                                        placeholder="Keyword"
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => removeKeyword(index)}
                                    >
                                        <XIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Textarea
                                    value={keyword.description}
                                    onChange={(e) => handleKeywordChange(index, 'description', e.target.value)}
                                    placeholder="Description (min 50 characters)"
                                    minLength={50}
                                />
                            </div>
                        ))}
                        <Button onClick={addKeyword} className="w-full">
                            <PlusIcon className="mr-2 h-4 w-4" /> Add Keyword
                        </Button>
                    </div>
                )}
                {activeTab === "topKeywords" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Top 5 Keywords</h2>
                        {profile.topKeywords.map((keyword, index) => (
                            <div key={index} className="space-y-2 pb-4 border-b">
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold">{index + 1}.</span>
                                    <Input
                                        value={keyword.word}
                                        onChange={(e) => handleTopKeywordChange(index, 'word', e.target.value)}
                                        placeholder="Keyword"
                                    />
                                </div>
                                <Textarea
                                    value={keyword.description}
                                    onChange={(e) => handleTopKeywordChange(index, 'description', e.target.value)}
                                    placeholder="Description (min 50 characters)"
                                    minLength={50}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "icebreakers" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Icebreaker Questions</h2>
                        {profile.icebreakers.map((question, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Input
                                    value={question}
                                    onChange={(e) => {
                                        const newIcebreakers = [...profile.icebreakers]
                                        newIcebreakers[index] = e.target.value
                                        setProfile({ ...profile, icebreakers: newIcebreakers })
                                    }}
                                    placeholder="Icebreaker question"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeIcebreaker(index)}
                                >
                                    <XIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button onClick={addIcebreaker} className="w-full">
                            <PlusIcon className="mr-2 h-4 w-4" /> Add Icebreaker
                        </Button>
                    </div>
                )}
                {activeTab === "privacy" && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Privacy Settings</h2>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="showAge">Show Age</Label>
                            <Switch
                                id="showAge"
                                checked={profile.showAge}
                                onCheckedChange={(checked) => setProfile({ ...profile, showAge: checked })}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="showGender">Show Gender</Label>
                            <Switch
                                id="showGender"
                                checked={profile.showGender}
                                onCheckedChange={(checked) => setProfile({ ...profile, showGender: checked })}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="showLocation">Show Location</Label>
                            <Switch
                                id="showLocation"
                                checked={profile.showLocation}
                                onCheckedChange={(checked) => setProfile({ ...profile, showLocation: checked })}
                            />
                        </div>
                    </div>
                )}
                <Button className="mt-8 w-full" onClick={handleSaveProfile}>Save Profile</Button>
            </div>
        </div>
    )
}
