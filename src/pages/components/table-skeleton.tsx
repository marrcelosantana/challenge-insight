import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function TableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 7 }).map((_, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-8 w-8" />
              </TableCell>
              <TableCell className="max-w-[120px] truncate font-medium">
                <Skeleton className="w-42 h-4" />
              </TableCell>
              <TableCell className="text-muted-foreground">
                <Skeleton className="w-42 h-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-42 h-4" />
              </TableCell>
              <TableCell className="max-w-[120px] font-mono text-xs font-medium">
                <Skeleton className="w-42 h-4" />
              </TableCell>
              <TableCell className=" max-w-[120px]  font-medium">
                <Skeleton className="w-42 h-4" />
              </TableCell>
              <TableCell className="flex items-center justify-center gap-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
