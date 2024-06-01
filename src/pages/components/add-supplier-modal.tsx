import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

import { registerSupplier } from '@/api/post-new-supplier'
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
  name: z.string().min(1, 'Nome é obrigatório'),
  status: z.string().min(1, 'Status é obrigatório'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
})

type FormDataType = z.infer<typeof registerSchema>

interface AddSupplierModalProps {
  setModalOpen: (value: boolean) => void
}

export function AddSupplierModal({ setModalOpen }: AddSupplierModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<FormDataType>({
    resolver: zodResolver(registerSchema),
    values: {
      name: '',
      status: 'Ativo',
      address: '',
      phone: '',
      email: '',
    },
  })

  const { mutateAsync: registerSupplierFn } = useMutation({
    mutationFn: registerSupplier,
    onSuccess: () => {
      toast.success('Fornecedor registrado com sucesso.', {
        duration: 3000,
      })
      queryClient.invalidateQueries({ queryKey: ['suppliers-page'] })
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

  function handleRegister(data: FormDataType) {
    const payload: Supplier = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      ...data,
    }
    registerSupplierFn(payload)
  }

  return (
    <DialogContent>
      <DialogHeader className="mb-2">
        <DialogTitle className="text-2xl">Registrar</DialogTitle>
        <DialogDescription>Adicione um fornecedor aqui.</DialogDescription>
      </DialogHeader>
      <form
        className="w-full space-y-5"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex w-full flex-col gap-3">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register('name')} />
          </div>
          <div className="flex flex-col gap-3">
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
          <Button
            variant="default"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
