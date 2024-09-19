'use client'

import { useState } from 'react'
import Image from 'next/image'
import FullscreenSlide from '@/components/FullscreenSlide'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            title: "Connect Globally Through Shared Interests",
            content: (
                <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto p-4">
                    <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Global Community Illustration"
                        width={300}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                    <p className="text-gray-300 text-lg text-center md:max-w-2xl">
                        Welcome to a free, globally accessible platform that connects people based on shared interests.
                        No ads, no paywalls, just authentic connections.
                    </p>
                    <Link href="/register">
                        <Button className="bg-white text-blue-600 hover:bg-blue-100">
                            Join Now
                        </Button>
                    </Link>
                </div>
            ),
            gradientFrom: "from-blue-900",
            gradientTo: "to-indigo-700"
        },
        {
            title: "Discover Your Tribe",
            content: (
                <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto p-4">
                    <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Interest Matching Concept"
                        width={300}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                    <p className="text-gray-300 text-lg md:max-w-md">
                        Our platform focuses on connecting you with people who share your passions,
                        skills, and hobbies. Find your tribe across borders and cultures.
                    </p>
                </div>
            ),
            gradientFrom: "from-purple-900",
            gradientTo: "to-pink-700"
        },
        {
            title: "Your Interests, Your Identity",
            content: (
                <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto p-4">
                    <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Profile Creation Concept"
                        width={300}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                    <p className="text-gray-300 text-lg md:max-w-md">
                        Create a profile that truly represents you. Highlight your top 5 interests,
                        add descriptions, and control your privacy. It's all about what matters to you.
                    </p>
                </div>
            ),
            gradientFrom: "from-green-900",
            gradientTo: "to-teal-700"
        },
        {
            title: "Meaningful Connections",
            content: (
                <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto p-4">
                    <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Messaging Concept"
                        width={300}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                    <p className="text-gray-300 text-lg md:max-w-md">
                        Connect with like-minded individuals through our simple messaging system.
                        Start conversations based on shared interests and build lasting relationships.
                    </p>
                </div>
            ),
            gradientFrom: "from-orange-900",
            gradientTo: "to-yellow-700"
        },
        {
            title: "Join Our Global Community",
            content: (
                <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto p-4">
                    <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Global Community"
                        width={300}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                    <p className="text-gray-300 text-lg text-center md:max-w-2xl">
                        Be part of a platform that values authentic connections and shared interests.
                        Start your journey to meaningful, cross-border relationships today.
                    </p>
                    <Link href="/register">
                        <Button className="bg-white text-blue-600 hover:bg-blue-100">
                            Register Now
                        </Button>
                    </Link>
                </div>
            ),
            gradientFrom: "from-red-900",
            gradientTo: "to-orange-700"
        }
    ]

    const handleNext = () => {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
    }

    const handlePrev = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
    }

    const currentSlideData = slides[currentSlide]

    return (
        <FullscreenSlide
            title={currentSlideData.title}
            gradientFrom={currentSlideData.gradientFrom}
            gradientTo={currentSlideData.gradientTo}
            onNext={handleNext}
            onPrev={handlePrev}
            currentSlide={currentSlide}
            totalSlides={slides.length}
        >
            {currentSlideData.content}
        </FullscreenSlide>
    )
}
