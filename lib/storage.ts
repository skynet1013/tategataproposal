import { Proposal } from "./types"

const STORAGE_KEY = "vertical_drama_history"

export function saveProposal(proposal: Proposal) {
    if (typeof window === "undefined") return

    const history = getHistory()
    // Check if exists
    const index = history.findIndex(p => p.id === proposal.id)
    if (index >= 0) {
        history[index] = proposal
    } else {
        history.unshift(proposal)
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

export function getHistory(): Proposal[] {
    if (typeof window === "undefined") return []

    const data = localStorage.getItem(STORAGE_KEY)
    try {
        return data ? JSON.parse(data) : []
    } catch (e) {
        console.error("Failed to parse history", e)
        return []
    }
}

export function getProposalById(id: string): Proposal | undefined {
    const history = getHistory()
    return history.find(p => p.id === id)
}
