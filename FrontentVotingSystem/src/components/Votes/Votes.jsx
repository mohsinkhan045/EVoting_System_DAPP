import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../../contracts/VotingSystem.json";
import img from "./voterimg.png";
import imgs from "./tokenimg.png";

function Voters() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [memos, setMemos] = useState([]);
  const [voterAge, setVoterAge] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const contract = state.contract;

  const connectWallet = async () => {
    const contractAddress = "0x7793183712660eeB5510756AcAfcD6C9f75B4D68";
    const contractABI = abi.abi;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    setState({ provider, signer, contract });
  };

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.Candidates();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);

  const buyVote = async (event) => {
    event.preventDefault();
    alert(contract);
    const amount = { value: 10000 };
    const transaction = await contract.buyTokens(amount);
    await transaction;
    alert("Transaction is done");
  };

  const handleSetVoterAge = async () => {
    if (state.contract && voterAge) {
      try {
        const ages = await state.contract.setVoterAge(voterAge);
        await ages;
        alert("Voter age set successfully to: " + voterAge);
      } catch (error) {
        alert("Error setting voter age: " + error);
      }
    } else {
      alert("Invalid input or contract not loaded.");
    }
  };

  const handleVote = async () => {
    if (!voterAge) {
      setValidationMessage("Please set your age before voting.");
      return;
    }

    if (state.contract && selectedCandidate) {
      try {
        const votes = await state.contract.vote(selectedCandidate);
        await votes;
        alert("Voted successfully for candidate: " + selectedCandidate);
      } catch (error) {
        alert("Error voting: " + error);
      }
    } else {
      alert("Invalid input or contract not loaded.");
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-500">
              Votes
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Please enter the age first and then you can vote for your favorite
              owner and buy tokens first. Thanks
            </p>
          </div>
          <br />
          <div className="p-2 w-full">
            <div className="sm:text-3xl text-2xl items-center font-medium title-font mb-4 text-red-500 flex flex-col text-center w-full">
              <div className="left-96 space-x-72">
                <h1 className=" flex">
                  <img
                    className="w-12 h12 items-center"
                    src={imgs}
                    alt="tokenimg"
                  />
                  EVotingToken
                </h1>
              </div>
              <br />
              <h1>EVT</h1>
              <br />
              <button
                onClick={buyVote}
                className="hover:scale-110 duration-700 flex mx-auto text-white bg-red-500 hover:bg-red-600 border-0 py-2 px-8 focus:outline-none rounded text-lg"
              >
                Buy Token
              </button>
            </div>
          </div>
          <br />
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="relative">
              <label htmlFor="age" className="leading-7 text-sm text-gray-600">
                Age
              </label>
              <input
                type="number"
                value={voterAge}
                onChange={(e) => setVoterAge(e.target.value)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <div className="p-2 w-full">
                <button
                  onClick={handleSetVoterAge}
                  className="hover:scale-110 duration-700 flex mx-auto text-white bg-green-500 hover:bg-green-600 border-0 py-2 px-8 focus:outline-none rounded text-lg"
                >
                  Submit
                </button>
              </div>
              <label
                htmlFor="selectCandidate"
                className="leading-7 text-sm text-gray-600"
              >
                Select a Candidate
              </label>
              <select
                id="selectCandidate"
                value={selectedCandidate}
                onChange={(e) => setSelectedCandidate(e.target.value)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 place-content-center leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="" disabled>
                  Select candidate description
                </option>
                {memos.map((memo) => (
                  <option
                    key={memo.candidateAddress}
                    value={memo.candidateAddress}
                  >
                    {memo.description}
                  </option>
                ))}
              </select>
              <div className="p-2 w-full">
                <button
                  onClick={handleVote}
                  className="hover:scale-110 duration-700 flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                >
                  <div className="flex items-center">
                    <img src={img} alt="vote" className="w-12 h-12" />
                    Vote
                  </div>
                </button>
              </div>
              <p>{validationMessage}</p>
            </div>
          </div>
        </div>
        <p style={{ textAlign: "center", marginTop: "20px" }}>Candidates</p>
        {memos.map((memo) => (
          <div
            className="container-fluid"
            style={{ width: "100%" }}
            key={Math.random()}
          >
            <table style={{ marginBottom: "10px" }}>
              <tbody>
                <tr>
                  <td
                    className="bg-green-500"
                    style={{
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "100px",
                    }}
                  >
                    {memo.name}
                  </td>
                  <td
                    className="bg-green-400"
                    style={{
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "800px",
                    }}
                  >
                    {memo.voteCount.toString()}
                  </td>
                  <td
                    className="bg-green-400"
                    style={{
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                    }}
                  >
                    {memo.description}
                  </td>
                  <td
                    className="bg-green-400"
                    style={{
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "400px",
                    }}
                  >
                    {memo.candidateAddress}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </>
  );
}

export default Voters;
