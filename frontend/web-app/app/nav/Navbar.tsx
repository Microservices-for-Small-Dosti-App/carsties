import React from 'react'
import Search from './Search';
import Logo from './Logo';
import LoginButton from './LoginButton';
import { getCurrentUser } from '../actions/authActions';
import UserActions from './UserActions';

export default async function Navbar() {
    const user = await getCurrentUser();

    return (
        <header className='sticky top-0 z-50 flex justify-between bg-white p-3 items-center text-gray-800 shadow-md shadow-gray-400'>
            <Logo />
            <Search />
            {user ? (
                <UserActions user={user} />
            ) : (
                <LoginButton />
            )}
        </header>
    );
}
