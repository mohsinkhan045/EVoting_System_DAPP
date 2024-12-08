const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VotingSystem", function () {
  let VotingSystem;
  let votingSystem;
  let owner;
  let candidate1;
  let candidate2;
  let voter1;
  let voter2;

  const tokenPrice = 10000;
  const minimumVotingAge = 19;

  beforeEach(async function () {
    [owner, candidate1, candidate2, voter1, voter2] = await ethers.getSigners();

    VotingSystem = await ethers.getContractFactory("VotingSystem");
    votingSystem = await VotingSystem.deploy(10000, minimumVotingAge);
    await votingSystem.deployed();
  });

  it("Should deploy with the correct owner and settings", async function () {
    expect(await votingSystem.owner()).to.equal(owner.address);
    expect(await votingSystem.tokenPrice()).to.equal(tokenPrice);
    expect(await votingSystem.minimumVotingAge()).to.equal(minimumVotingAge);
    tokens = await votingSystem.tokens();
    expect(tokens).to.equal(tokens);
  });

  it("Should allow candidates to add themselves", async function () {
    await votingSystem.connect(candidate1).addCandidate("Afrooz", "AZ");
    expect(await votingSystem.isCandidate(candidate1.address)).to.be.true;
  });

  it("Should allow voters to buy tokens", async function () {
    await votingSystem.connect(voter1).buyTokens({ value: tokenPrice });
    expect(await votingSystem.hasBoughtToken(voter1.address)).to.be.true;
  });

  it("Should allow voters to vote", async function () {
    await votingSystem.connect(candidate1).addCandidate("Afrooz", "AZ");
    await votingSystem.connect(voter1).buyTokens({ value: tokenPrice });

    await votingSystem.connect(voter1).setVoterAge(19);
    await votingSystem.connect(voter1).vote(candidate1.address);
    expect((await votingSystem.candidates(0)).voteCount).to.equal(1);
  });

  it("Should not allow owner to buy tokens", async function () {
    await expect(
      votingSystem.connect(owner).buyTokens({ value: tokenPrice })
    ).to.be.revertedWith("Owner cannot perform this action");
  });

  it("should not allow candidate to buy tokens", async function () {
    await votingSystem.connect(candidate2).addCandidate("Afrooz", "AZ");
    expect(await votingSystem.isCandidate(candidate2.address)).to.be.true;
    await expect(
      votingSystem.connect(candidate2).buyTokens({ value: tokenPrice })
    ).to.be.revertedWith("Candidate cannot buy token");
  });

  it("Should not allow voters to become candidates after buying tokens", async function () {
    await votingSystem.connect(voter2).buyTokens({ value: tokenPrice });
    await expect(
      votingSystem.connect(voter2).addCandidate("Afrooz", "AZ")
    ).to.be.revertedWith("You cannot become a candidate after buying tokens.");
  });

  it("should emit CandidateAdded event when a candidate is added", async function () {
    const candidateName = "Afrooz";
    const candidateDescription = "AF";

    const tx = await votingSystem
      .connect(candidate1)
      .addCandidate(candidateName, candidateDescription);
    await expect(tx)
      .to.emit(votingSystem, "CandidateAdded")
      .withArgs(candidate1.address, candidateName);
  });

  it("should emit CandidateAdded event when a candidate is added", async function () {
    const tx = await votingSystem
      .connect(candidate1)
      .addCandidate("Afrooz", "AZ");
    await votingSystem.connect(voter1).buyTokens({ value: tokenPrice });

    await votingSystem.connect(voter1).setVoterAge(19);
    await votingSystem.connect(voter1).vote(candidate1.address);
    expect((await votingSystem.candidates(0)).voteCount).to.equal(1);

    await expect(tx)
      .to.emit(votingSystem, "CandidateAdded")
      .withArgs(candidate1.address, "Afrooz");
  });

  it("should emit Voted event when a voter casts a vote", async function () {
    await votingSystem.connect(candidate1).addCandidate("Afrooz", "AZ");
    await votingSystem.connect(voter1).buyTokens({ value: tokenPrice });

    await votingSystem.connect(voter1).setVoterAge(19);
    const tx = await votingSystem.connect(voter1).vote(candidate1.address);

    await expect(tx)
      .to.emit(votingSystem, "Voted")
      .withArgs(voter1.address, candidate1.address);
  });

  it("should tokens testing", async function () {
    let tokens = await votingSystem.tokens();
    expect(tokens).to.equal(tokens);
    await votingSystem.connect(voter1).buyTokens({ value: tokenPrice });
    expect(await votingSystem.hasBoughtToken(voter1.address)).to.be.true;
  });
});
