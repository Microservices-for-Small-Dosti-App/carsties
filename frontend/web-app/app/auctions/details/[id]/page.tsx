import { getDetailedViewData } from '@/app/actions/auctionActions';
import { getCurrentUser } from '@/app/actions/authActions';
import Heading from '@/app/components/Heading';
import React from 'react';
import CountdownTimer from '../../CountdownTimer';

export default async function Details({ params }: { params: { id: string } }) {
    const data = await getDetailedViewData(params.id);
    const user = await getCurrentUser();

    return (
        <div>

            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Heading title={`${data.make} ${data.model}`} />
                    {user?.username === data.seller && (
                        <>
                            {/* <EditButton id={data.id} />
                            <DeleteButton id={data.id} /> */}
                        </>

                    )}
                </div>

                <div className='flex gap-3'>
                    <h3 className='text-2xl font-semibold'>Time remaining:</h3>
                    <CountdownTimer auctionEnd={data.auctionEnd} />
                </div>
            </div>
        </div>
    );

};
