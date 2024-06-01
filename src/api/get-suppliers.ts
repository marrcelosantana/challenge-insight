import { api } from '@/lib/axios'

type GetSuppliersParams = {
  page?: number
  perPage?: number
}

export async function getSuppliers({ page, perPage }: GetSuppliersParams) {
  const response = await api.get(
    `/suppliers?_page=${page}&_per_page=${perPage}`,
  )
  return response.data
}
