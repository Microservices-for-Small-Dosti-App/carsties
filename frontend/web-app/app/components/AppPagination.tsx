'use client'

import { Pagination, PaginationButtonProps } from 'flowbite-react'
import React from 'react'

type Props = {
    currentPage: number
    pageCount: number
    pageChanged: (page: number) => void;
}

export default function AppPagination({ currentPage, pageCount, pageChanged }: Props) {
    const renderPaginationButton = (props: PaginationButtonProps): React.ReactNode => {
        const { active, children, onClick, theme, ...rest } = props;

        // Customize the rendering logic here based on your requirements
        const buttonStyles = {
            backgroundColor: active ? theme?.active : theme?.base,
            color: theme?.base,
        };

        return (
            <button style={buttonStyles} onClick={onClick} {...rest}>
                {children}
            </button>
        );
    };

    return (
        <div className="flex overflow-x-auto sm:justify-center">
            <Pagination currentPage={currentPage} onPageChange={e => pageChanged(e)} className='text-blue-500 mb-5'
                totalPages={pageCount} layout='pagination' showIcons={true} renderPaginationButton={renderPaginationButton} />
        </div>
    );

};