import axios from 'axios'

export interface Spell {
  id: string
  name: string
  incantation: string
  effect: string
  canBeVerbal: boolean
  type: SpellType
  light: SpellLight
  creator: null
}

export enum SpellLight {
  NONE = 'None',
  BLUE = 'Blue',
  ICY_BLUE = 'IcyBlue',
  RED = 'Red',
  GOLD = 'Gold',
  PURPLE = 'Purple',
  TRANSPARENT = 'Transparent',
  WHITE = 'White',
  GREEN = 'Green',
  ORANGE = 'Orange',
  YELLOW = 'Yellow',
  BRIGHT_BLUE = 'BrightBlue',
  PINK = 'Pink',
  VIOLET = 'Violet',
  BLUEISH_WHITE = 'BlueishWhite',
  SILVER = 'Silver',
  SCARLET = 'Scarlet',
  FIRE = 'Fire',
  FIERY_SCARLET = 'FieryScarlet',
  GREY = 'Grey',
  DARK_RED = 'DarkRed',
  TURQUOISE = 'Turquoise',
  PSYCHEDELIC_TRANSPARENT_WAVE = 'PsychedelicTransparentWave',
  BRIGHT_YELLOW = 'BrightYellow',
  BLACK_SMOKE = 'BlackSmoke',
}

export enum SpellType {
  NONE = 'None',
  CHARM = 'Charm',
  CONJURATION = 'Conjuration',
  SPELL = 'Spell',
  TRANSFIGURATION = 'Transfiguration',
  HEALING_SPELL = 'HealingSpell',
  DARK_CHARM = 'DarkCharm',
  JINX = 'Jinx',
  CURSE = 'Curse',
  MAGICAL_TRANSPORTATION = 'MagicalTransportation',
  HEX = 'Hex',
  COUNTER_SPELL = 'CounterSpell',
  DARK_ARTS = 'DarkArts',
  COUNTER_JINX = 'CounterJinx',
  COUNTER_CHARM = 'CounterCharm',
  UNTRANSFIGURATION = 'Untransfiguration',
  BINDING_MAGICAL_CONTRACT = 'BindingMagicalContract',
  VANISHMENT = 'Vanishment',
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getSpells(type?: SpellType): Promise<Spell[]> {
  const response = await apiClient.get('/Spells', {
    params: type ? { Type: type } : {},
  })
  return response.data
}

export async function getSpellById(id: string): Promise<Spell> {
  const response = await apiClient.get(`/Spells/${id}`)
  return response.data
}
