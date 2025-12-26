import { Proposal, Scene } from "./types"

// Mock data generator
export async function generateProposal(data: any): Promise<Proposal> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const isHorror = data.genre === "horror"

    const mockScenes: Scene[] = [
        {
            id: 1,
            duration: 5,
            location: isHorror ? "暗い廊下" : "陽の当たるカフェ",
            description: isHorror
                ? "【0-5秒】フック。カメラが急速に前進。不気味な音が響く。"
                : "【0-5秒】フック。カフェの広角ショット。主人公が意味深な表情でカメラを見る。",
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
            duration: 15,
            location: isHorror ? "教室（夜）" : "公園のベンチ",
            description: "【5-20秒】導入。主人公がスマホを見て、状況を説明する。",
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
            duration: 25,
            location: isHorror ? "図書室の裏" : "街中の交差点",
            description: "【20-45秒】展開。予期せぬ出来事が起き、緊張感が高まる。",
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
            duration: 25,
            location: isHorror ? "逃げ込んだトイレ" : "夕暮れの駅のホーム",
            description: "【45-70秒】クライマックス。最大の事件や対立が発生する。",
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
            duration: 20,
            location: isHorror ? "ブラックアウト" : "夜景の見える丘",
            description: "【70-90秒】結末。オチ、または次へのクリフハンガー。",
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
