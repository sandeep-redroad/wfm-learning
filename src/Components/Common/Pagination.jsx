import { useCallback } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/Components/ui/pagination'
import { useLocation } from 'react-router-dom'
import Constent from '@/utils/constent'

export function PaginationWithLinks({ totalCount, pageSearchParam }) {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const page = parseInt(searchParams.get('page') || 1)
    const pageSize = Constent.PAGINATION_SIZE
    const totalPageCount = Math.ceil(totalCount / pageSize)

    const buildLink = useCallback(
        (newPage) => {
            const key = pageSearchParam || 'page'
            const newSearchParams = new URLSearchParams(searchParams)
            newSearchParams.set(key, String(newPage))
            return `${location.pathname}?${newSearchParams.toString()}`
        },
        [searchParams, location.pathname, pageSearchParam]
    )

    const renderPageNumbers = () => {
        const items = []
        const maxVisiblePages = 5

        if (totalPageCount <= maxVisiblePages) {
            for (let i = 1; i <= totalPageCount; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink to={buildLink(i)} isActive={page === i}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                )
            }
        } else {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink to={buildLink(1)} isActive={page === 1}>
                        1
                    </PaginationLink>
                </PaginationItem>
            )

            if (page > 3) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }

            const start = Math.max(2, page - 1)
            const end = Math.min(totalPageCount - 1, page + 1)

            for (let i = start; i <= end; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink to={buildLink(i)} isActive={page === i}>
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                )
            }

            if (page < totalPageCount - 2) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }

            items.push(
                <PaginationItem key={totalPageCount}>
                    <PaginationLink
                        to={buildLink(totalPageCount)}
                        isActive={page === totalPageCount}
                    >
                        {totalPageCount}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        return items
    }

    return (
        <div className="flex flex-row justify-end items-end gap-3 w-full mb-3 mt-4">
            <Pagination className="justify-end">
                <PaginationContent className="max-sm:gap-0">
                    <PaginationItem>
                        <PaginationPrevious
                            to={buildLink(Math.max(page - 1, 1))}
                            aria-disabled={page === 1}
                            tabIndex={page === 1 ? -1 : undefined}
                            className={
                                page === 1
                                    ? 'pointer-events-none opacity-50'
                                    : undefined
                            }
                        />
                    </PaginationItem>
                    {renderPageNumbers()}
                    <PaginationItem>
                        <PaginationNext
                            to={buildLink(Math.min(page + 1, totalPageCount))}
                            aria-disabled={page === totalPageCount}
                            tabIndex={page === totalPageCount ? -1 : undefined}
                            className={
                                page === totalPageCount
                                    ? 'pointer-events-none opacity-50'
                                    : undefined
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
