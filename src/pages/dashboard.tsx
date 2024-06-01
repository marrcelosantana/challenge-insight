import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getAllSuppliers } from '@/api/get-all-supliers'
import { getSuppliers } from '@/api/get-suppliers'
import { Header } from '@/components/header'
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

export default function Dashboard() {
  const [page, setPage] = useState<number>(1)
  const [status, setStatus] = useState<string>('')
  const perPage = 7

  const { data: all, isLoading: isLoadingAll } = useQuery({
    queryKey: ['all-suppliers'],
    queryFn: getAllSuppliers,
    staleTime: Infinity,
  })

  const { data: result, isLoading: isLoadingPage } = useQuery({
    queryKey: ['suppliers-page', page, perPage, status],
    queryFn: () => getSuppliers({ page, perPage, status }),
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
                <InfoCard type="total" data={result?.items ?? 0} />
                <InfoCard type="active" data={actives.length} />
                <InfoCard type="inactive" data={inactives.length} />
              </div>
            )}
            <div className="flex w-full items-center justify-center lg:justify-end">
              <Select
                defaultValue="all"
                onValueChange={(value) => {
                  setStatus(value)
                  if (value === 'all') {
                    setStatus('')
                  }
                }}
              >
                <SelectTrigger className="h-12 w-[180px]">
                  <SelectValue placeholder="Filtre por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Ativo">Ativos</SelectItem>
                  <SelectItem value="Inativo">Inativos</SelectItem>
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
                    perPage={perPage}
                    totalCount={allData.length}
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
