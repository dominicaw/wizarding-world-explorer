import { SpellType } from './api'

export function formatSpellType(type: string): string {
  return type.replace(/([a-z])([A-Z])/g, '$1 $2')
}

export function getColorFromSpellType(type: SpellType): string {
  const colorMap: Record<string, string> = {
    [SpellType.CONJURATION]: '--p-blue-300',
    [SpellType.TRANSFIGURATION]: '--p-emerald-500',
    [SpellType.CHARM]: '--p-rose-500',
    [SpellType.HEX]: '--p-pink-600',
    [SpellType.JINX]: '--p-red-600',
    [SpellType.CURSE]: '--p-neutral-800',
    [SpellType.BINDING_MAGICAL_CONTRACT]: '--p-purple-800',
    [SpellType.HEALING_SPELL]: '--p-green-700',
    [SpellType.COUNTER_CHARM]: '--p-rose-300',
    [SpellType.DARK_ARTS]: '--p-red-800',
    [SpellType.DARK_CHARM]: '--p-sky-700',
    [SpellType.SPELL]: '--p-blue-500',
    [SpellType.MAGICAL_TRANSPORTATION]: '--p-orange-500',
    [SpellType.COUNTER_SPELL]: '--p-amber-800',
    [SpellType.UNTRANSFIGURATION]: '--p-emerald-800',
    [SpellType.VANISHMENT]: '--p-amber-500',
    [SpellType.NONE]: '--p-neutral-500',
    [SpellType.COUNTER_JINX]: '--p-red-300',
    default: 'gray',
  }

  const cssVariable = colorMap[type] || colorMap.default

  if (cssVariable.startsWith('--')) {
    const resolvedColor = getComputedStyle(document.documentElement)
      .getPropertyValue(cssVariable)
      .trim()
    return resolvedColor || 'gray'
  }

  return cssVariable
}
