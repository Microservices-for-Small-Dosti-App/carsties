'use client';

import { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard';
import { Auction, PagedResult } from '@/types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';
import { useParamsStore } from '@/hooks/useParamsStore';
import { shallow } from 'zustand/shallow';
import qs from 'query-string';

export default function Listings() {

    const [data, setData] = useState<PagedResult<Auction>>();

    const params = useParamsStore(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner
    }), shallow);
    
    const setParams = useParamsStore(state => state.setParams);
    
    const url = qs.stringifyUrl({ url: '', query: params });

    useEffect(() => {
        getData(url)
            .then((data: any) => {
                setAuctions(data.results);
                setPageCount(data.pageCount);
            })
    }, [pageNumber, pageSize]);

    if (auctions.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Filters pageSize={pageSize} setPageSize={setPageSize} />

            <div className='grid grid-cols-4 gap-6'>
                {auctions.map((auction: Auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                ))}
            </div>
            <div className='flex justify-center mt-4'>
                <AppPagination currentPage={pageNumber} pageCount={pageCount} pageChanged={setPageNumber} />
            </div>
        </>
    );
}

{/* {JSON.stringify(data, null, 2)} */ }