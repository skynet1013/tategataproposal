"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Plus, Trash2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

// Schema
const planSchema = z.object({
    title: z.string().optional(),
    genre: z.enum(["romance", "suspense", "horror", "comedy"]),
    targetAudience: z.string().min(1, "Target audience is required"),
    duration: z.string().min(1, "Duration is required"),
    characters: z.array(
        z.object({
            name: z.string().min(1, "Name required"),
            description: z.string().min(1, "Description required"),
        })
    ).min(1, "At least one character is required"),
    viralGoal: z.enum(["retention", "save", "like"]),
    additionalInfo: z.string().optional(),
})

type PlanFormValues = z.infer<typeof planSchema>

export function CreatePlanForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<PlanFormValues>({
        resolver: zodResolver(planSchema),
        defaultValues: {
            title: "",
            targetAudience: "",
            duration: "60",
            characters: [{ name: "", description: "" }],
            additionalInfo: "",
        },
    })

    const { fields, append, remove } = useFieldArray({
        name: "characters",
        control: form.control,
    })

    async function onSubmit(data: PlanFormValues) {
        setIsLoading(true)
        // TODO: Call API
        console.log("Submitting:", data)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            // Redirect to proposal page (mock ID)
            const params = new URLSearchParams()
            params.set("genre", data.genre)
            if (data.title) params.set("title", data.title)
            params.set("duration", data.duration)

            router.push(`/proposal/mock-id?${params.toString()}`)
        }, 2000)
    }

    return (
        <Card className="w-full max-w-2xl border-primary/20 bg-card/60 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>新規企画作成</CardTitle>
                <CardDescription>
                    ドラマの核となる要素を入力してください。残りはAIが生成します。
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>タイトル案（任意）</FormLabel>
                                    <FormControl>
                                        <Input placeholder="例：101号室の秘密" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ジャンル</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="ジャンルを選択" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="romance">恋愛</SelectItem>
                                                <SelectItem value="suspense">サスペンス</SelectItem>
                                                <SelectItem value="horror">ホラー</SelectItem>
                                                <SelectItem value="comedy">コメディ</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>動画の長さ</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="長さを選択" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="30">30秒</SelectItem>
                                                <SelectItem value="60">60秒</SelectItem>
                                                <SelectItem value="90">90秒</SelectItem>
                                                <SelectItem value="120">120秒</SelectItem>
                                                <SelectItem value="180">180秒</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="targetAudience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ターゲット視聴者層</FormLabel>
                                    <FormControl>
                                        <Input placeholder="例：Z世代、社会人" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <FormLabel>登場人物</FormLabel>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => append({ name: "", description: "" })}
                                >
                                    <Plus className="mr-2 h-4 w-4" /> 人物を追加
                                </Button>
                            </div>
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-start gap-2">
                                    <div className="grid flex-1 gap-2 sm:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name={`characters.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="名前" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`characters.${index}.description`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="役割 / 関係性" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {fields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive"
                                            onClick={() => remove(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <FormMessage>
                                {form.formState.errors.characters?.root?.message}
                            </FormMessage>
                        </div>

                        <FormField
                            control={form.control}
                            name="viralGoal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>バズ戦略</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="戦略を選択" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="retention">
                                                <span className="font-medium block">視聴維持率重視</span>
                                                <span className="text-xs text-muted-foreground">フックとテンポを重視 (30秒+)</span>
                                            </SelectItem>
                                            <SelectItem value="save">
                                                <span className="font-medium block">保存数重視</span>
                                                <span className="text-xs text-muted-foreground">役立つ情報・結末の伏線回収</span>
                                            </SelectItem>
                                            <SelectItem value="like">
                                                <span className="font-medium block">いいね数重視</span>
                                                <span className="text-xs text-muted-foreground">共感性・エモさを重視</span>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="additionalInfo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>キーワード・あらすじ案</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="例：復讐劇、高校が舞台、意外な結末"
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    企画生成中...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    企画書を作成
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
