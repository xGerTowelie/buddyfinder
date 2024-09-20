'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AnimatedProfile } from "@/components/Profiles"
import { updateProfile, getProfile } from "@/server/profile-actions"
import { useToast } from "@/hooks/use-toast"
import { ZodError } from "zod"
import { Profile, ProfileSchema } from "@/lib/validation"
import { GeneralSection, IcebreakersSection, KeywordsSection, PrivacySection, TopKeywordsSection } from "@/components/profile"

const tabs = [
    { id: "general", label: "General" },
    { id: "keywords", label: "Keywords" },
    { id: "topKeywords", label: "Top Keywords" },
    { id: "icebreakers", label: "Icebreakers" },
    { id: "privacy", label: "Privacy" },
]


const defaultProfile: Profile = {
    nickname: "",
    age: 0,
    gender: "",
    location: "",
    showAge: false,
    showGender: false,
    showLocation: false,
    keywords: [],
    topKeywords: [null, null, null, null, null],
    icebreakers: [],
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("general")
    const [profile, setProfile] = useState<Profile>(defaultProfile)
    const { toast } = useToast()

    useEffect(() => {
        const fetchProfile = async () => {
            const fetchedProfile = await getProfile()
            if (fetchedProfile) {
                // Ensure topKeywords array has exactly 5 elements, fill with null if necessary
                const topKeywords = fetchedProfile.topKeywords.concat(Array(5).fill(null)).slice(0, 5);
                setProfile({ ...fetchedProfile, topKeywords });
            }
        }
        fetchProfile()
    }, [])

    const handleSaveProfile = async () => {
        try {
            // Validate the profile data
            ProfileSchema.parse(profile)

            const result = await updateProfile(profile)
            if (result.success) {
                toast({
                    title: "Profile updated successfully",
                    description: "Your profile changes have been saved.",
                })
            } else {
                throw new Error(result.error || "Failed to update profile")
            }
        } catch (error) {
            console.error('Failed to update profile:', error)
            let errorMessage = "An unknown error occurred";
            if (error instanceof ZodError) {
                errorMessage = error.issues.map(issue => issue.message).join(", ");
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast({
                title: "Failed to update profile",
                description: errorMessage,
                variant: "destructive",
            })
        }
    }

    const handleImageUpload = async (url: string) => {
        try {
            const updatedProfile = { ...profile, profileImage: url };
            const result = await updateProfile(updatedProfile);
            if (result.success) {
                setProfile(updatedProfile);
                toast({
                    title: "Profile image updated",
                    description: "Your profile image has been successfully updated.",
                });
            } else {
                throw new Error(result.error || "Failed to update profile image");
            }
        } catch (error) {
            console.error('Error updating profile image:', error);
            toast({
                title: "Failed to update profile image",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="flex h-[calc(100vh-120px)] bg-white px-8 py-4 rounded-xl overflow-hidden shadow-sm border-[1px] border-neutral-200 shadow-slate-300">
            <div className="w-64 border-r pr-4">
                <div className="mb-6 flex flex-col items-center">
                    <AnimatedProfile
                        imageUrl={profile.profileImage || "/placeholder-user.jpg"}
                        size="xl"
                        showSupportBadge={true}
                        variant="ripple"
                        onImageUpload={handleImageUpload}
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
                {activeTab === "general" && <GeneralSection profile={profile} setProfile={setProfile} />}
                {activeTab === "keywords" && <KeywordsSection profile={profile} setProfile={setProfile} />}
                {activeTab === "topKeywords" && <TopKeywordsSection profile={profile} setProfile={setProfile} />}
                {activeTab === "icebreakers" && <IcebreakersSection profile={profile} setProfile={setProfile} />}
                {activeTab === "privacy" && <PrivacySection profile={profile} setProfile={setProfile} />}
                <Button className="mt-8 w-full" onClick={handleSaveProfile}>Save Profile</Button>
            </div>
        </div>
    )
}
