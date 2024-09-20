// components/SearchBar.tsx

'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon, X } from 'lucide-react'
import { getKeywordSuggestions } from '@/server/keyword-actions'

export function SearchBar({ hideOnSearch = false }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
    const router = useRouter()
    const pathname = usePathname()

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
    }

    const removeKeyword = (keyword: string) => {
        setSelectedKeywords(prev => prev.filter(k => k !== keyword))
    }

    if (hideOnSearch && pathname === '/search') {
        return null
    }

    return (
        <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center flex-wrap gap-2 p-2 border rounded-md">
                {selectedKeywords.map((keyword, index) => (
                    <div key={index} className="flex items-center bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                        {keyword}
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-1 p-0 h-4 w-4"
                            onClick={() => removeKeyword(keyword)}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                ))}
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow border-none shadow-none"
                />
                <Button type="submit" variant="ghost" size="icon">
                    <SearchIcon className="h-4 w-4" />
                </Button>
            </div>
            {suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-lg">
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
