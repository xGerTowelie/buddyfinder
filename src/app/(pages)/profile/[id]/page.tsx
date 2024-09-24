import { notFound } from 'next/navigation'
import { AnimatedProfile } from '@/components/Profiles'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import prisma from '@/lib/prisma'

async function getUser(id: string) {
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            keywords: true,
            topKeywords: true,
            icebreakers: true,
        },
    })

    if (!user) {
        notFound()
    }

    return user
}

export default async function UserProfilePage({ params }: { params: { id: string } }) {
    const user = await getUser(params.id)

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="flex flex-col items-center space-y-4 pb-2">
                    <AnimatedProfile
                        imageUrl={user.profileImage || "/placeholder-user.jpg"}
                        size="lg"
                        enableHover={false}
                    />
                    <div className="text-center">
                        <CardTitle className="text-3xl">{user.nickname || user.username}</CardTitle>
                        <p className="text-gray-500">@{user.username}</p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {user.bio && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Bio</h2>
                            <p>{user.bio}</p>
                        </div>
                    )}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Keywords</h2>
                        <div className="flex flex-wrap gap-2">
                            {user.keywords.map((keyword) => (
                                <Badge key={keyword.id} variant="secondary">{keyword.word}</Badge>
                            ))}
                        </div>
                    </div>
                    {user.topKeywords.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Top Keywords</h2>
                            <div className="flex flex-wrap gap-2">
                                {user.topKeywords.map((keyword) => (
                                    <Badge key={keyword.id} variant="default">{keyword.word}</Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    {user.icebreakers.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Icebreakers</h2>
                            <ul className="list-disc list-inside space-y-2">
                                {user.icebreakers.map((icebreaker) => (
                                    <li key={icebreaker.id}>{icebreaker.question}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
