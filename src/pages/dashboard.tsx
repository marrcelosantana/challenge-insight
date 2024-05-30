import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import { getSuppliers } from '@/api/get-suppliers'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { AddSupplierModal } from './components/add-supplier-modal'
import { SuppliersTable } from './components/suppliers-table'

export default function Dashboard() {
  const { data: suppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
    staleTime: Infinity,
  })

  return (
    <div className="h-screen w-full">
      <Header />
      <div className="w-full flex-1">
        <div className="flex w-full items-center justify-between px-8 py-4">
          <h1 className="text-3xl font-bold tracking-tight">Fornecedores</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
              >
                <span>Adicionar</span>
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <AddSupplierModal />
          </Dialog>
        </div>
        <SuppliersTable data={suppliers} />
      </div>
    </div>
  )
}
