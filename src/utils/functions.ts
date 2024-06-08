import { queryClient } from '@/lib/react-query'
import { Supplier } from '@/models/supplier'

export function emailAlreadyExists(email: string) {
  const suppliers = queryClient.getQueryData<Supplier[]>(['all-suppliers'])
  return suppliers?.some((supplier: Supplier) => supplier.email === email)
}

export function loadSuppliers() {
  queryClient.invalidateQueries({ queryKey: ['suppliers-page'] })
  queryClient.invalidateQueries({ queryKey: ['all-suppliers'] })
}
