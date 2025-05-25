'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react';
import { useSession } from 'next-auth/react';
import AuthModal from '../auth-modal';
import TopicModal from '../topic/topic-modal';
import Logo from '../logo';
import SearchInput from '../search';
import UserAvatar from '../user-avatar';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();
  const isSessionLoading = session?.status === 'loading';
  const isAuthorised = !!session?.data?.user;

  return (
    <Navbar
      className='bg-background border-b-[1px] border-b-overlay'
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand className='max-w-[200px]'>
        <Logo />
      </NavbarBrand>
      <NavbarContent className='flex-1'>
        <NavbarItem className='flex-1 hidden md:flex'>
          <SearchInput />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end' className='lg:max-w-[250px] max-w-[75px]'>
        <NavbarContent className='hidden lg:flex'>{isAuthorised && <TopicModal />}</NavbarContent>
        <NavbarItem>{isAuthorised && <UserAvatar />}</NavbarItem>
        <NavbarItem>{!isAuthorised && !isSessionLoading && <AuthModal />}</NavbarItem>
      </NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className='md:hidden'
      />
      <NavbarMenu className='bg-background pt-4'>
        <NavbarMenuItem className='md:hidden'>
          <SearchInput />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
