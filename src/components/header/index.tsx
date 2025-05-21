'use client';

import {
  Avatar,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import SignOutForm from "../auth-buttons/SignOutForm";
import AuthModal from "../auth-modal";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/16/solid";
import TopicModal from "../topic/topic-modal";
import Logo from "../logo";

export default function Header() {
  const session = useSession();
  const isSessionLoading = session?.status === "loading";
  const isAuthorised = !!session?.data?.user;

  return (
    <Navbar className="bg-background border-b-[1px] border-b-slate-300/20">
      <NavbarBrand className="max-w-[200px]">
        <Logo />
      </NavbarBrand>
      <NavbarContent className="flex-1">
        <NavbarItem className="flex-1">
          <Input
            isClearable
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                "flex-1"
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-overlay",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-overlay",
                "dark:hover:bg-overlay",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Search posts..."
            radius="lg"
            startContent={
              <MagnifyingGlassCircleIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 w-6 h-6" />
            }
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="max-w-[250px] hidden lg:flex">
        <NavbarContent>
          {isAuthorised && (
            <TopicModal />
          )}
        </NavbarContent>
        <NavbarItem>
          {isAuthorised && (
            <Popover placement="bottom">
              <PopoverTrigger>
                <Avatar
                  src={session?.data?.user?.image ?? undefined}
                  className="cursor-pointer"
                />
              </PopoverTrigger>
     
              <PopoverContent className="bg-overlay">
                <div className="p-1 bg-overlay">
                  <SignOutForm />
                </div>
              </PopoverContent>
            </Popover>
          )}
        </NavbarItem>
        <NavbarItem className="">
          {!isAuthorised && !isSessionLoading && (
            <AuthModal />
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
