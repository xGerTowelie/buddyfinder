'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Settings } from "lucide-react"
import AuthButton from '@/auth/AuthButton.server'

// Arrays of images and gradients
const images = [
    "/images/earth.jpg",
    "/images/city.jpg",
    "/images/shanghai.jpg",
    "/images/global.jpg",
    "/images/rome.jpg",
    "/images/friends.jpg",
    "/images/chatting.jpg",
    "/images/money.jpg",
    "/images/technology.jpg",
    "/images/relaxed.jpg",
    "/images/fun.jpg",
]

const gradients = [
    // Original
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",

    // Variations with different colors and opacities
    "bg-gradient-to-r from-blue-500/80 via-teal-500/70 to-green-500/90",
    "bg-gradient-to-r from-red-500/75 via-orange-500/85 to-yellow-500/70",
    "bg-gradient-to-r from-fuchsia-500/90 via-rose-500/80 to-amber-500/85",
    "bg-gradient-to-r from-cyan-500/70 via-sky-500/80 to-indigo-500/75",
    "bg-gradient-to-r from-emerald-500/85 via-lime-500/75 to-yellow-500/80",

    // Variations with different directions
    "bg-gradient-to-br from-violet-500/80 via-purple-500/70 to-fuchsia-500/90",
    "bg-gradient-to-bl from-pink-500/75 via-rose-500/85 to-red-500/70",
    "bg-gradient-to-tr from-blue-500/90 via-indigo-500/80 to-violet-500/85",

    // Variations with more color stops
    "bg-gradient-to-r from-red-500/70 via-orange-500/80 via-yellow-500/75 to-green-500/85",
    "bg-gradient-to-r from-blue-500/85 via-indigo-500/75 via-purple-500/80 to-pink-500/70",

    // Variations with custom colors and opacities
    "bg-gradient-to-r from-[#ff9a9e]/80 via-[#fad0c4]/70 to-[#ffecd2]/90",
    "bg-gradient-to-r from-[#a18cd1]/75 via-[#fbc2eb]/85 to-[#fad0c4]/80",

    // Variation with alternating opacities
    "bg-gradient-to-r from-purple-500/90 via-pink-500/50 via-red-500/90 to-orange-500/50"
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

const slides = [
    {
        title: "Meet BuddyFinder",
        content: "BuddyFinder helps you connect with people who share your passions, whether it’s music, sports, or hobbies. It’s not about where you live or how old you are – just genuine connections through what you love."
    },
    {
        title: "No Costs – Just Connection",
        content: "Everything here is free! No ads or hidden fees. If you love BuddyFinder and want to support it, you can drop a donation or grab some profile visuals. Otherwise, just enjoy connecting!"
    },
    {
        title: "Find People by Keywords",
        content: "Tell us what you’re into, and we’ll help you find others who love the same things. Just use simple keywords – it’s an easy way to meet people with the same interests, no complicated algorithms."
    },
    {
        title: "Easy Friend Requests",
        content: "Found someone cool? Send them a friend request, and even answer one of their questions to break the ice. Connecting has never been this easy or fun."
    },
    {
        title: "Simple Chatting",
        content: "Once you're connected, you can chat right here on BuddyFinder. It’s simple and text-based – perfect for getting to know each other better and making plans."
    },
    {
        title: "Find Buddies Nearby",
        content: "Looking for someone local? Set your location to find friends nearby. Whether it’s for a workout or a hangout, BuddyFinder makes local connections easy."
    },
    {
        title: "Search Globally",
        content: "Distance doesn’t matter here! Whether you’re looking for a gaming buddy or a language partner, BuddyFinder helps you find friends no matter where they live."
    },
    {
        title: "Easy Settings",
        content: "BuddyFinder keeps it simple, but if you want to tweak things like privacy or notifications, the settings page has you covered."
    },
    {
        title: "Be Kind and Connect",
        content: "We’re all about positive connections. Be respectful and enjoy meeting new people. Who knows? You might find some amazing friends. Ready to join?",
        buttonText: "Sign Up Now",
        buttonLink: "/signup"
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
                className="blur-[2px]"
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
                className="text-6xl md:text-8xl font-bold text-white text-center"
            >
                {slide.title}
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white font-semibold text-2xl md:text-3xl text-center md:max-w-4xl"
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
                        <Button variant="default" className="text-2xl px-10 py-6 opacity-80 hover:opacity-100 hover:scale-110 transition-all" >
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

            <div
                className="absolute top-4 right-20 z-20">
                <Link href="/signin">
                    <Button variant="secondary">Login</Button>
                </Link>

            </div>
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

            <div className="absolute bottom-1/4 left-0 right-0 flex justify-center items-center gap-4 z-20">
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
