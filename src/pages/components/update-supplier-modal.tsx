import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateSupplier } from '@/api/update-supplier'
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
import { queryClient } from '@/lib/react-query'
import { Supplier } from '@/models/supplier'

const updateSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  status: z.string().min(1, 'Status é obrigatório'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
})

type FormDataType = z.infer<typeof updateSchema>

interface UpdateSupplierModalProps {
  supplier: Supplier
}

export function UpdateSupplierModal({ supplier }: UpdateSupplierModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm<FormDataType>({
    resolver: zodResolver(updateSchema),
    values: {
      name: supplier.name ?? '',
      status: supplier.status ?? 'Ativo',
      address: supplier.address ?? '',
      phone: supplier.phone ?? '',
      email: supplier.email ?? '',
    },
  })

  const { mutateAsync: updateSupplierFn } = useMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      toast.success('Fornecedor atualizado com sucesso.')
      queryClient.invalidateQueries({ queryKey: ['suppliers'] })
    },
    onError: () => {
      toast.error('Ocorreu um erro ao atualizar o fornecedor.')
    },
  })

  function handleUpdateSupplier(data: FormDataType) {
    const payload: Supplier = {
      ...data,
      id: supplier.id,
      createdAt: supplier.createdAt,
    }
    updateSupplierFn(payload)
  }

  return (
    <DialogContent>
      <DialogHeader className="mb-2">
        <DialogTitle className="text-2xl">Atualizar</DialogTitle>
        <DialogDescription>Atualize um fornecedor aqui.</DialogDescription>
      </DialogHeader>
      <form
        className="w-full space-y-5"
        onSubmit={handleSubmit(handleUpdateSupplier)}
      >
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex w-full flex-col gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register('name')} />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue={supplier.status}
              onValueChange={(value) => {
                setValue('status', value, { shouldDirty: true })
              }}
            >
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
          <Input id="address" {...register('address')} />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" {...register('phone')} type="number" />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register('email')} type="email" />
        </div>
        <DialogFooter className="mt-3 gap-4 sm:gap-1">
          <DialogClose asChild>
            <Button variant="outline" type="button" disabled={isSubmitting}>
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="default"
              type="submit"
              disabled={isSubmitting || !isValid || !isDirty}
            >
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
