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
import { Image } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import usePrepTimeStore from "@/store/prepTimeStore";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = usePathname();
  const { userPrepTimeData } = usePrepTimeStore((state) => ({
    userPrepTimeData: state.userPrepTimeData,
  }));
  function getDateDifference(endDate) {
    // Convert dates to milliseconds
    const startDate = new Date()
    endDate=new Date(endDate)
    const startMillis = startDate.getTime();
    const endMillis = endDate.getTime();

    // Calculate the difference in milliseconds
    const differenceMillis = endMillis - startMillis;

    // Convert milliseconds to days
    const differenceDays = Math.floor(differenceMillis / (1000 * 60 * 60 * 24));

    return differenceDays;
}
  const menuItems = [
    ["HOME", "/"],
    ["CLOCK", "/clock"],
    ["TIMER", "/timer"],
    ["FULL LENGTH TEST", "/full-length-test"],
    ["SHOW REPORT", "/show-report"],
    ["HELP", "/help"],
  ];
  const router = useRouter();
  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="pt-5 pb-5"
    >
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="lg:hidden pr-3" justify="center">
        <NavbarBrand>
          <div onClick={() => router.push("/")} className="cursor-pointer">
            <Image
              width={120}
              alt="NextUI hero Image"
              src="/preptimelogo.png"
              radius="none"
            />
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        <NavbarBrand>
          <div onClick={() => router.push("/")} className="cursor-pointer">
            <Image
              width={120}
              alt="NextUI hero Image"
              src="/preptimelogo.png"
              radius="none"
            />
          </div>
        </NavbarBrand>
        <NavbarItem className="ml-16">
          <div
            onClick={() => router.push("/")}
            className={`text-lg hover:text-warning cursor-pointer ${
              location === "/" ? "text-warning" : "text-foreground"
            }`}
          >
            HOME
          </div>
        </NavbarItem>
        <NavbarItem className="ml-6">
          <div
            onClick={() => router.push("/clock")}
            className={`text-lg hover:text-warning cursor-pointer ${
              location === "/clock" ? "text-warning" : "text-foreground"
            }`}
          >
            CLOCK
          </div>
        </NavbarItem>
        <NavbarItem className="ml-6">
          <div
            onClick={() => router.push("/timer")}
            className={`text-lg hover:text-warning cursor-pointer ${
              location === "/timer" ? "text-warning" : "text-foreground"
            }`}
          >
            TIMER
          </div>
        </NavbarItem>
        <NavbarItem className="ml-6">
          <div
            onClick={() => router.push("/full-length-test")}
            className={`text-lg hover:text-warning cursor-pointer ${
              location === "/full-length-test"
                ? "text-warning"
                : "text-foreground"
            }`}
          >
            FULL LENGTH TEST
          </div>
        </NavbarItem>
        <NavbarItem className="ml-6">
          <div
            onClick={() => router.push("/show-report")}
            className={`text-lg hover:text-warning cursor-pointer ${
              location === "/show-report" ? "text-warning" : "text-foreground"
            }`}
          >
            SHOW REPORT
          </div>
        </NavbarItem>
        <NavbarItem className="ml-6">
          <div
            onClick={() => router.push("/help")}
            className={`text-lg hover:text-warning cursor-pointer ${
              location === "/help" ? "text-warning" : "text-foreground"
            }`}
          >
            HELP
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        as="div"
        className="flex flex-col mt-[-40px] lg:absolute lg:right-20"
        justify="end"
      >
        <Dropdown isOpen={isOpen}>
          <DropdownTrigger>
            <NavbarItem
              className="flex gap-1 self-center"
              onMouseEnter={() => {
                setIsOpen(true);
              }}
              onMouseLeave={() => {
                setIsOpen(false);
              }}
            >
              <Image
                className="h-8"
                alt="NextUI hero Image"
                src={`${userPrepTimeData.streakDays <=0? "/no-streak-sleeping.svg" : "/streak-fire.svg"}`}
                radius="none"
              />
              <span className="font-bold self-center text-orange-400">{userPrepTimeData.streakDays}</span>
            </NavbarItem>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">
              <NavbarItem className=" text-success self-center">
                Status : {userPrepTimeData.status}
              </NavbarItem>
            </DropdownItem>
            <DropdownItem key="new">
              <NavbarItem className=" text-danger self-center">
                {
                getDateDifference(userPrepTimeData.examDate)} days left for exam
              </NavbarItem>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu className="mt-10 flex">
        {menuItems.map((item, index) => {
          return (
            <NavbarMenuItem key={index} className="self-center">
              <div
                onClick={() => router.push(item[1])}
                className={`w-full m-1 text-lg hover:text-warning cursor-pointer ${
                  location === item[1] ? "text-warning" : "text-foreground"
                }`}
                size="lg"
              >
                {item[0]}
              </div>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
