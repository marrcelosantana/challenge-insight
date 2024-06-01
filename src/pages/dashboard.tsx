import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getAllSuppliers } from '@/api/get-all-supliers'
import { getSuppliers } from '@/api/get-suppliers'
import { Header } from '@/components/header'
import { Supplier } from '@/models/supplier'

import { InfoCard } from './components/info-card'
import { Pagination } from './components/pagination'
import { SuppliersTable } from './components/suppliers-table'

export default function Dashboard() {
  const [page, setPage] = useState<number>(1)
  const perPage = 5

  const { data: all } = useQuery({
    queryKey: ['all-suppliers'],
    queryFn: getAllSuppliers,
    staleTime: Infinity,
  })

  const { data: result } = useQuery({
    queryKey: ['suppliers-page', page],
    queryFn: () => getSuppliers({ page, perPage }),
    staleTime: Infinity,
  })

  const suppliers: Supplier[] = result?.data ?? []
  const allData: Supplier[] = all ?? []

  const inactives = allData.filter(
    (supplier: Supplier) => supplier.status === 'Inativo',
  )
  const actives = allData.filter(
    (supplier: Supplier) => supplier.status === 'Ativo',
  )

  return (
    <div className="h-screen w-full">
      <Header />
      <div className="w-full flex-1">
        <div className="flex w-full items-center justify-between px-8 py-4">
          <h1 className="text-3xl font-bold tracking-tight">Fornecedores</h1>
          <div className="flex items-center justify-center gap-6">
            <InfoCard type="total" data={result?.items} />
            <InfoCard type="active" data={actives.length} />
            <InfoCard type="inactive" data={inactives.length} />
          </div>
        </div>
        {suppliers.length > 0 ? (
          <>
            <SuppliersTable data={suppliers} />
            <div className="mt-4 pb-4">
              <Pagination
                pageIndex={page - 1}
                perPage={perPage}
                totalCount={result.items}
                onPageChange={(newPageIndex) => setPage(newPageIndex + 1)}
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
