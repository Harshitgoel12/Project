import { FaFacebook, FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";

function Footer() {
  return (
    <div className="mt-2 w-full mb-4">
      <hr className="mb-4 border-gray-300" />
      <div className="sm:flex sm:justify-between items-center w-full ms-8">
        <div>
          <h1 className="font-bold text-xl mt-4  text-center me-8">Job Hunt</h1>
          <p className="text-sm sm:mb-0 mb-4 text-center">© 2024 Your Company. All rights reserved.</p>
        </div>

        <div className="flex gap-4 text-xl  sm:me-28 justify-center ">
          <FaFacebook className="text-3xl" />
          <FaTwitter className="text-3xl"/>
          <IoLogoInstagram className="text-3xl"/>
        </div>
      </div>
    </div>
  );
}

export default Footer;

