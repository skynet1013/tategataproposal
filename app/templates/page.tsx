"use client"

import Link from "next/link"
import { ArrowLeft, Heart, Share2, Upload, User, Eye, Search } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock Data for Community Templates
const mockTemplates = [
    {
        id: "tpl-001",
        title: "放課後の怪談：鏡の中の自分",
        author: "HorrorMaster_99",
        genre: "horror",
        viralStrategy: "retention",
        likes: 1240,
        views: "45k",
        createdAt: "2024-03-15",
        description: "学校の鏡を使った定番ホラーですが、ラストのオチでコメント欄を議論させる構成です。",
        tags: ["学校", "鏡", "どんでん返し"],
    },
    {
        id: "tpl-002",
        title: "30秒で泣ける：雨の日の猫",
        author: "EmoCreator",
        genre: "romance",
        viralStrategy: "like",
        likes: 8500,
        views: "120k",
        createdAt: "2024-03-18",
        description: "捨て猫と青年の出会いを描いた心温まるストーリー。BGMとの同期が重要。",
        tags: ["動物", "感動", "雨"],
    },
    {
        id: "tpl-003",
        title: "コンビニあるある：新人バイト編",
        author: "DailyLife_Comedy",
        genre: "comedy",
        viralStrategy: "save",
        likes: 560,
        views: "12k",
        createdAt: "2024-03-20",
        description: "誰もが共感できるコンビニバイトの失敗談。コメント誘発を狙います。",
        tags: ["あるある", "バイト", "共感"],
    },
    {
        id: "tpl-004",
        title: "サイコパス診断：あなたの選択は？",
        author: "MysteryTester",
        genre: "suspense",
        viralStrategy: "save",
        likes: 3200,
        views: "89k",
        createdAt: "2024-03-22",
        description: "視聴者に選択させるインタラクティブな構成。保存して後で見返したくなる内容。",
        tags: ["診断", "心理テスト", "参加型"],
    },
    {
        id: "tpl-005",
        title: "100日後に別れるカップル：初日",
        author: "RomancePro",
        genre: "romance",
        viralStrategy: "retention",
        likes: 15400,
        views: "300k",
        createdAt: "2024-03-10",
        description: "シリーズものの第一弾。続きが気になる引きを重視した構成。",
        tags: ["シリーズ", "カップル", "日常"],
    },
]

export default function TemplatesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterGenre, setFilterGenre] = useState("all")

    const filteredTemplates = mockTemplates.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesGenre = filterGenre === "all" || t.genre === filterGenre
        return matchesSearch && matchesGenre
    })

    const handleUpload = () => {
        alert("アップロード完了: あなたの企画書がコミュニティに公開されました！（デモ）")
    }

    return (
        <div className="container mx-auto min-h-screen px-4 py-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <Link href="/" className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="mr-1 h-3 w-3" /> トップに戻る
                    </Link>
                    <h1 className="text-3xl font-bold">企画書テンプレート</h1>
                    <p className="text-muted-foreground">コミュニティで共有された人気の企画書を探しましょう。</p>
                </div>
                <Button onClick={handleUpload}>
                    <Upload className="mr-2 h-4 w-4" /> 自分の企画を共有
                </Button>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="キーワードで検索..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={filterGenre} onValueChange={setFilterGenre}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="ジャンル" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">すべて</SelectItem>
                        <SelectItem value="romance">恋愛</SelectItem>
                        <SelectItem value="horror">ホラー</SelectItem>
                        <SelectItem value="comedy">コメディ</SelectItem>
                        <SelectItem value="suspense">サスペンス</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTemplates.map((template) => (
                    <Link key={template.id} href={`/templates/${template.id}`}>
                        <Card className="h-full transition-all hover:shadow-lg">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <Badge variant="secondary" className="capitalize">{template.genre}</Badge>
                                    <Badge variant="outline" className="text-xs">{template.viralStrategy}</Badge>
                                </div>
                                <CardTitle className="line-clamp-1 mt-2">{template.title}</CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {template.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {template.tags.map(tag => (
                                        <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span className="max-w-[80px] truncate">{template.author}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1">
                                        <Heart className="h-3 w-3" /> {template.likes}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Eye className="h-3 w-3" /> {template.views}
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
