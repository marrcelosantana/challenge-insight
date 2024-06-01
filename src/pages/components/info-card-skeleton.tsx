import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function InfoCardSkeleton() {
  return (
    <Card className="min-h-[134px] min-w-[280px] border-muted-foreground">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-6" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-6 w-12" />
        <Skeleton className="w-42 h-4" />
      </CardContent>
    </Card>
  )
}
