import { Proposal, Scene } from "./types"

// Mock data generator
export async function generateProposal(data: any): Promise<Proposal> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const isHorror = data.genre === "horror"

    const mockScenes: Scene[] = [
        {
            id: 1,
            duration: 3,
            location: isHorror ? "暗い廊下" : "陽の当たるカフェ",
            description: isHorror
                ? "カメラが急速に前進。影が動く。"
                : "カフェの広角ショット。主人公がコーヒーを飲んでいる。",
            dialogue: [],
            imagePrompt: isHorror
                ? "Dark cinematic shot of a hallway, scary shadow, 4k"
                : "Bright aesthetic cafe scene, latte art, 4k",
            imageUrl: isHorror
                ? "https://placehold.co/600x1066/1a1a1a/FFF?text=Horror+Scene+1"
                : "https://placehold.co/600x1066/fae8d2/333?text=Cafe+Scene+1"
        },
        {
            id: 2,
            duration: 10,
            location: isHorror ? "教室（夜）" : "公園のベンチ",
            description: "主人公がスマホを見て、恐怖（または喜び）の表情を浮かべる。",
            dialogue: [
                { speaker: "主人公", text: isHorror ? "嘘...そんなはずない..." : "本当に返信が来た！" },
                { speaker: "友人", text: isHorror ? "後ろを見ちゃだめ。" : "言った通りでしょ！" }
            ],
            imagePrompt: "Close up of face, emotional expression",
            imageUrl: isHorror
                ? "https://placehold.co/600x1066/220000/FFF?text=Scared+Face"
                : "https://placehold.co/600x1066/e8f4fa/333?text=Happy+Face"
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
