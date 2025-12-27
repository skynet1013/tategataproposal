"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, History, Clapperboard, Layers } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              AI搭載 縦型ドラマ企画プランナー
            </div>
            <h1 className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-primary">縦型ショートドラマ</span>の企画を<br />数秒で作成
            </h1>
            <p className="mb-8 max-w-2xl text-xl text-muted-foreground">
              TikTokやReelsに最適化された脚本、絵コンテ、コンセプトを生成。<br />
              AIによる分析で、視聴維持率とエンゲージメントを最大化します。
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/create">
                <Button size="lg" className="h-12 px-8 text-lg shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-xl">
                  企画を作成する <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                  <Layers className="mr-2 h-5 w-5" /> 企画書テンプレート
                </Button>
              </Link>
              <Link href="/history">
                <Button variant="ghost" size="lg" className="h-12 px-8 text-lg">
                  履歴を見る
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[120px] bg-gradient-to-tr from-primary to-purple-500 rounded-full" />
      </section>

      {/* Features / Quick Access */}
      <section className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-primary/10 bg-card/50 backdrop-blur transition-colors hover:border-primary/30">
              <CardHeader>
                <Clapperboard className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>シーン生成</CardTitle>
                <CardDescription>
                  セリフ、ト書き、カメラワークを含む詳細な脚本を生成します。
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-primary/10 bg-card/50 backdrop-blur transition-colors hover:border-primary/30">
              <CardHeader>
                <Sparkles className="mb-2 h-10 w-10 text-purple-500" />
                <CardTitle>バズる要素の最適化</CardTitle>
                <CardDescription>
                  「視聴維持率」「保存数」などの目標に合わせて、構成を最適化します。
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="h-full border-primary/10 bg-card/50 backdrop-blur transition-colors hover:border-primary/30">
              <CardHeader>
                <History className="mb-2 h-10 w-10 text-blue-500" />
                <CardTitle>履歴・管理</CardTitle>
                <CardDescription>
                  過去のプロジェクトにアクセスし、編集やPDFエクスポートが可能です。
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
