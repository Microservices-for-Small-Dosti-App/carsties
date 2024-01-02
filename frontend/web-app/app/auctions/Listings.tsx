import React from 'react'
import AuctionCard from './AuctionCard';
import { Auction, PagedResult } from '@/types';
import AppPagination from '../components/AppPagination';

async function getData(): Promise<PagedResult<Auction>> {
    const response = await fetch('http://localhost:6001/search?pageSize=4');

    if (!response.ok) throw new Error('Failed to fetch data');

    return response.json();
}

export default async function Listings() {

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