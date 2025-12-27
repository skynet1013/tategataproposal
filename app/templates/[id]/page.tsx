"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Copy, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Film, Layers, Clock, MapPin } from "lucide-react"

// Mock detail data (in a real app, fetch from DB)
// Reusing structure similar to ProposalPage but read-only
const mockFullTemplate = {
    id: "tpl-001",
    title: "放課後の怪談：鏡の中の自分",
    author: "HorrorMaster_99",
    genre: "horror",
    viralStrategy: "retention",
    description: "学校の鏡を使った定番ホラーですが、ラストのオチでコメント欄を議論させる構成です。",
    tags: ["学校", "鏡", "どんでん返し"],
    script: [
        {
            id: 1,
            duration: 5,
            location: "学校のトイレ",
            description: "【0-5秒】フック。主人公が鏡を見つめている。鏡の中の自分が一瞬遅れて動く。",
            dialogue: [{ speaker: "主人公", text: "あれ...？" }],
            imagePrompt: "Mirror reflection lagging behind, scary atmosphere",
            imageUrl: "/mock/horror_1.png"
        },
        {
            id: 2,
            duration: 15,
            location: "廊下",
            description: "【5-20秒】導入。友人に話すが信じてもらえない。",
            dialogue: [
                { speaker: "主人公", text: "本当に遅れて動いたんだって！" },
                { speaker: "友人", text: "寝不足じゃない？（笑）" }
            ],
            imagePrompt: "School hallway, students talking",
            imageUrl: "/mock/horror_2.png"
        },
        {
            id: 3,
            duration: 25,
            location: "夜の学校",
            description: "【20-45秒】展開。忘れ物を取りに戻ると、鏡の中から視線を感じる。",
            dialogue: [{ speaker: "NA", text: "（不気味な足音）" }],
            imagePrompt: "Dark school at night, eerie shadows",
            imageUrl: "/mock/horror_3.png"
        },
        {
            id: 4,
            duration: 15,
            location: "トイレの鏡前",
            description: "【45-60秒】クライマックス。鏡の中の自分がニヤリと笑い、手を伸ばしてくる。",
            dialogue: [
                { speaker: "主人公", text: "やめて！こっちに来ないで！" },
                { speaker: "鏡の自分", text: "交代の時間だよ..." }
            ],
            imagePrompt: "Reflection smiling creepily, reaching out",
            imageUrl: "/mock/horror_4.png"
        }
    ]
}

export default function TemplateDetailPage() {
    const params = useParams()

    // In reality, use params.id to fetch data
    const template = mockFullTemplate

    const handleCopy = () => {
        alert("コピー完了: この企画をあなたのライブラリにコピーしました。（デモ）")
    }

    return (
        <div className="container mx-auto min-h-screen px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <Link href="/templates" className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-1 h-3 w-3" /> 一覧に戻る
                </Link>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{template.title}</h1>
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <span>By {template.author}</span>
                            <span>•</span>
                            <Badge variant="secondary" className="capitalize">{template.genre}</Badge>
                            <Badge variant="outline">{template.viralStrategy} 戦略</Badge>
                        </div>
                        <p className="mt-4 max-w-2xl text-muted-foreground">
                            {template.description}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                            <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                        </Button>
                        <Button onClick={handleCopy}>
                            <Copy className="mr-2 h-4 w-4" /> この企画を使う
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content using slightly modified ProposalPage structure */}
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
                    {template.script.map((scene, index) => (
                        <Card key={scene.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
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
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="storyboard" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {template.script.map((scene, index) => (
                        <Card key={scene.id}>
                            <div className="aspect-[9/16] w-full overflow-hidden bg-muted">
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
