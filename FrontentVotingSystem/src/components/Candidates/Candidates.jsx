import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../../contracts/VotingSystem.json";
import img from "./candidateimg.png";

function Candidate() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [candidateName, setCandidateName] = useState("");
  const [candidateDescription, setCandidateDescription] = useState("");
  const [memos, setMemos] = useState([]);

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

  const buyVote = async (event) => {
    event.preventDefault();
    if (state.contract && candidateName && candidateDescription) {
      try {
        const addcandidate = await state.contract.addCandidate(
          candidateName,
          candidateDescription
        );
        await addcandidate.await();
        alert("Candidate added successfully");
      } catch (error) {
        alert("Error adding candidate: ", error);
      }
    } else {
      alert("Invalid input or contract not loaded.");
    }
  };

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.Candidates();
      setMemos(memos);
    };
    contract && memosMessage();
  }, [contract]);

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-500">
              Candidates
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              First write your name, then write your description and the message
              is optional, you can leave the message if you want. Thanks
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    value={candidateDescription}
                    onChange={(e) => setCandidateDescription(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={buyVote}
                  className=" hover:scale-110 duration-700 flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                >
                  <div className="flex items-center">
                    <img src={img} alt="vote" className="w-12 h-12" />
                    Candidate
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <p
          className="font-extrabold text-green-500"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          Candidates
        </p>
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
        {console.log("Hello world")}
      </section>
    </>
  );
}

export default Candidate;
