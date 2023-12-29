import React from 'react'
import AuctionCard from './AuctionCard';

async function getData() {
    const response = await fetch('http://localhost:6001/search');

    if (!response.ok) throw new Error('Failed to fetch data');

    return response.json();
}

export default async function Listings() {

    const data = await getData();

    return (
        <div>
            {data && data.results.map((auction: any) => (
                <AuctionCard key={auction.id} auction={auction} />
            ))}
        </div>
    );
}

{/* {JSON.stringify(data, null, 2)} */ }