"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Trash2, Calendar } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getHistory, saveProposal } from "@/lib/storage"
import { Proposal } from "@/lib/types"

export default function HistoryPage() {
    const [history, setHistory] = useState<Proposal[]>([])

    useEffect(() => {
        setHistory(getHistory())
    }, [])

    const handleDelete = (id: string) => {
        // In a real app we would have a delete function in storage
        const newHistory = history.filter(p => p.id !== id)
        setHistory(newHistory)
        localStorage.setItem("vertical_drama_history", JSON.stringify(newHistory))
    }

    return (
        <div className="container mx-auto min-h-screen px-4 py-8">
            <div className="mb-8">
                <Link href="/" className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-1 h-3 w-3" /> ホームに戻る
                </Link>
                <h1 className="text-3xl font-bold">保存された企画</h1>
                <p className="text-muted-foreground">過去に作成したドラマ企画の一覧です。</p>
            </div>

            {history.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed text-center">
                    <p className="text-muted-foreground mb-4">保存された企画はありません。</p>
                    <Link href="/create">
                        <Button>最初の企画を作成する</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {history.map((item) => (
                        <Card key={item.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                                    <Badge variant="secondary" className="capitalize">{item.genre}</Badge>
                                </div>
                                <CardDescription className="line-clamp-2">
                                    {item.concept}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="mr-2 h-3 w-3" />
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Link href={`/proposal/${item.id}?genre=${item.genre}&title=${encodeURIComponent(item.title)}`}>
                                    <Button variant="outline" size="sm">企画を見る</Button>
                                </Link>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
