import { CreatePlanForm } from "@/components/planner/create-form"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '新規企画作成 | Vertical Drama AI',
    description: '新しい縦型ショートドラマの企画書を作成します',
}

export default function CreatePage() {
    return (
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">ドラマ企画を作成</h1>
                <p className="text-muted-foreground">
                    以下の項目を入力して、バズる縦型ショートドラマの脚本を生成しましょう。
                </p>
            </div>
            <CreatePlanForm />
        </div>
    )
}
