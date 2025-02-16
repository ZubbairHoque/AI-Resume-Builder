import { UserButton } from "@clerk/clerk-react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo / Title */}
      <Image src={"/logo.svg"} alt="" width={40} height={40} />
      <h1 className="text-2xl font-bold text-blue-600">AI Resume Builder</h1>
      
      {/* User Profile Button */}
      <UserButton/>
    </header>
  );
};

export default Header;
