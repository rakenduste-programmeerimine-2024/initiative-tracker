export function calculateModifier(abilityScore: number): number {
  return Math.floor((abilityScore - 10) / 2)
}

export function calculateInitiative(roll: number, dexModifier: number): number {
  return Math.max(1, roll + dexModifier)
}

export function calculateActiveArmorClass(
  baseAC: number,
  dexModifier: number,
  dexAppliesToAC: boolean,
): number {
  const modifiedAC = baseAC + (dexAppliesToAC ? dexModifier : 0)

  return Math.max(1, modifiedAC)
}
