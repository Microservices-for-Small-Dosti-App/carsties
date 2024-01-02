import React from 'react'
import AuctionCard from './AuctionCard';
import { Auction, PagedResult } from '@/types';
import AppPagination from '../components/AppPagination';



export default function Listings() {

    const data: PagedResult<Auction> = await getData();

    return (
        <>
            <div className='grid grid-cols-4 gap-6'>
                {data && data.results.map((auction: Auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                ))}
            </div>
            <div className='flex justify-center mt-4'>
                <AppPagination currentPage={1} pageCount={data.pageCount} />
            </div>
        </>
    );
}

{/* {JSON.stringify(data, null, 2)} */ }