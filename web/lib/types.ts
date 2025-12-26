export interface Character {
    name: string
    description: string
}

export interface Scene {
    id: number
    duration: number // seconds
    location: string
    description: string // visual description / direction
    dialogue: Array<{
        speaker: string
        text: string
    }>
    imagePrompt: string
    imageUrl?: string // placeholder for generated image
}

export interface Proposal {
    id: string
    title: string
    genre: string
    targetAudience: string
    concept: string
    viralStrategy: string
    characters: Character[]
    script: Scene[]
    createdAt: string
}
