'use server'

import { Auction, PagedResult } from "@/types";
import { getTokenWorkaround } from "./authActions";
import { fetchWrapper } from "../lib/fetchWrapper";

export async function getData(query: string): Promise<PagedResult<Auction>> {
    console.log('getData(). Query:', query);

    return fetchWrapper.get(`search${query}`);
}

export async function updateAuctionTest() {
    const data = {
        mileage: Math.floor(Math.random() * 100000) + 1
    };

    const token = await getTokenWorkaround();

    const response = await fetch(`http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.access_token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) return { status: response.status, message: response.statusText };

    return response.statusText;
}

// const response = await fetch(`http://localhost:6001/search${query}`);

// if (!response.ok) throw new Error('Failed to fetch data');

// return response.json();
