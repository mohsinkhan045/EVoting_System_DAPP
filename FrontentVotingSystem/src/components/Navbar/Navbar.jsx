import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { ethers } from "ethers";

const Navbar = () => {
  const connectToMetaMask = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        await ethereum.request({
          method: "eth_requestAccounts",
        });
        const connectedProvider = new ethers.providers.Web3Provider(ethereum);
        setProvider(connectedProvider);

        alert("MetaMask connected successfully.");
      } else {
        alert(
          "MetaMask is not installed. Please install MetaMask to use this feature."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header class="text-white bg-green-400 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <img
            className="w-14 h-14 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl1CQnqlzXCxnUQQmmCFqoAZEOJ66Xzu2kxA&usqp=CAU"
            alt="Grapefruit slice atop a pile of other slices"
          />

          <span class="ml-3 text-xl">Voting System</span>
        </a>
        <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink
            activeClassName="font-semibold text-green-600 "
            exact
            to="/"
            className="hover:scale-110 duration-300 mr-5 hover:text-green-600 hover:font-bold"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            activeClassName="font-semibold text-green-600"
            className="hover:scale-110 duration-300  mr-5 hover:text-green-600 hover:font-bold"
          >
            About
          </NavLink>
          <NavLink
            activeClassName="font-semibold text-green-600 "
            to="/footer"
            className="hover:scale-110 duration-700 mr-5 hover:text-green-600 hover:font-bold"
          >
            Contact us
          </NavLink>
        </nav>
        <button
          onClick={connectToMetaMask}
          class="hover:scale-110 duration-700 inline-flex items-center bg-green-500  text-white border-0 py-1 px-3 focus:outline-none hover:bg-green-600 rounded text-base mt-4 md:mt-0"
        >
          Login/SignUp
        </button>
      </div>
    </header>
  );
};

export default Navbar;
