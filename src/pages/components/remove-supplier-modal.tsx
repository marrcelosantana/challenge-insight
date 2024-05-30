import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function RemoveSupplierModal() {
  return (
    <DialogContent>
      <DialogHeader className="mb-2">
        <DialogTitle className="text-2xl">Excluir</DialogTitle>
      </DialogHeader>
      <div className="flex h-full w-full">
        Tem certeza que deseja excluir este fornecedor?
        <br /> Esta ação não poderá ser desfeita.
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Cancelar
          </Button>
        </DialogClose>
        <Button variant="destructive" type="submit">
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
