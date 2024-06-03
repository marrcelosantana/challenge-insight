import { Plus, Rocket } from 'lucide-react'
import { useState } from 'react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { AddSupplierModal } from '@/pages/components/add-supplier-modal'

import { ThemeToggle } from './theme/theme-toggle'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export function Header() {
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false)

  return (
    <header className="flex w-full items-center justify-between border-b-[1px] px-8 py-5">
      <div className="flex items-center justify-center gap-4">
        <Rocket className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />
        <span className="text-xl">Início</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex h-12 items-center justify-center gap-2"
            >
              <span className="hidden sm:inline">Novo Fornecedor</span>
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <AddSupplierModal
            isModalOpen={addModalOpen}
            setModalOpen={setAddModalOpen}
          />
        </Dialog>
        <ThemeToggle />
      </div>
    </header>
  )
}
