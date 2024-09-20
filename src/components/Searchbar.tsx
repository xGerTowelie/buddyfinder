'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'
import { getKeywordSuggestions } from '@/server/keyword-actions'

export function SearchBar({ hideOnSearch = false }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.length > 1) {
                const keywordSuggestions = await getKeywordSuggestions(searchTerm)
                setSuggestions(keywordSuggestions)
            } else {
                setSuggestions([])
            }
        }

        fetchSuggestions()
    }, [searchTerm])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }

    const addKeywordToSearch = (keyword: string) => {
        setSearchTerm(prev => {
            const terms = prev.split(' ')
            terms.pop()
            return [...terms, keyword].join(' ') + ' '
        })
    }

    if (hideOnSearch && router.pathname === '/search') {
        return null
    }

    return (
        <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center">
                <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                />
                <Button type="submit" variant="ghost" size="icon" className="ml-2">
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
