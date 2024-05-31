import { api } from '@/lib/axios'

interface UpdateSupplierBody {
  id: string
  name: string
  status: string
  address: string
  phone: string
  email: string
  createdAt: string
}

export async function updateSupplier({
  name,
  status,
  address,
  phone,
  email,
  id,
  createdAt,
}: UpdateSupplierBody) {
  await api.put(`/suppliers/${id}`, {
    name,
    status,
    address,
    phone,
    email,
    createdAt,
  })
}
