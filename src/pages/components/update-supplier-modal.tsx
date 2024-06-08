import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateSupplier } from '@/api/update-supplier'
import { ErrorMessage } from '@/components/error-message'
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
  name: z.string().min(1, 'Campo obrigatório.'),
  status: z.string().min(1, 'Campo obrigatório.'),
  address: z.string().min(1, 'Campo obrigatório.'),
  phone: z
    .string()
    .min(11, 'Campo obrigatório, min 11 caracteres.')
    .max(11, 'Telefone inválido, máx 11 caracteres.'),
  email: z.string().min(1, 'Campo obrigatório.').email('Email inválido.'),
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
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<FormDataType>({
    resolver: zodResolver(updateSchema),
    mode: 'onChange',
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
      toast.success('Fornecedor atualizado com sucesso.', {
        duration: 3000,
      })
      queryClient.invalidateQueries({ queryKey: ['suppliers-page'] })
      queryClient.invalidateQueries({ queryKey: ['all-suppliers'] })
    },
    onError: () => {
      toast.error('Ocorreu um erro ao atualizar o fornecedor.', {
        duration: 3000,
      })
    },
  })

  function emailAlreadyExists(email: string) {
    const suppliers = queryClient.getQueryData<Supplier[]>(['all-suppliers'])
    return suppliers?.some((supplier: Supplier) => supplier.email === email)
  }

  function handleUpdateSupplier(data: FormDataType) {
    const payload: Supplier = {
      ...data,
      id: supplier.id,
      createdAt: supplier.createdAt,
    }

    if (emailAlreadyExists(payload.email) && payload.email !== supplier.email) {
      toast.error('Cliente não atualizado, email já existente!', {
        duration: 3000,
      })
      reset()
      return
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
        className="w-full space-y-7"
        onSubmit={handleSubmit(handleUpdateSupplier)}
      >
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex h-16 w-full flex-col gap-1">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register('name')} maxLength={30} />
            <ErrorMessage message={errors.name?.message} />
          </div>
          <div className="flex h-16 flex-col gap-1">
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
            <ErrorMessage message={errors.status?.message} />
          </div>
        </div>
        <div className="flex h-16 flex-col gap-1">
          <Label htmlFor="address">Endereço</Label>
          <Input id="address" {...register('address')} maxLength={50} />
          <ErrorMessage message={errors.address?.message} />
        </div>
        <div className="flex h-16 flex-col gap-1">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" {...register('phone')} type="number" />
          <ErrorMessage message={errors.phone?.message} />
        </div>
        <div className="flex h-16 flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register('email')} type="email" />
          <ErrorMessage message={errors.email?.message} />
        </div>
        <DialogFooter className="mt-3 gap-4 sm:gap-1">
          <DialogClose asChild onClick={() => reset()}>
            <Button variant="outline" type="button" disabled={isSubmitting}>
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="default"
              type="submit"
              disabled={isSubmitting || !isDirty}
            >
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
