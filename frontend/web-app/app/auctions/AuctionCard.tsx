import React from 'react'

type AuctionCardProps = {
    auction: any
};

export default function AuctionCard({ auction }: AuctionCardProps) {
    return (
        <div>{auction.make}</div>
    )
}
