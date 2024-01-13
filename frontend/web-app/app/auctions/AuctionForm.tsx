'use client';

import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
// import { toast } from 'react-hot-toast';
import { Auction } from '@/types';
import { Button, TextInput } from 'flowbite-react';
import { register } from 'module';
import Input from '../components/Input';

type Props = {
  auction?: Auction
}

export default function AuctionForm() {

  const router = useRouter();
  const pathname = usePathname();
  const { control, handleSubmit, setFocus, reset,
    formState: { isSubmitting, isValid, isDirty, errors } } = useForm({
      mode: 'onTouched'
    });

  // useEffect(() => {
  //   if (auction) {
  //     const { make, model, color, mileage, year } = auction;
  //     reset({ make, model, color, mileage, year });
  //   }
  //   setFocus('make');
  // }, [setFocus, reset, auction])

  async function onSubmit(data: FieldValues) {
    console.log(data);

    // try {
    //   let id = '';
    //   let res;
    //   if (pathname === '/auctions/create') {
    //     res = await createAuction(data);
    //     id = res.id;
    //   } else {
    //     if (auction) {
    //       res = await updateAuction(data, auction.id);
    //       id = auction.id;
    //     }
    //   }
    //   if (res.error) {
    //     throw res.error;
    //   }
    //   router.push(`/auctions/details/${id}`)
    // } catch (error: any) {
    //   toast.error(error.status + ' ' + error.message)
    // }
  }

  return (
    <>
      <form className='flex flex-col mt-3' onSubmit={handleSubmit(onSubmit)}>
        <Input label='Make' name='make' control={control}
          rules={{ required: 'Make is required' }} />
        <Input label='Model' name='model' control={control}
          rules={{ required: 'Model is required' }} />

        <div className='flex justify-between'>
          <Button outline color='gray'>Cancel</Button>
          <Button
            isProcessing={isSubmitting}
            disabled={!isValid}
            type='submit'
            outline color='success'>Submit</Button>
        </div>
      </form>
    </>
  );

};
