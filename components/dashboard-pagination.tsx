"use client"

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

type DashboardPaginationProps = {
  page: number
  hasNextPage: boolean
  totalPages?: number
}

export function DashboardPagination({
  page,
  hasNextPage,
  totalPages,
}: DashboardPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function goToPage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString())

    if (newPage <= 1) {
      params.delete("page")
    } else {
      params.set("page", String(newPage))
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center justify-between gap-4 pt-4">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
      >
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {page}
        {totalPages ? ` of ${totalPages}` : ""}
      </span>

      <Button
        variant="outline"
        disabled={!hasNextPage}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}
