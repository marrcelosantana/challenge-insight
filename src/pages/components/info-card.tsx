import { CheckCircle, CircleOff, Info } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface InfoCardProps {
  type: 'total' | 'active' | 'inactive'
  data: number
}

export function InfoCard({ type, data }: InfoCardProps) {
  return (
    <Card className="min-w-[280px] border-accent-foreground">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          {type === 'total' && 'Total'}
          {type === 'active' && 'Ativos'}
          {type === 'inactive' && 'Inativos'}
        </CardTitle>
        {type === 'total' && <Info className="h-6 w-6" />}
        {type === 'active' && (
          <CheckCircle className="h-6 w-6 text-green-400" />
        )}
        {type === 'inactive' && <CircleOff className="h-6 w-6 text-red-400" />}
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">{data}</span>
        {type === 'total' && (
          <p className="text-xs text-muted-foreground">
            Número total de fornecedores.
          </p>
        )}
        {type === 'active' && (
          <p className="text-xs text-muted-foreground">
            Número total de fornecedores ativos.
          </p>
        )}
        {type === 'inactive' && (
          <p className="text-xs text-muted-foreground">
            Número total de fornecedores inativos.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
