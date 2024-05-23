import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = usePathname()
  const menuItems = [
    "CLOCK",
    "TIMER",
    "FULL LENGTH TEST"
  ];

  return (
    <Navbar  isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}  maxWidth="full" className="pt-5 pb-5">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Image
            width={120}
            alt="NextUI hero Image"
            src="/preptimelogo.png"
            radius="none"
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
        <Image
            width={130}
            alt="NextUI hero Image"
            src="/preptimelogo.png"
            radius="none"
          />
        </NavbarBrand>
        <NavbarItem className="ml-16">
          <Link className={`text-lg`} color={`${location==="/clock"?"warning":"foreground"}`} href="/clock">
            CLOCK
          </Link>
        </NavbarItem>
        <NavbarItem className="ml-6">
          <Link className={`text-lg`} color={`${location==="/timer"?"warning":"foreground"}`} href="/timer" aria-current="page">
            TIMER
          </Link>
        </NavbarItem>
        <NavbarItem className="ml-6">
          <Link className={`text-lg`} color={`${location==="/full-length-test"?"warning":"foreground"}`} href="/full-length-test">
            FULL LENGTH TEST
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform md:mr-10"
              color="default"
              name="Jason Hughes"
              size="lg"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
