import { api } from '@/lib/axios'

export async function getAllSuppliers() {
  const response = await api.get(`/suppliers`)
  return response.data
}
