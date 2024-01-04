'use client';

import { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard';
import { Auction } from '@/types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';

export default function Listings() {

    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(4);

    useEffect(() => {
        getData(pageNumber, pageSize)
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