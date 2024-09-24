'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon, X } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export function SearchBar({ hideOnSearch = false }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const inputRef = useRef<HTMLInputElement>(null)
    const popoverTriggerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const query = searchParams.get('q')
        if (query) {
            setSelectedKeywords(query.split(','))
        }
    }, [searchParams])

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.length > 1) {
                try {
                    const response = await fetch(`/api/keywords/suggestions?q=${encodeURIComponent(searchTerm)}`)
                    if (response.ok) {
                        const data = await response.json()
                        setSuggestions(data.filter((s: string) => !selectedKeywords.includes(s)))
                    } else {
                        console.error('Failed to fetch keyword suggestions')
                    }
                } catch (error) {
                    console.error('Error fetching keyword suggestions:', error)
                }
            } else {
                setSuggestions([])
            }
        }

        fetchSuggestions()
    }, [searchTerm, selectedKeywords])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const searchQuery = [...selectedKeywords, searchTerm].filter(Boolean).join(',')
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        setSearchTerm('')
    }

    const addKeywordToSearch = (keyword: string) => {
        setSelectedKeywords(prev => [...prev, keyword])
        setSearchTerm('')
        inputRef.current?.focus()
    }

    const removeKeyword = (keyword: string) => {
        setSelectedKeywords(prev => prev.filter(k => k !== keyword))
    }

    const clearAllKeywords = () => {
        setSelectedKeywords([])
        setIsPopoverOpen(false)
    }

    if (hideOnSearch && searchParams.get('q')) {
        return null
    }

    return (
        <form onSubmit={handleSearch} className="relative flex items-center w-full">
            <div className="relative flex-grow">
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder={selectedKeywords.length > 0 ? "" : "Search..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-16"
                />
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                        <div
                            ref={popoverTriggerRef}
                            onMouseEnter={() => setIsPopoverOpen(true)}
                            onMouseLeave={() => setIsPopoverOpen(false)}
                            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                            <Badge variant="secondary">
                                {selectedKeywords.length}
                            </Badge>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-64"
                        onMouseEnter={() => setIsPopoverOpen(true)}
                        onMouseLeave={() => setIsPopoverOpen(false)}
                    >
                        <div className="flex flex-wrap gap-1 max-w-xs">
                            {selectedKeywords.map((keyword, index) => (
                                <Badge key={index} variant="outline" className="flex items-center gap-1">
                                    {keyword}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="h-4 w-4 p-0"
                                        onClick={() => removeKeyword(keyword)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                        {selectedKeywords.length > 0 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={clearAllKeywords}
                                className="mt-2 text-xs w-full"
                            >
                                Clear All
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>
            </div>
            <Button type="submit" variant="ghost" size="icon" className="ml-2">
                <SearchIcon className="h-4 w-4" />
            </Button>
            {suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-lg top-full">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => addKeywordToSearch(suggestion)}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </form>
    )
}
