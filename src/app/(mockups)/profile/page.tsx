'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AnimatedProfile } from "@/components/Profiles"
import { updateProfile, getProfile } from "@/server/profile-actions"
import { useToast } from "@/hooks/use-toast"
import { ZodError } from "zod"
import { Profile, ProfileSchema } from "@/lib/validation"
import { GeneralSection, IcebreakersSection, KeywordsSection, PrivacySection, TopKeywordsSection } from "@/components/profile"

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
    profileImage: null,
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("general")
    const [profile, setProfile] = useState<Profile>(defaultProfile)
    const { toast } = useToast()

    useEffect(() => {
        const fetchProfile = async () => {
            const fetchedProfile = await getProfile()
            if (fetchedProfile) {
                const topKeywords = fetchedProfile.topKeywords.concat(Array(5).fill(null)).slice(0, 5);
                setProfile({ ...fetchedProfile, topKeywords });
            }
        }
        fetchProfile()
    }, [])

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

    const handleSaveProfile = async () => {
        try {
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
                    {["general", "keywords", "topKeywords", "icebreakers", "privacy"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full px-4 py-2 text-left rounded-lg ${activeTab === tab ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
