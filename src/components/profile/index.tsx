import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { PlusIcon, XIcon } from "lucide-react"
import { Keyword, Profile } from '@/lib/validation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface SectionProps {
    profile: Profile
    setProfile: React.Dispatch<React.SetStateAction<Profile>>
}

const EMPTY_VALUE = "__EMPTY__";

export const GeneralSection: React.FC<SectionProps> = ({ profile, setProfile }) => (
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
        <div>
            <Label htmlFor="animation">Profile Animation</Label>
            <Select
                value={profile.animation}
                onValueChange={(value) => setProfile({ ...profile, animation: value as Profile['animation'] })}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select an animation" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="neon">Neon</SelectItem>
                    <SelectItem value="ripple">Ripple</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="rainbow">Rainbow</SelectItem>
                    <SelectItem value="pixelate">Pixelate</SelectItem>
                    <SelectItem value="liquid">Liquid</SelectItem>
                    <SelectItem value="bounce">Bounce</SelectItem>
                    <SelectItem value="flip">Flip</SelectItem>
                    <SelectItem value="morph">Morph</SelectItem>
                    <SelectItem value="hologram">Hologram</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
)

export const KeywordsSection: React.FC<SectionProps> = ({ profile, setProfile }) => {
    const handleKeywordChange = (index: number, field: keyof Keyword, value: string) => {
        const newKeywords = [...profile.keywords]
        newKeywords[index] = { ...newKeywords[index], [field]: value }
        setProfile({ ...profile, keywords: newKeywords })
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

    return (
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
    )
}

export const TopKeywordsSection: React.FC<SectionProps> = ({ profile, setProfile }) => {
    const handleTopKeywordChange = (index: number, selectedKeyword: Keyword | null) => {
        const newTopKeywords = [...profile.topKeywords];
        newTopKeywords[index] = selectedKeyword;
        setProfile({ ...profile, topKeywords: newTopKeywords });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Top 5 Keywords</h2>
            {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="space-y-2 pb-4 border-b">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold">#{index + 1}</span>
                        <Select
                            value={profile.topKeywords[index]?.word || EMPTY_VALUE}
                            onValueChange={(value) => {
                                const selectedKeyword = value === EMPTY_VALUE ? null : profile.keywords.find(k => k.word === value) || null;
                                handleTopKeywordChange(index, selectedKeyword);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a keyword" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={EMPTY_VALUE}>None</SelectItem>
                                {profile.keywords.map((keyword) => (
                                    <SelectItem key={keyword.word} value={keyword.word}>
                                        {keyword.word}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {profile.topKeywords[index] && (
                        <Textarea
                            value={profile.topKeywords[index]?.description || ""}
                            onChange={(e) => {
                                const newTopKeywords = [...profile.topKeywords];
                                if (newTopKeywords[index]) {
                                    newTopKeywords[index] = { ...newTopKeywords[index]!, description: e.target.value };
                                    setProfile({ ...profile, topKeywords: newTopKeywords });
                                }
                            }}
                            placeholder="Description (min 50 characters)"
                            minLength={50}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export const IcebreakersSection: React.FC<SectionProps> = ({ profile, setProfile }) => {
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

    return (
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
    )
}

export const PrivacySection: React.FC<SectionProps> = ({ profile, setProfile }) => (
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
)
