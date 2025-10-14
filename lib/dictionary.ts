import 'server-only'
import type { Language } from '@/config/site'
import type { Dictionary } from './types'

const dictionaries: Record<Language, () => Promise<Dictionary>> = {
  vi: () => import('@/dictionaries/vi.json').then((module) => module.default as Dictionary),
  ja: () => import('@/dictionaries/ja.json').then((module) => module.default as Dictionary),
  en: () => import('@/dictionaries/en.json').then((module) => module.default as Dictionary),
}

export const getDictionary = async (locale: Language): Promise<Dictionary> => {
  return dictionaries[locale]()
}
