'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FullscreenSlideProps {
    title: string
    children: React.ReactNode
    gradientFrom?: string
    gradientTo?: string
    onNext?: () => void
    onPrev?: () => void
    currentSlide: number
    totalSlides: number
}

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0,
    }),
}

export default function FullscreenSlide({
    title,
    children,
    gradientFrom = "from-gray-900",
    gradientTo = "to-gray-800",
    onNext,
    onPrev,
    currentSlide,
    totalSlides,
}: FullscreenSlideProps) {
    const [direction, setDirection] = React.useState(0)

    const handleNext = () => {
        setDirection(1)
        onNext?.()
    }

    const handlePrev = () => {
        setDirection(-1)
        onPrev?.()
    }

    return (
        <div className={`fixed inset-0 overflow-hidden flex flex-col justify-between p-8 bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
            <motion.h1
                key={title}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-white text-center mb-8"
            >
                {title}
            </motion.h1>

            <div className="relative flex-grow flex items-center justify-center overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="absolute w-full h-full flex items-center justify-center"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                    onClick={handlePrev}
                    disabled={currentSlide === 0}
                    className="bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-white font-medium">
                    {currentSlide + 1} / {totalSlides}
                </span>
                <Button
                    onClick={handleNext}
                    disabled={currentSlide === totalSlides - 1}
                    className="bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50"
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
