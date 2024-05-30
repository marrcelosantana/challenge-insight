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

import { RemoveSupplierModal } from './remove-supplier-modal'
import { SupplierDetailsModal } from './supplier-details-modal'
import { UpdateSupplierModal } from './update-supplier-modal'

interface SupplierTableProps {
  data: Supplier[]
}

export function SuppliersTable({ data }: SupplierTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Registrado há</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Fornecedor</TableHead>
          <TableHead>Telefone</TableHead>
          <TableHead></TableHead>
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
                    <Button variant="outline" size="sm">
                      <Search className="h-3 w-3" />
                      <span className="sr-only">Detalhes</span>
                    </Button>
                  </DialogTrigger>
                  <SupplierDetailsModal supplier={supplier} />
                </Dialog>
              </TableCell>
              <TableCell className="font-mono text-xs font-medium">
                {supplier.email}
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
              <TableCell className="font-medium">{supplier.name}</TableCell>
              <TableCell className="font-medium">{supplier.phone}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-3 w-3" />
                      Editar
                    </Button>
                  </DialogTrigger>
                  <UpdateSupplierModal />
                </Dialog>
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash className="mr-2 h-3 w-3" />
                      Excluir
                    </Button>
                  </DialogTrigger>
                  <RemoveSupplierModal />
                </Dialog>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
