import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Edit, Search, X } from 'lucide-react'

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
        {data?.map((data: Supplier) => {
          return (
            <TableRow key={data.id}>
              <TableCell>
                <Button variant="outline" size="sm">
                  <Search className="h-3 w-3" />
                  <span className="sr-only">Detalhes</span>
                </Button>
              </TableCell>
              <TableCell className="font-mono text-xs font-medium">
                {data.email}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDistanceToNow(data.createdAt, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span
                    className={clsx('h-2 w-2 rounded-full', {
                      'bg-green-400': data.status === 'Ativo',
                      'bg-red-400': data.status === 'Inativo',
                    })}
                  />
                  <span className="font-medium text-muted-foreground">
                    {data.status}
                  </span>
                </div>
              </TableCell>
              <TableCell className="font-medium">{data.name}</TableCell>
              <TableCell className="font-medium">{data.phone}</TableCell>
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
                <Button variant="ghost" size="sm">
                  <X className="mr-2 h-3 w-3" />
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
