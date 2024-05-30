import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

export function SupplierDetailsModal() {
  return (
    <DialogContent>
      <DialogHeader className="mb-2">
        <DialogTitle className="text-2xl">Detalhes do fornecedor</DialogTitle>
      </DialogHeader>
      <div className="flex h-full w-full flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Identificador</Label>
          <span className="text-sm text-zinc-500">ds87d8sd9</span>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Nome</Label>
          <span className="text-sm text-zinc-500">John Doe</span>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Email</Label>
          <span className="text-sm text-zinc-500">johndoe@email.com</span>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Endereço</Label>
          <span className="text-sm text-zinc-500">Rua da Uva - 789</span>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-bold">Status</Label>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400" />
            <span className="text-sm text-zinc-500">Ativo</span>
          </div>
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
