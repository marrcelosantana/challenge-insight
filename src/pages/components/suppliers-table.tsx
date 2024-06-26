import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Edit, Search, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Supplier } from '@/models/supplier'
import { formatPhone } from '@/utils/formatters'

import { DeleteSupplierModal } from './delete-supplier-modal'
import { SupplierDetailsModal } from './supplier-details-modal'
import { UpdateSupplierModal } from './update-supplier-modal'

interface SupplierTableProps {
  data: Supplier[]
}

export function SuppliersTable({ data }: SupplierTableProps) {
  return (
    <Table className="border-y-2">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Registrado há</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((supplier: Supplier) => {
          return (
            <TableRow key={supplier.id}>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm">
                      <Search className="h-3 w-3" />
                      <span className="sr-only">Detalhes</span>
                    </Button>
                  </DialogTrigger>
                  <SupplierDetailsModal supplier={supplier} />
                </Dialog>
              </TableCell>
              <TableCell className="max-w-[120px] truncate font-medium">
                {supplier.name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDistanceToNow(supplier.createdAt, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span
                    className={clsx('h-2 w-2 rounded-full', {
                      'bg-green-400': supplier.status === 'Ativo',
                      'bg-red-400': supplier.status === 'Inativo',
                    })}
                  />
                  <span className="font-medium text-muted-foreground">
                    {supplier.status}
                  </span>
                </div>
              </TableCell>
              <TableCell className="max-w-[120px] truncate font-mono text-xs font-medium">
                {supplier.email}
              </TableCell>
              <TableCell className=" max-w-[120px] truncate font-medium">
                {formatPhone(supplier.phone)}
              </TableCell>
              <TableCell className="flex items-center justify-center gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm">
                      <Edit className="mr-2 h-3 w-3" />
                      Editar
                    </Button>
                  </DialogTrigger>
                  <UpdateSupplierModal supplier={supplier} />
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm">
                      <Trash className="mr-2 h-3 w-3" />
                      Excluir
                    </Button>
                  </DialogTrigger>
                  <DeleteSupplierModal supplierId={supplier.id} />
                </Dialog>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
