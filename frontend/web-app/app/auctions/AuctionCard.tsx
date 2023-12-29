import Image from 'next/image';
import React from 'react'

type AuctionCardProps = {
    auction: any
};

export default function AuctionCard({ auction }: AuctionCardProps) {
    return (
        <a href='#'>
            <div className='w-full bg-gray-200 aspect-video rounded-lg overflow-hidden'>
                <Image
                    src={auction.imageUrl}
                    alt='Auction Image'
                    fill
                    className='object-cover'
                />
            </div>
        </a>
    )
}
