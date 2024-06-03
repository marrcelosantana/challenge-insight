import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getAllSuppliers } from '@/api/get-all-suppliers'
import { getSuppliers } from '@/api/get-suppliers'
import { Header } from '@/components/header'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Supplier } from '@/models/supplier'

import { InfoCard } from './components/info-card'
import { InfoCardSkeleton } from './components/info-card-skeleton'
import { Pagination } from './components/pagination'
import { SuppliersTable } from './components/suppliers-table'
import { TableSkeleton } from './components/table-skeleton'

export function Dashboard() {
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<string>('desc')
  const [query, setQuery] = useState<string>('')
  const limit = 7

  const { data: all, isLoading: isLoadingAll } = useQuery({
    queryKey: ['all-suppliers'],
    queryFn: getAllSuppliers,
    staleTime: Infinity,
  })

  const { data: result, isLoading: isLoadingPage } = useQuery({
    queryKey: ['suppliers-page', page, limit, order, query],
    queryFn: () => getSuppliers({ page, limit, order, query }),
    staleTime: Infinity,
  })

  const suppliers: Supplier[] = result?.suppliers ?? []
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
        <div className="mb-1 flex w-full flex-col items-center justify-between px-8 py-4 lg:flex-row">
          <h1 className="mb-4 text-3xl font-bold tracking-tight lg:mb-0">
            Fornecedores
          </h1>
          <div className="flex flex-col gap-4">
            {isLoadingAll || isLoadingPage ? (
              <div className="flex flex-col items-center justify-center gap-6 lg:flex-row">
                <InfoCardSkeleton />
                <InfoCardSkeleton />
                <InfoCardSkeleton />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-6 lg:flex-row">
                <InfoCard type="total" data={allData.length} />
                <InfoCard type="active" data={actives.length} />
                <InfoCard type="inactive" data={inactives.length} />
              </div>
            )}
            <div className="flex w-full flex-col items-center justify-center gap-2 lg:flex-row lg:justify-end">
              <Input
                className="h-12 w-full lg:w-48"
                placeholder="Buscar pelo nome..."
                onChange={(e) => {
                  setQuery(e.target.value)
                  if (page !== 1) {
                    setPage(1)
                  }
                }}
              />
              <Select
                defaultValue="desc"
                onValueChange={(value) => {
                  setOrder(value)
                  if (page !== 1) {
                    setPage(1)
                  }
                }}
              >
                <SelectTrigger className="h-12 w-full lg:w-[180px]">
                  <SelectValue placeholder="Ordem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Mais Recentes</SelectItem>
                  <SelectItem value="asc">Mais antigos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {isLoadingAll || isLoadingPage ? (
          <TableSkeleton />
        ) : (
          <>
            {suppliers.length > 0 ? (
              <>
                <SuppliersTable data={suppliers} />
                <div className="mt-4 pb-4">
                  <Pagination
                    pageIndex={page - 1}
                    perPage={limit}
                    totalCount={result?.total}
                    onPageChange={(newPageIndex) => setPage(newPageIndex + 1)}
                  />
                </div>
              </>
            ) : (
              <div className="flex h-64 items-center justify-center">
                <span className="text-muted-foreground">
                  Sem fornecedores por aqui.
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
