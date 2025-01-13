import { DEFAULT_STAT_BLOCK } from "@/lib/constants/default-values"
import { HIT_POINTS_FORMULA_REGEX } from "@/utils/entities/validation-patterns"
import { Entity, EntityUtils } from "./entity"

export type StatBlock = Entity & {
  name: string | null
  dexterity_score: number
  hit_points_average: number | null
  hit_points_formula: string | null
  base_armor_class: number
  dex_applies_to_ac: boolean | true
  speed: number
}

export const StatBlockUtils = {
  validate(data: Partial<StatBlock>): void {
    EntityUtils.validate(data)

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
      !HIT_POINTS_FORMULA_REGEX.test(data.hit_points_formula)
    ) {
      throw new Error(
        `Invalid hit points formula (${data.hit_points_formula}). Must follow 'XdY+Z' format (e.g., '2d6+3') or be null.`,
      )
    }

    if (
      data.base_armor_class !== undefined &&
      (data.base_armor_class < 0 || data.base_armor_class > 30)
    ) {
      throw new Error(
        `Invalid armor class (${data.base_armor_class}). Must be between 0 and 30.`,
      )
    }

    if (data.speed !== undefined && (data.speed < 0 || data.speed > 120)) {
      throw new Error(
        `Invalid speed (${data.speed}). Must be between 0 and 120.`,
      )
    }
  },

  create(data: Partial<StatBlock>): StatBlock {
    this.validate(data)

    const baseEntity = EntityUtils.create(data)

    return {
      ...DEFAULT_STAT_BLOCK,
      ...baseEntity,
      ...data,
    }
  },
}
