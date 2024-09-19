import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ChevronLeft, ChevronRight, Settings, Copy } from "lucide-react"

// Arrays of images and gradients
const images = [
    "/images/global-network.jpg",
    "/images/shared-interests.jpg",
    "/images/diverse-friends.jpg",
    "/images/community.jpg",
    "/images/connection.jpg"
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

interface BackgroundSliderProps {
    children: React.ReactNode
}

const BackgroundSlider: React.FC<BackgroundSliderProps> = ({ children }) => {
    const [currentImage, setCurrentImage] = useState(0)
    const [currentGradient, setCurrentGradient] = useState(0)
    const [currentBlendMode, setCurrentBlendMode] = useState(0)
    const [effectStrength, setEffectStrength] = useState(70)
    const [showSettings, setShowSettings] = useState(false)

    const handleChangeImage = (direction: number) => {
        setCurrentImage((prev) => (prev + direction + images.length) % images.length)
    }

    const handleChangeGradient = (direction: number) => {
        setCurrentGradient((prev) => (prev + direction + gradients.length) % gradients.length)
    }

    const handleChangeBlendMode = (direction: number) => {
        setCurrentBlendMode((prev) => (prev + direction + blendModes.length) % blendModes.length)
    }

    const handleChangeEffectStrength = (value: number) => {
        setEffectStrength(value)
    }

    const generateJSX = () => {
        return `<BackgroundSlider
  currentImage={${currentImage}}
  currentGradient={${currentGradient}}
  currentBlendMode={${currentBlendMode}}
  effectStrength={${effectStrength}}
>
  {/* Your content here */}
</BackgroundSlider>`
    }

    const copyJSX = () => {
        navigator.clipboard.writeText(generateJSX())
        alert('JSX copied to clipboard!')
    }

    // Settings popup component
    const SettingsPopup = () => (
        <div className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-lg z-30 max-w-sm">
            <h2 className="text-lg font-bold mb-2">Settings</h2>
            <div className="mb-4">
                <h3 className="text-sm font-semibold mb-1">Background Image</h3>
                <div className="flex items-center">
                    <Button onClick={() => handleChangeImage(-1)} className="mr-2"><ChevronLeft className="h-4 w-4" /></Button>
                    <span>{currentImage + 1} / {images.length}</span>
                    <Button onClick={() => handleChangeImage(1)} className="ml-2"><ChevronRight className="h-4 w-4" /></Button>
                </div>
            </div>
            <div className="mb-4">
                <h3 className="text-sm font-semibold mb-1">Gradient Overlay</h3>
                <div className="flex items-center">
                    <Button onClick={() => handleChangeGradient(-1)} className="mr-2"><ChevronLeft className="h-4 w-4" /></Button>
                    <span>{currentGradient + 1} / {gradients.length}</span>
                    <Button onClick={() => handleChangeGradient(1)} className="ml-2"><ChevronRight className="h-4 w-4" /></Button>
                </div>
            </div>
            <div className="mb-4">
                <h3 className="text-sm font-semibold mb-1">Blend Mode</h3>
                <div className="flex items-center">
                    <Button onClick={() => handleChangeBlendMode(-1)} className="mr-2"><ChevronLeft className="h-4 w-4" /></Button>
                    <span>{blendModes[currentBlendMode]} ({currentBlendMode + 1} / {blendModes.length})</span>
                    <Button onClick={() => handleChangeBlendMode(1)} className="ml-2"><ChevronRight className="h-4 w-4" /></Button>
                </div>
            </div>
            <div className="mb-4">
                <h3 className="text-sm font-semibold mb-1">Effect Strength</h3>
                <Slider
                    value={[effectStrength]}
                    onValueChange={(value) => handleChangeEffectStrength(value[0])}
                    max={100}
                    step={1}
                />
                <span className="text-sm">{effectStrength}%</span>
            </div>
            <Button onClick={copyJSX} className="w-full mb-2">
                <Copy className="h-4 w-4 mr-2" />
                Export Settings
            </Button>
            <Button onClick={() => setShowSettings(false)} className="w-full">Close</Button>
        </div>
    )

    return (
        <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={images[currentImage]}
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </div>
            <div
                className={`absolute inset-0 ${gradients[currentGradient]}`}
                style={{
                    mixBlendMode: blendModes[currentBlendMode],
                    opacity: effectStrength / 100
                }}
            />

            <div className="relative z-10 h-full">
                {children}
            </div>

            <Button
                onClick={() => setShowSettings(!showSettings)}
                className="absolute top-4 right-4 z-20 bg-white text-gray-800 hover:bg-gray-200"
                aria-label="Toggle settings"
            >
                <Settings className="h-6 w-6" />
            </Button>

            {showSettings && <SettingsPopup />}
        </div>
    )
}

export default BackgroundSlider
