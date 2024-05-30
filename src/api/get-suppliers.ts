import { api } from '@/lib/axios'

export async function getSuppliers() {
  const response = await api.get('/suppliers')
  return response.data
}
