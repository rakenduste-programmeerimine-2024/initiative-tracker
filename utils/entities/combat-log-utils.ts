export function calculateHealthPercentage(
  hitPointsCurrent: number | null,
  hitPointsMax: number | null,
): number | null {
  if (hitPointsCurrent === null || hitPointsMax === null) {
    return null
  }
  return Math.max(0, Math.min(100, (hitPointsCurrent / hitPointsMax) * 100))
}

export function calculateHealthColor(
  hitPointsCurrent: number | null,
  hitPointsMax: number | null,
): string {
  const percentage = calculateHealthPercentage(hitPointsCurrent, hitPointsMax)

  if (percentage === null) return "gray" // Unknown
  if (percentage > 80) return "green" // Healthy
  if (percentage > 40) return "yellow" // Injured
  return "red" // Critical
}
