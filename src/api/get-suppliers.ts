import { api } from '@/lib/axios'

type GetSuppliersParams = {
  page?: number
  limit?: number
  query?: string
  order?: string
}

export async function getSuppliers({
  page,
  limit,
  order,
  query,
}: GetSuppliersParams) {
  const response = await api.get(
    `/suppliers?_page=${page}&_limit=${limit}&_sort=createdAt&_order=${order}&name_like=${query}`,
  )
  return {
    suppliers: response.data,
    total: response.headers['x-total-count'],
  }
}
