import { api } from '@/lib/axios'

interface RegisterSupplierBody {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: string
  createdAt: string
}

export async function registerSupplier({
  id,
  name,
  email,
  phone,
  address,
  status,
  createdAt,
}: RegisterSupplierBody) {
  await api.post('/suppliers', {
    id,
    name,
    email,
    phone,
    address,
    status,
    createdAt,
  })
}
