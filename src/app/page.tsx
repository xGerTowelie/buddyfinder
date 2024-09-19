'use client'

import { useState } from 'react'
import Image from 'next/image'
import FullscreenSlide from '@/components/FullscreenSlide'

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            title: "Revolutionizing User Interfaces",
            content: (
                <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto p-4">
                    <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="UI Design Concept"
                        width={300}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                    <p className="text-gray-300 text-lg md:max-w-md">
                        Our cutting-edge UI designs blend aesthetics with functionality,
                        creating intuitive interfaces that users love to interact with.
                    </p>
                </div>
            ),
            gradientFrom: "from-purple-900",
            gradientTo: "to-indigo-700"
        },
        {
            title: "AI-Powered Analytics",
            content: (
                <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto p-4">
                    <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="AI Analytics Dashboard"
                        width={300}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                    <p className="text-gray-300 text-lg md:max-w-md">
                        Harness the power of AI to gain deep insights into your data.
                        Our analytics platform turns complex information into actionable strategies.
                    </p>
                </div>
            ),
            gradientFrom: "from-blue-900",
            gradientTo: "to-cyan-700"
        },
        {
            title: "Secure Cloud Infrastructure",
            content: (
                <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto p-4">
                    <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Cloud Security Concept"
                        width={300}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                    <p className="text-gray-300 text-lg md:max-w-md">
                        Our state-of-the-art cloud infrastructure ensures your data is
                        always secure, scalable, and accessible, giving you peace of mind.
                    </p>
                </div>
            ),
            gradientFrom: "from-emerald-900",
            gradientTo: "to-teal-700"
        },
        {
            title: "Seamless Integration",
            content: (
                <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto p-4">
                    <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt="Integration Diagram"
                        width={300}
                        height={300}
                        className="rounded-lg shadow-lg"
                    />
                    <p className="text-gray-300 text-lg md:max-w-md">
                        Our platform effortlessly integrates with your existing tools and workflows,
                        enhancing productivity without disrupting your established processes.
                    </p>
                </div>
            ),
            gradientFrom: "from-rose-900",
            gradientTo: "to-pink-700"
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
