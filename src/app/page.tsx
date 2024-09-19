'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Settings } from "lucide-react"

// Arrays of images and gradients
const images = [
    "/images/earth.jpg",
    "/images/city.jpg",
    "/images/shanghai.jpg",
    "/images/city.jpg",
    "/images/city.jpg",
    "/images/city.jpg",
    "/images/city.jpg"
]

const gradients = [
    "bg-gradient-to-br from-teal-600 to-blue-800",
    "bg-gradient-to-br from-purple-600 to-indigo-800",
    "bg-gradient-to-br from-pink-600 to-orange-800",
    "bg-gradient-to-br from-green-600 to-yellow-800",
    "bg-gradient-to-br from-red-600 to-blue-800",
    "bg-gradient-to-br from-indigo-600 to-pink-800",
    "bg-gradient-to-br from-yellow-600 to-red-800",
    "bg-gradient-to-br from-blue-600 to-green-800",
    "bg-gradient-to-br from-orange-600 to-purple-800",
    "bg-gradient-to-br from-cyan-600 to-lime-800"
]

const blendModes = [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity"
]

// Slide data
const slides = [
    {
        title: "Discover BuddyFinder",
        content: "Connect with like-minded individuals across the globe. BuddyFinder brings people together through shared passions and interests.",
        buttonText: "Start Your Journey",
        buttonLink: "/register"
    },
    {
        title: "Connect Through Interests",
        content: "Find your tribe based on shared hobbies, skills, and passions. BuddyFinder helps you create meaningful connections worldwide.",
    },
    {
        title: "Join BuddyFinder Today",
        content: "Start your journey to authentic, global connections. Join BuddyFinder and discover a world of shared interests and new friendships.",
        buttonText: "Sign Up Now",
        buttonLink: "/register"
    }
]

// Slide component
const Slide = ({ slide, image, gradient, blendMode, effectStrength, isActive }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col justify-center items-center"
    >
        <div className="absolute inset-0 w-full h-full">
            <Image
                src={image}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                quality={100}
                priority={isActive}
            />
        </div>
        <div
            className={`absolute inset-0 ${gradient}`}
            style={{
                mixBlendMode: blendMode,
                opacity: effectStrength / 100
            }}
        />

        <div className="relative z-10 flex flex-col justify-center items-center h-full w-full p-8 space-y-12">
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold text-white text-center"
            >
                {slide.title}
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white text-xl md:text-2xl text-center md:max-w-3xl"
            >
                {slide.content}
            </motion.p>

            {slide.buttonText && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link href={slide.buttonLink}>
                        <Button className="bg-white text-teal-600 hover:bg-teal-100 text-lg px-6 py-3">
                            {slide.buttonText}
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
    </motion.div>
)

// Settings popup component
const SettingsPopup = ({
    currentImage,
    currentGradient,
    currentBlendMode,
    effectStrength,
    onChangeImage,
    onChangeGradient,
    onChangeBlendMode,
    onChangeEffectStrength,
    onClose
}) => (
    <div className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg z-30 max-w-sm">
        <h2 className="text-lg font-bold mb-2">Settings</h2>
        <div className="mb-4">
            <h3 className="text-sm font-semibold mb-1">Background Image</h3>
            <div className="flex items-center">
                <Button onClick={() => onChangeImage(-1)} className="mr-2"><ChevronLeft className="h-4 w-4" /></Button>
                <span>{currentImage + 1} / {images.length}</span>
                <Button onClick={() => onChangeImage(1)} className="ml-2"><ChevronRight className="h-4 w-4" /></Button>
            </div>
        </div>
        <div className="mb-4">
            <h3 className="text-sm font-semibold mb-1">Gradient Overlay</h3>
            <div className="flex items-center">
                <Button onClick={() => onChangeGradient(-1)} className="mr-2"><ChevronLeft className="h-4 w-4" /></Button>
                <span>{currentGradient + 1} / {gradients.length}</span>
                <Button onClick={() => onChangeGradient(1)} className="ml-2"><ChevronRight className="h-4 w-4" /></Button>
            </div>
        </div>
        <div className="mb-4">
            <h3 className="text-sm font-semibold mb-1">Blend Mode</h3>
            <div className="flex items-center">
                <Button onClick={() => onChangeBlendMode(-1)} className="mr-2"><ChevronLeft className="h-4 w-4" /></Button>
                <span>{blendModes[currentBlendMode]} ({currentBlendMode + 1} / {blendModes.length})</span>
                <Button onClick={() => onChangeBlendMode(1)} className="ml-2"><ChevronRight className="h-4 w-4" /></Button>
            </div>
        </div>
        <div className="mb-4">
            <h3 className="text-sm font-semibold mb-1">Effect Strength</h3>
            <Slider
                value={[effectStrength]}
                onValueChange={(value) => onChangeEffectStrength(value[0])}
                max={100}
                step={1}
            />
            <span className="text-sm">{effectStrength}%</span>
        </div>
        <Button onClick={onClose} className="w-full">Close</Button>
    </div>
)

// Main component
export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentImage, setCurrentImage] = useState(0)
    const [currentGradient, setCurrentGradient] = useState(0)
    const [currentBlendMode, setCurrentBlendMode] = useState(0)
    const [effectStrength, setEffectStrength] = useState(70)
    const [showSettings, setShowSettings] = useState(false)

    const handleNext = () => {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
    }

    const handlePrev = () => {
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
    }

    const handleChangeImage = (direction) => {
        setCurrentImage((prev) => (prev + direction + images.length) % images.length)
    }

    const handleChangeGradient = (direction) => {
        setCurrentGradient((prev) => (prev + direction + gradients.length) % gradients.length)
    }

    const handleChangeBlendMode = (direction) => {
        setCurrentBlendMode((prev) => (prev + direction + blendModes.length) % blendModes.length)
    }

    const handleChangeEffectStrength = (value) => {
        setEffectStrength(value)
    }

    return (
        <div className="fixed inset-0 overflow-hidden">
            <AnimatePresence mode="wait">
                <Slide
                    key={currentSlide}
                    slide={slides[currentSlide]}
                    image={images[currentImage]}
                    gradient={gradients[currentGradient]}
                    blendMode={blendModes[currentBlendMode]}
                    effectStrength={effectStrength}
                    isActive={true}
                />
            </AnimatePresence>

            <Button
                onClick={() => setShowSettings(!showSettings)}
                className="absolute top-4 right-4 z-20 bg-white text-gray-800 hover:bg-gray-200"
                aria-label="Toggle settings"
            >
                <Settings className="h-6 w-6" />
            </Button>

            {showSettings && (
                <SettingsPopup
                    currentImage={currentImage}
                    currentGradient={currentGradient}
                    currentBlendMode={currentBlendMode}
                    effectStrength={effectStrength}
                    onChangeImage={handleChangeImage}
                    onChangeGradient={handleChangeGradient}
                    onChangeBlendMode={handleChangeBlendMode}
                    onChangeEffectStrength={handleChangeEffectStrength}
                    onClose={() => setShowSettings(false)}
                />
            )}

            <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 z-20">
                <Button
                    onClick={handlePrev}
                    disabled={currentSlide === 0}
                    className="bg-white text-gray-800 hover:bg-gray-200 disabled:opacity-50 text-lg px-4 py-2"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <span className="text-white font-medium text-xl">
                    {currentSlide + 1} / {slides.length}
                </span>
                <Button
                    onClick={handleNext}
                    disabled={currentSlide === slides.length - 1}
                    className="bg-white text-gray-800 hover:bg-gray-200 disabled:opacity-50 text-lg px-4 py-2"
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
        </div>
    )
}
