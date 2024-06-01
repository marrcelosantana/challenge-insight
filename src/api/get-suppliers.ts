import { api } from '@/lib/axios'

type GetSuppliersParams = {
  page?: number
  perPage?: number
  status?: string
}

export async function getSuppliers({
  page,
  perPage,
  status,
}: GetSuppliersParams) {
  const response = await api.get(
    `/suppliers?_page=${page}&_per_page=${perPage}&status=${status}`,
  )
  return response.data
}
