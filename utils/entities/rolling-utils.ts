export function rollInitiative(
  dexModifier: number,
  diceSides: number = 20,
): { rawRoll: number; finalInitiative: number } {
  const rawRoll = Math.floor(Math.random() * diceSides) + 1
  const finalInitiative = Math.max(1, rawRoll + dexModifier)
  return { rawRoll, finalInitiative }
}

export function rollHitPoints(formula: string): number {
  const diceRegex = /(\d+)d(\d+)/g // Matches each "XdY" part
  const modifierRegex = /([+-]\d+)$/ // Matches "+N" or "-N" at the end

  let total = 0

  // Match all "XdY" dice rolls
  const diceMatches = Array.from(formula.matchAll(diceRegex))
  for (const match of diceMatches) {
    const diceCount = parseInt(match[1], 10)
    const diceSides = parseInt(match[2], 10)

    // Roll each die
    const diceTotal = Array.from(
      { length: diceCount },
      () => Math.floor(Math.random() * diceSides) + 1,
    ).reduce((sum, roll) => sum + roll, 0)

    total += diceTotal
  }

  // Apply the flat modifier (if present)
  const modifierMatch = formula.match(modifierRegex)
  if (modifierMatch) {
    total += parseInt(modifierMatch[1], 10)
  }

  return total
}
