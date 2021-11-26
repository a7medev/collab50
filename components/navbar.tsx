import type { User } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button';

import cn from '../utils/classnames';
import Avatar from './avatar';
import { useRouter } from 'next/router';
import UserDetails from './user-details';

interface NavLinkProps {
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className="block mt-4 lg:inline-block lg:mt-0 lg:mr-4 text-teal-200 hover:text-green-500">
        {children}
      </a>
    </Link>
  );
};

interface NavbarProps {
  user?: Omit<User, 'password'>;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });

    router.push('/');
  };

  return (
    <nav className="p-6 shadow-sm">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link href="/">
            <a className="font-bold text-xl">
              Collab<span className="text-green-500">50</span>
            </a>
          </Link>
        </div>
        <div className="ml-auto mr-4 lg:mr-0 lg:ml-0 block lg:hidden">
          <button
            onClick={() => setIsOpen((curr) => !curr)}
            className="flex items-center hover:text-green-500"
          >
            <svg
              className="fill-current h-5 w-5"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        {user && (
          <div className="lg:ml-auto lg:order-3">
            <Menu>
              <MenuButton className="bg-green-100 text-green-600 py-2 px-4 rounded-lg">
                {user.name} <span aria-hidden>▾</span>
              </MenuButton>

              <MenuList className="bg-white text-center rounded-lg border border-gray-200 p-2 mt-1 w-72">
                <UserDetails user={user} className="p-3" />

                <MenuItem onSelect={handleLogout} className="px-4 rounded p-2">
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        )}

        <div
          className={cn(
            isOpen ? 'block' : 'hidden',
            'w-full flex-grow lg:flex lg:items-center lg:w-auto lg:order-2'
          )}
        >
          <div className="text-sm lg:flex-grow">
            {user ? (
              <NavLink href="/projects">Projects</NavLink>
            ) : (
              <>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/login">Login</NavLink>
                <NavLink href="/register">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
