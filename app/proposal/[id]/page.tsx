"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Clock, Download, MapPin, Film, Layers } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateProposal } from "@/lib/ai-service"
import { Proposal } from "@/lib/types"
import { saveProposal, getProposalById } from "@/lib/storage"

export default function ProposalPage() {
    const searchParams = useSearchParams()
    const [proposal, setProposal] = useState<Proposal | null>(null)
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
        // Reconstruct input from URL params for demo purposes
        const genre = searchParams.get("genre") || "romance"
        const title = searchParams.get("title")
        const duration = searchParams.get("duration") || "60"

        // Simulate fetching/generating based on ID/Params
        generateProposal({
            genre,
            title,
            duration,
            targetAudience: "Z世代", // Mock defaults if not passed
            viralGoal: "retention",
            characters: [{ name: "主人公", description: "メインキャラクター" }]
        }).then((p) => {
            setProposal(p)
        })
    }, [searchParams])

    const handleSave = () => {
        if (proposal) {
            saveProposal(proposal)
            setIsSaved(true)
            setTimeout(() => setIsSaved(false), 2000)
        }
    }

    const handleExport = () => {
        window.print()
    }

    if (!proposal) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-pulse text-primary">企画書を生成中...</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto min-h-screen px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <Link href="/create" className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="mr-1 h-3 w-3" /> 作成画面に戻る
                    </Link>
                    <h1 className="text-3xl font-bold">{proposal.title}</h1>
                    <div className="mt-2 flex gap-2">
                        <Badge variant="secondary" className="capitalize">{proposal.genre}</Badge>
                        <Badge variant="outline" className="capitalize">{proposal.viralStrategy} 戦略</Badge>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" /> PDF出力
                    </Button>
                    <Button onClick={handleSave} disabled={isSaved}>
                        {isSaved ? "保存済み" : "ライブラリに保存"}
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="script" className="w-full">
                <TabsList className="mb-8 grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="script">
                        <Film className="mr-2 h-4 w-4" /> 脚本ビュー
                    </TabsTrigger>
                    <TabsTrigger value="storyboard">
                        <Layers className="mr-2 h-4 w-4" /> 絵コンテ
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="script" className="space-y-6">
                    {proposal.script.map((scene, index) => (
                        <Card key={scene.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                {/* Scene Meta */}
                                <div className="flex w-full min-w-[200px] flex-col justify-center border-b bg-muted/30 p-6 md:w-48 md:border-b-0 md:border-r">
                                    <span className="text-4xl font-bold text-primary/20">#{index + 1}</span>
                                    <div className="mt-4 space-y-2 text-sm">
                                        <div className="flex items-center text-muted-foreground">
                                            <Clock className="mr-2 h-3 w-3" /> {scene.duration}秒
                                        </div>
                                        <div className="flex items-center text-muted-foreground">
                                            <MapPin className="mr-2 h-3 w-3" /> {scene.location}
                                        </div>
                                    </div>
                                </div>

                                {/* Script Content */}
                                <div className="flex-1 p-6">
                                    <div className="mb-4 rounded-md bg-accent/20 p-3 text-sm italic text-muted-foreground">
                                        {scene.description}
                                    </div>
                                    <div className="space-y-4">
                                        {scene.dialogue.map((line, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-24 shrink-0 font-bold text-sm text-primary">
                                                    {line.speaker}
                                                </div>
                                                <div className="text-sm">
                                                    {line.text}
                                                </div>
                                            </div>
                                        ))}
                                        {scene.dialogue.length === 0 && (
                                            <span className="text-sm text-muted-foreground italic">(セリフなし - 情景描写のみ)</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="storyboard" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {proposal.script.map((scene, index) => (
                        <Card key={scene.id}>
                            <div className="aspect-[9/16] w-full overflow-hidden bg-muted">
                                {/* Using placeholder images for now */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={scene.imageUrl}
                                    alt={`Scene ${index + 1}`}
                                    className="h-full w-full object-cover transition-transform hover:scale-105"
                                />
                            </div>
                            <CardContent className="p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="font-bold">シーン #{index + 1}</span>
                                    <Badge variant="outline">{scene.duration}秒</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-3">
                                    {scene.imagePrompt}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}
