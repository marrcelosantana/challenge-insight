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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function UpdateSupplierModal() {
  return (
    <DialogContent>
      <DialogHeader className="mb-2">
        <DialogTitle className="text-2xl">Atualizar</DialogTitle>
        <DialogDescription>Atualize um fornecedor aqui.</DialogDescription>
      </DialogHeader>
      <form className="w-full space-y-5">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex w-full flex-col gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue="Ativo">
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
        <DialogFooter className="mt-3">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="default" type="submit">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
