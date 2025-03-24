import { getSpells } from '@/utils/api'
import { useQuery } from '@tanstack/vue-query'

export default function useGetSpells() {
  return useQuery({
    queryKey: ['spells'],
    queryFn: getSpells,
    staleTime: 1000 * 60 * 5,
    retry: 3,
  })
}
