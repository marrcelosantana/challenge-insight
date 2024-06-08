import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

import { registerSupplier } from '@/api/post-new-supplier'
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

const registerSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório.'),
  status: z.string().min(1, 'Campo obrigatório.'),
  address: z.string().min(1, 'Campo obrigatório.'),
  phone: z
    .string()
    .min(11, 'Campo obrigatório, min 11 caracteres.')
    .max(11, 'Telefone inválido, máx 11 caracteres.'),
  email: z.string().min(1, 'Campo obrigatório.').email('Email inválido.'),
})

type FormDataType = z.infer<typeof registerSchema>

interface AddSupplierModalProps {
  isModalOpen: boolean
  setModalOpen: (value: boolean) => void
}

export function AddSupplierModal({
  setModalOpen,
  isModalOpen,
}: AddSupplierModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormDataType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      status: 'Ativo',
    },
  })

  const { mutateAsync: registerSupplierFn } = useMutation({
    mutationFn: registerSupplier,
    onSuccess: () => {
      toast.success('Fornecedor registrado com sucesso.', {
        duration: 3000,
      })
      queryClient.invalidateQueries({ queryKey: ['suppliers-page'] })
      queryClient.invalidateQueries({ queryKey: ['all-suppliers'] })
      setModalOpen(false)
      reset()
    },
    onError: () => {
      toast.error('Erro ao registrar fornecedor.', {
        duration: 3000,
      })
      setModalOpen(false)
      reset()
    },
  })

  function emailAlreadyExists(email: string) {
    const suppliers = queryClient.getQueryData<Supplier[]>(['all-suppliers'])
    return suppliers?.some((supplier: Supplier) => supplier.email === email)
  }

  function handleRegister(data: FormDataType) {
    const payload: Supplier = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...data,
    }

    if (emailAlreadyExists(payload.email)) {
      toast.error('Email já cadastrado, tente novamente!', {
        duration: 3000,
      })
      return
    }

    registerSupplierFn(payload)
  }

  useEffect(() => {
    if (!isModalOpen) {
      reset()
    }
  }, [isModalOpen, reset])

  return (
    <DialogContent>
      <DialogHeader className="mb-2">
        <DialogTitle className="text-2xl">Registrar</DialogTitle>
        <DialogDescription>Adicione um fornecedor aqui.</DialogDescription>
      </DialogHeader>
      <form
        className="w-full space-y-7"
        onSubmit={handleSubmit(handleRegister)}
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
              defaultValue="Ativo"
              onValueChange={(value) => {
                setValue('status', value)
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
          <DialogClose asChild>
            <Button variant="outline" type="button" disabled={isSubmitting}>
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="default" type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
