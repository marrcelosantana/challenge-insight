import clsx from 'clsx'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Supplier } from '@/models/supplier'
import { dateFormatter } from '@/utils/formatters'

interface SupplierDetailsModalProps {
  supplier: Supplier
}

export function SupplierDetailsModal({ supplier }: SupplierDetailsModalProps) {
  return (
    <DialogContent>
      <DialogHeader className="mb-2">
        <DialogTitle className="text-xl sm:text-2xl">
          Detalhes do fornecedor
        </DialogTitle>
      </DialogHeader>
      <div className="flex h-full w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Identificador</Label>
          <span className="text-sm text-muted-foreground">{supplier.id}</span>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Nome</Label>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {supplier.name}
            <div
              className={clsx('h-2 w-2 rounded-full', {
                'bg-green-400': supplier.status === 'Ativo',
                'bg-red-400': supplier.status === 'Inativo',
              })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Email</Label>
          <span className="text-sm text-muted-foreground">
            {supplier.email}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Telefone</Label>
          <span className="text-sm text-muted-foreground">
            {supplier.phone}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Endereço</Label>
          <span className="text-sm text-muted-foreground">
            {supplier.address}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Data de Registro</Label>
          <span className="text-sm text-muted-foreground">
            {dateFormatter.format(new Date(supplier.createdAt))}
          </span>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Fechar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
