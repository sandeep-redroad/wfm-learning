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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useLocation, useNavigate } from 'react-router-dom'

export function PaginationWithLinks({
    pageSizeSelectOptions,
    pageSize,
    totalCount,
    page,
    pageSearchParam,
}) {
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

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

    const navToPageSize = useCallback(
        (newPageSize) => {
            const key = pageSizeSelectOptions?.pageSizeSearchParam || 'pageSize'
            const newSearchParams = new URLSearchParams(searchParams)
            newSearchParams.set(key, String(newPageSize))
            navigate(`${location.pathname}?${newSearchParams.toString()}`)
        },
        [searchParams, location.pathname, pageSizeSelectOptions, navigate]
    )

    const renderPageNumbers = () => {
        const items = []
        const maxVisiblePages = 5

        if (totalPageCount <= maxVisiblePages) {
            for (let i = 1; i <= totalPageCount; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            to={buildLink(i)}
                            isActive={page === i}
                        >
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
                        <PaginationLink
                            to={buildLink(i)}
                            isActive={page === i}
                        >
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
        <div className="flex flex-row justify-end items-center gap-3 w-full mb-3 mt-4">
            {pageSizeSelectOptions && (
                <div className="flex flex-col gap-4 flex-1 justify-end">
                    <SelectRowsPerPage 
                        options={pageSizeSelectOptions.pageSizeOptions}
                        setPageSize={navToPageSize}
                        pageSize={pageSize}
                    />
                </div>
            )}
            <Pagination
                className={cn({ 'justify-end': pageSizeSelectOptions })}
            >
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

function SelectRowsPerPage({ options, setPageSize, pageSize }) {
    return (
        <div className="flex items-center gap-4 justify-end">
            <span className="whitespace-nowrap text-sm">Rows per page</span>

            <Select
                className="w-10"
                value={String(pageSize)}
                onValueChange={(value) => setPageSize(Number(value))}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select page size">
                        {String(pageSize)}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent className="w-10">
                    {options.map((option) => (
                        <SelectItem key={option} value={String(option)}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
