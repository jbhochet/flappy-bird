const bestKey = 'best'

export function getBestScore(): number {
    const value = localStorage.getItem(bestKey)

    if (value) {
        const best = parseInt(value, 10)

        if (!Number.isNaN(best)) {
            return best
        }
    }
    return 0
}

export function setBestScore(value: number): void {
    localStorage.setItem(bestKey, value.toString())
}
