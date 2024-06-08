import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteSupplier } from '@/api/delete-supplier'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { loadSuppliers } from '@/utils/functions'

interface DeleteSupplierModalProps {
  supplierId: string
}

export function DeleteSupplierModal({ supplierId }: DeleteSupplierModalProps) {
  const { mutateAsync: deleteSupplierFn } = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: () => {
      toast.success('Fornecedor removido com sucesso.', {
        duration: 3000,
      })
      loadSuppliers()
    },
    onError: () => {
      toast.error('Ocorreu um erro ao deletar o fornecedor.', {
        duration: 3000,
      })
    },
  })

  function handleDeleteSupplier() {
    deleteSupplierFn(supplierId)
  }

  return (
    <DialogContent>
      <DialogHeader className="mb-2">
        <DialogTitle className="text-2xl">Excluir</DialogTitle>
      </DialogHeader>
      <div className="flex h-full w-full">
        Tem certeza que deseja excluir este fornecedor?
        <br /> Esta ação não poderá ser desfeita.
      </div>
      <DialogFooter className="gap-3 sm:gap-1">
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Cancelar
          </Button>
        </DialogClose>
        <Button
          variant="destructive"
          type="submit"
          onClick={handleDeleteSupplier}
        >
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
