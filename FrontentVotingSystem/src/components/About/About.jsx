import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../../contracts/VotingSystem.json";
import img from "./tokenimg.png";
function App() {
  const [owner, setOwner] = useState(
    "0x00000000000000000000000000000000000000"
  );
  const [tokenPrice, setTokenPrice] = useState(0);
  const [minimumVotingAge, setMinimumVotingAge] = useState(0);
  const [tokensRemaining, setTokensRemaining] = useState(0);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x7793183712660eeB5510756AcAfcD6C9f75B4D68";
      const contractABI = abi.abi;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const owner = await contract.owner();
      const tokenPrice = await contract.tokenPrice();
      const TP = String(tokenPrice);
      const minimumVotingAge = await contract.minimumVotingAge();
      const MVA = String(minimumVotingAge);
      const tokensRemaining = await contract.tokens();
      const TR = String(tokensRemaining);

      setOwner(owner);
      setTokenPrice(TP);
      setMinimumVotingAge(MVA);
      setTokensRemaining(TR);
    };
    connectWallet();
  }, []);

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-500">
              About Voting System
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              You can find owner address, token value, minimum age and remaining
              tokens here.
            </p>
          </div>
          <div className="p-2 w-full">
            <div className="sm:text-3xl text-2xl font-medium items-center title-font mb-4 text-red-500 flex flex-col text-center w-full">
              <div className="left-96 space-x-72">
                <h1 className=" flex">
                  <img
                    className="w-12 h12 items-center"
                    src={img}
                    alt="tokenimg"
                  />
                  EVotingToken
                </h1>
              </div>
              <br />
              <h1>EVT</h1>
            </div>
          </div>
          <br />
          <br />
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-1 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-0.1 py-6 rounded-lg">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  Owner Address
                </h2>
                <p className="leading-relaxed">{owner}</p>
              </div>
            </div>
            <br />
            <br />
            <div className="p-1 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  Token Price
                </h2>
                <p className="leading-relaxed">{tokenPrice} wei</p>
              </div>
            </div>
            <br />
            <br />
            <div className="p-1 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  Age is greater than
                </h2>
                <p className="leading-relaxed">{minimumVotingAge}</p>
              </div>
            </div>
            <div className="p-1 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                <h2 className="title-font font-medium text-3xl text-gray-900">
                  Tokens Remaining
                </h2>
                <p className="leading-relaxed">{tokensRemaining}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
