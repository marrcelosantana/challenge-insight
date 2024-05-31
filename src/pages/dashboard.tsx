import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import { getSuppliers } from '@/api/get-suppliers'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Supplier } from '@/models/supplier'

import { AddSupplierModal } from './components/add-supplier-modal'
import { InfoCard } from './components/info-card'
import { SuppliersTable } from './components/suppliers-table'

export default function Dashboard() {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false)

  const { data: suppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
    staleTime: Infinity,
  })

  const inactives = suppliers?.filter(
    (supplier: Supplier) => supplier.status === 'Inativo',
  )
  const actives = suppliers?.filter(
    (supplier: Supplier) => supplier.status === 'Ativo',
  )

  return (
    <div className="h-screen w-full">
      <Header />
      <div className="w-full flex-1">
        <div className="flex w-full items-center justify-between px-8 py-4">
          <h1 className="text-3xl font-bold tracking-tight">Fornecedores</h1>
          <div className="flex w-full items-center justify-center gap-6">
            <InfoCard type="total" data={suppliers?.length} />
            <InfoCard type="active" data={actives?.length} />
            <InfoCard type="inactive" data={inactives?.length} />
          </div>
          <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="flex items-center justify-center gap-2"
              >
                <span>Adicionar</span>
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <AddSupplierModal setModalOpen={setAddModalOpen} />
          </Dialog>
        </div>
        <SuppliersTable data={suppliers} />
      </div>
    </div>
  )
}
