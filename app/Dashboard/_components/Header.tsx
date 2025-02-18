import { UserButton } from "@clerk/clerk-react";
import Image from "next/image";

const Header = () => {
  return (
    <div className="p-5 shadow-lg bg-white rounded-md border-b-4 border-black flex justify-between items-center">
      {/* Left side: Logo and Title */}
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        <h1 className="text-2xl font-bold text-greys">AI Resume Builder</h1>
      </div>

      {/* Right side: User Profile Button */}
      <UserButton />
    </div>
  );
};

export default Header;
