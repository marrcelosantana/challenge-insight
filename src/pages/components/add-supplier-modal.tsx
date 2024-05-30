import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AddSupplierModal() {
  return (
    <DialogContent>
      <DialogHeader className="mb-2">
        <DialogTitle className="text-2xl">Registrar</DialogTitle>
        <DialogDescription>Adicione um fornecedor aqui.</DialogDescription>
      </DialogHeader>

      <form className="space-y-5">
        <div className="flex flex-col gap-3">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="address">Endereço</Label>
          <Input id="address" />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" />
        </div>
      </form>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Cancelar
          </Button>
        </DialogClose>
        <Button variant="success" type="submit">
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
