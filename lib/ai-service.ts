import { Proposal, Scene } from "./types"

// Mock data generator
export async function generateProposal(data: any): Promise<Proposal> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const isHorror = data.genre === "horror"
    // Parse duration, default to 60 if not provided or invalid
    const totalDuration = parseInt(data.duration) || 60

    // Distribute duration roughly: 
    // Scene 1 (Hook): ~5-10% (min 3s)
    // Scene 2 (Intro): ~15-20%
    // Scene 3 (Rising): ~25-30%
    // Scene 4 (Climax): ~25-30%
    // Scene 5 (Ending): ~15-20% (min 5s)

    const d1 = Math.max(3, Math.floor(totalDuration * 0.05))
    const d5 = Math.max(5, Math.floor(totalDuration * 0.2))
    const d2 = Math.floor(totalDuration * 0.15)
    const d3 = Math.floor(totalDuration * 0.3)
    // Remaining goes to Climax
    const d4 = totalDuration - (d1 + d2 + d3 + d5)

    const mockScenes: Scene[] = [
        {
            id: 1,
            duration: d1,
            location: isHorror ? "暗い廊下" : "陽の当たるカフェ",
            description: isHorror
                ? `【0-${d1}秒】フック。カメラが急速に前進。不気味な音が響く。`
                : `【0-${d1}秒】フック。カフェの広角ショット。主人公が意味深な表情でカメラを見る。`,
            dialogue: [
                { speaker: "NA", text: isHorror ? "（心臓の鼓動音）" : "ねえ、知ってる？" }
            ],
            imagePrompt: isHorror
                ? "Dark cinematic shot of a hallway, scary shadow, 4k"
                : "Bright aesthetic cafe scene, latte art, 4k",
            imageUrl: isHorror
                ? "/mock/horror_1.png"
                : "/mock/romance_1.png"
        },
        {
            id: 2,
            duration: d2,
            location: isHorror ? "教室（夜）" : "公園のベンチ",
            description: `【${d1}-${d1 + d2}秒】導入。主人公がスマホを見て、状況を説明する。`,
            dialogue: [
                { speaker: "主人公", text: isHorror ? "嘘...そんなはずない...通知が止まらない。" : "彼から連絡が来たの。でも..." },
                { speaker: "友人", text: isHorror ? "後ろを見ちゃだめ。" : "えっ、まさか！" }
            ],
            imagePrompt: "Close up of face, emotional expression",
            imageUrl: isHorror
                ? "/mock/horror_2.png"
                : "/mock/romance_1.png"
        },
        {
            id: 3,
            duration: d3,
            location: isHorror ? "図書室の裏" : "街中の交差点",
            description: `【${d1 + d2}-${d1 + d2 + d3}秒】展開。予期せぬ出来事が起き、緊張感が高まる。`,
            dialogue: [
                { speaker: "主人公", text: isHorror ? "誰かいるの？...足音が近づいてくる。" : "そこで見かけたのが、彼だったの。" },
                { speaker: "謎の声", text: isHorror ? "見ィつけた..." : "（雑踏の音）" }
            ],
            imagePrompt: "Mid shot, tension rising, mysterious atmosphere",
            imageUrl: isHorror
                ? "/mock/horror_3.png"
                : "/mock/romance_1.png"
        },
        {
            id: 4,
            duration: d4,
            location: isHorror ? "逃げ込んだトイレ" : "夕暮れの駅のホーム",
            description: `【${d1 + d2 + d3}-${d1 + d2 + d3 + d4}秒】クライマックス。最大の事件や対立が発生する。`,
            dialogue: [
                { speaker: "主人公", text: isHorror ? "開かない！鍵が開かない！！" : "もう二度と会えないと思ってた。" },
                { speaker: "友人", text: isHorror ? "（電話越しに）そこには誰もいないはずよ！" : "ずっと探していたんだ。" }
            ],
            imagePrompt: "High angle, dramatic lighting, intense emotion",
            imageUrl: isHorror
                ? "/mock/horror_4.png"
                : "/mock/romance_1.png"
        },
        {
            id: 5,
            duration: d5,
            location: isHorror ? "ブラックアウト" : "夜景の見える丘",
            description: `【${d1 + d2 + d3 + d4}-${totalDuration}秒】結末。オチ、または次へのクリフハンガー。`,
            dialogue: [
                { speaker: "NA", text: isHorror ? "（悲鳴とともに暗転）" : "これが、私たちの始まり。" }
            ],
            imagePrompt: "Fade out, text overlay, final impression",
            imageUrl: isHorror
                ? "/mock/horror_5.png"
                : "/mock/romance_1.png"
        }
    ]

    return {
        id: "mock-id",
        title: data.title || "無題のバイラル動画",
        genre: data.genre,
        targetAudience: data.targetAudience,
        concept: "入力内容に基づいて生成された縦型ドラマのコンセプト。",
        viralStrategy: data.viralGoal,
        characters: data.characters,
        script: mockScenes,
        createdAt: new Date().toISOString(),
    }
}
