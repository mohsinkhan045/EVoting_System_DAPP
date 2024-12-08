// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract VotingSystem {
    address public owner;
    uint public tokenPrice;
    uint public minimumVotingAge;
    uint public tokens = 10000;

    struct Candidate {
        address candidateAddress;
        string name;
        string description;
        uint voteCount;
    }

    struct Voter {
        bool hasVoted;
        uint age;
        uint tokens;
    }

    Candidate[] public candidates;
    mapping(address => bool) public isCandidate;
    mapping(address => Voter) public voters;
    mapping(address => bool) public hasBoughtToken;

    event CandidateAdded(address candidateAddress, string name);
    event Voted(address voter, address candidate);

    constructor(uint _tokenPrice, uint _minimumVotingAge) {
        owner = msg.sender;
        tokenPrice = _tokenPrice;
        minimumVotingAge = _minimumVotingAge;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot perform this action");
        _;
    }

    modifier notcandidate(){
        require(!isCandidate[msg.sender],"Candidate cannot buy token");
        _;
    }

    function addCandidate(string memory _name, string memory _description) public notOwner {
        require(!isCandidate[msg.sender], "You are already a candidate.");
        require(!hasBoughtToken[msg.sender], "You cannot become a candidate after buying tokens.");
        candidates.push(Candidate(msg.sender, _name, _description, 0));
        isCandidate[msg.sender] = true;
        console.log("**Add candidate is: %s**",isCandidate[msg.sender]);
        emit CandidateAdded(msg.sender, _name);
    }

    function buyTokens() public payable notOwner notcandidate{
        console.log("**The tokens are: %s**",tokens);
        require(msg.value == tokenPrice, "Invalid token purchase amount.");
        require(!hasBoughtToken[msg.sender], "You can only buy one token.");
        require(tokens > 0, "Tokens are not more left");
        payable(owner).transfer(msg.value);
        voters[msg.sender].tokens = 1;
        hasBoughtToken[msg.sender] = true;
        tokens--;
        console.log("**Voter buy this token: %s**",hasBoughtToken[msg.sender]);
    }

    function vote(address _candidateAddress) public notOwner {
        console.log("**The candidate address is: %s**",_candidateAddress);
        require(isCandidate[_candidateAddress], "Invalid candidate address.");
        require(voters[msg.sender].age >= minimumVotingAge, "You must be above the minimum voting age.");
        require(!voters[msg.sender].hasVoted, "You have already voted.");
        require(voters[msg.sender].tokens > 0, "Insufficient tokens.");

        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].candidateAddress == _candidateAddress) {
                candidates[i].voteCount++;
                voters[msg.sender].hasVoted = true;
                voters[msg.sender].tokens--;
                console.log("**Voter vote: %s**",voters[msg.sender].hasVoted);
                emit Voted(msg.sender, _candidateAddress);
                break;
            }
        }
    }

    function setVoterAge(uint _age) public notOwner{
        voters[msg.sender].age = _age;
        console.log("**The voter age is: %s**",voters[msg.sender].age);
    }

    function Candidates() public view returns(Candidate[] memory){
        return candidates;
    }
}