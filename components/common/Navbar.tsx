import NextLink from 'next/link';
import React from 'react';
import { Home, Star, User } from 'react-feather';

const Navbar = (props: any) => {
  const { path } = props;
  const NavItem = ({ href, path, children }: any) => {
    const active = path === href;

    return (
      <NextLink href={href}>
        <div className={active ? 'text-secondary' : 'text-dark hover:cursor-pointer'}>
          {children}
        </div>
      </NextLink>
    );
  };

  return (
    <div className="fixed bottom-0  bg-white w-full shadow-[0px_-4px_16px_rgba(14,14,14,0.25)] rounded-t-3xl py-5 z-10">
      <div className="justify-around flex flex-row text-dark ">
        <NavItem href="/" path={path}>
          <Home size={28} />
        </NavItem>
        <NavItem href="/favorites" path={path}>
          <Star size={28} />
        </NavItem>
        <NavItem href="/profile" path={path}>
          <User size={28} />
        </NavItem>
      </div>
    </div>
  );
};

export default Navbar;
