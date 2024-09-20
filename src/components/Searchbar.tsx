'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon, X } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { getKeywordSuggestions } from '@/server/keyword-actions'

export function SearchBar({ hideOnSearch = false }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
    const router = useRouter()
    const pathname = usePathname()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.length > 1) {
                const keywordSuggestions = await getKeywordSuggestions(searchTerm)
                setSuggestions(keywordSuggestions.filter(s => !selectedKeywords.includes(s)))
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
    }

    if (hideOnSearch && pathname === '/search') {
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
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Badge
                                variant="secondary"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            >
                                {selectedKeywords.length}
                            </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
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
                                {selectedKeywords.length > 0 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearAllKeywords}
                                        className="text-xs"
                                    >
                                        Clear All
                                    </Button>
                                )}
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
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
