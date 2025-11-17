'use client'

import { MoreHorizontal, Truck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/utils'

const orders = [
  {
    id: 'ORD001',
    customer: 'Liam Johnson',
    date: '2023-06-23',
    status: 'Fulfilled',
    total: 250.0,
  },
  {
    id: 'ORD002',
    customer: 'Olivia Smith',
    date: '2023-06-24',
    status: 'Pending',
    total: 150.0,
  },
  {
    id: 'ORD003',
    customer: 'Noah Williams',
    date: '2023-06-25',
    status: 'Fulfilled',
    total: 350.0,
  },
  {
    id: 'ORD004',
    customer: 'Emma Brown',
    date: '2023-06-26',
    status: 'Cancelled',
    total: 450.0,
  },
  {
    id: 'ORD005',
    customer: 'Ava Jones',
    date: '2023-06-27',
    status: 'Fulfilled',
    total: 550.0,
  },
]

type OrderStatus = 'Pending' | 'Fulfilled' | 'Cancelled'

const statusVariant: Record<OrderStatus, 'default' | 'secondary' | 'destructive'> = {
    Pending: 'secondary',
    Fulfilled: 'default',
    Cancelled: 'destructive'
}

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
          <CardDescription>Recent orders from your store.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="font-medium">{order.customer}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant={statusVariant[order.status as OrderStatus]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {order.date}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(order.total)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Fulfilled</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}