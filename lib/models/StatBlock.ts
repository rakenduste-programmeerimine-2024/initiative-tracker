import { createEntity, Entity } from "./Entity"

export type StatBlock = Entity & {
  name: string | null
  dexterity_score: number
  hit_points_average: number | null
  hit_points_formula: string | null
  armor_class: number
  speed: number
}

const DEFAULT_STAT_BLOCK: Omit<StatBlock, keyof Entity> = {
  name: "Unnamed Creature",
  dexterity_score: 10,
  hit_points_average: null,
  hit_points_formula: null,
  armor_class: 10,
  speed: 30,
}

function validateStatBlock(data: Partial<StatBlock>) {
  if (
    data.dexterity_score !== undefined &&
    (data.dexterity_score < 1 || data.dexterity_score > 30)
  ) {
    throw new Error(
      `Invalid dexterity_score (${data.dexterity_score}). Must be between 1 and 30.`,
    )
  }

  if (
    data.hit_points_average !== undefined &&
    data.hit_points_average !== null &&
    data.hit_points_average < 0
  ) {
    throw new Error(
      `Invalid hit points average (${data.hit_points_average}). Must be null or a non-negative number.`,
    )
  }

  if (
    data.hit_points_formula !== undefined &&
    data.hit_points_formula !== null &&
    !/^\d+d\d+([+-]\d+)?$/.test(data.hit_points_formula)
  ) {
    throw new Error(
      `Invalid hit points formula (${data.hit_points_formula}). Must follow 'XdY+Z' format (e.g., '2d6+3') or be null.`,
    )
  }

  if (
    data.armor_class !== undefined &&
    (data.armor_class < 0 || data.armor_class > 30)
  ) {
    throw new Error(
      `Invalid armor class (${data.armor_class}). Must be between 0 and 30.`,
    )
  }

  if (data.speed !== undefined && (data.speed < 0 || data.speed > 120)) {
    throw new Error(`Invalid speed (${data.speed}). Must be between 0 and 120.`)
  }
}

export function createStatBlock(data: Partial<StatBlock>): StatBlock {
  validateStatBlock(data)
  const baseEntity = createEntity(data)

  return {
    ...DEFAULT_STAT_BLOCK,
    ...baseEntity,
    ...data,
  }
}
