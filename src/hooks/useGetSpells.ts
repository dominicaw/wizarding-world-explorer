import { getSpells, SpellType } from '@/utils/api'
import { useQuery } from '@tanstack/vue-query'
import { type Ref } from 'vue'

export default function useGetSpells(type?: Ref<SpellType | undefined>) {
  return useQuery({
    queryKey: ['spells', type],
    queryFn: () => getSpells(type?.value),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}
