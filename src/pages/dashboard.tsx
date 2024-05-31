import { useQuery } from '@tanstack/react-query'

import { getSuppliers } from '@/api/get-suppliers'
import { Header } from '@/components/header'
import { Supplier } from '@/models/supplier'

import { InfoCard } from './components/info-card'
import { Pagination } from './components/pagination'
import { SuppliersTable } from './components/suppliers-table'

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
    staleTime: Infinity,
  })

  const suppliers: Supplier[] = data ?? []

  const inactives = suppliers.filter(
    (supplier: Supplier) => supplier.status === 'Inativo',
  )
  const actives = suppliers.filter(
    (supplier: Supplier) => supplier.status === 'Ativo',
  )

  return (
    <div className="h-screen w-full">
      <Header />
      <div className="w-full flex-1">
        <div className="flex w-full items-center justify-between px-8 py-4">
          <h1 className="text-3xl font-bold tracking-tight">Fornecedores</h1>
          <div className="flex items-center justify-center gap-6">
            <InfoCard type="total" data={suppliers.length} />
            <InfoCard type="active" data={actives.length} />
            <InfoCard type="inactive" data={inactives.length} />
          </div>
        </div>
        {suppliers.length > 0 ? (
          <>
            <SuppliersTable data={suppliers} />
            <div className="mt-4 pb-4">
              <Pagination
                pageIndex={0}
                perPage={10}
                totalCount={suppliers?.length}
                onPageChange={() => {
                  console.log('ola')
                }}
              />
            </div>
          </>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <span className="text-muted-foreground">
              Nenhum fornecedor encontrado.
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
