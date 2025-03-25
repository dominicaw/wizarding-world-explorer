export function convertPxToRem(px: number): string {
  return `${px / 16}rem`
}

export function formatSpellType(type: string): string {
  return type.replace(/([a-z])([A-Z])/g, '$1 $2')
}
