import { useQuery } from '@tanstack/vue-query'
import { getSpellById, type Spell } from '@/utils/api'

export default function useGetSpellById(id: string) {
  return useQuery<Spell>({
    queryKey: ['spell', id],
    queryFn: () => getSpellById(id),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!id,
  })
}
