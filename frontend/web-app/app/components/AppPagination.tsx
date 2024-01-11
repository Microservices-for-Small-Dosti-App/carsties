'use client'

import { Pagination } from 'flowbite-react'
import React from 'react'

type Props = {
    currentPage: number
    pageCount: number
    pageChanged: (page: number) => void;
}

export default function AppPagination({ currentPage, pageCount, pageChanged }: Props) {
    return (
        <div className="flex overflow-x-auto sm:justify-center">
            <Pagination currentPage={currentPage} onPageChange={e => pageChanged(e)} className='text-blue-500 mb-5'
                totalPages={pageCount} layout='navigation' showIcons={true} />
        </div>
    )
}