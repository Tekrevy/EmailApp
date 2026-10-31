import Image from "next/image";
import UserButton from "./UserButton";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-2 md:p-4 ">
      <div className="flex items-center gap-4 flex-1">
       
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
