import type { ArmorItem } from '../types'
import { armors as curatedArmors } from './armor'
import uexArmor from './uexArmor.json'

/** URL substrings that indicate a ship image (wiki often returns ship pics for armor name collisions). Add more as you find them. */
const SHIP_IMAGE_PATTERNS = [
  'Aquila_-_QT_',
  'Venture_US_Pathfinder',
  'Venture_US_Executive',
  'Defiance_Arms_Sunchaser',
  'Suit-RSI-ZeusExplorationSuit',
  'Undersuit-RSI-OdysseyII',
]

function isShipImage(url: string): boolean {
  const lower = url.toLowerCase()
  return SHIP_IMAGE_PATTERNS.some((p) => lower.includes(p.toLowerCase()))
}

const curatedIds = new Set(curatedArmors.map((a) => a.id))
const uex = (uexArmor as ArmorItem[]).map((a) => ({ ...a, standard: true }))
const merged: ArmorItem[] = [
  ...curatedArmors,
  ...uex.filter((a) => !curatedIds.has(a.id)),
]

function hasImage(a: ArmorItem): boolean {
  const img = a.image?.trim()
  if (!img) return false
  if (isShipImage(img)) return false
  return true
}

function hasLocation(a: ArmorItem): boolean {
  const w = a.where?.trim()
  return !!(w && w !== '—')
}

function hasVariants(a: ArmorItem): boolean {
  return !!(a.variants?.length && a.variants.length > 0)
}

export const armors = merged.filter((a) => {
  if (curatedIds.has(a.id)) return true // curated rare armors always shown (may have null image)
  return hasImage(a) && hasLocation(a) && hasVariants(a)
})
