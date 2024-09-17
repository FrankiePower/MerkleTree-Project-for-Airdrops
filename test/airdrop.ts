import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import hre from "hardhat";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

describe("MerkleTreeAirdropContract", function () {
  // Define loadFixture
  async function deployTokenFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("SuperFranky");
    const token = await Token.deploy();
    return { token, owner, otherAccount };
  }

  async function deployAirdropFixture() {
    const { token, owner } = await loadFixture(deployTokenFixture);
    const merkleTree =
      "0x68aa68b3f47084bdfd034139c7404c69ab798f912e6f49005a0c2c7e517fb897";
    const Airdrop = await ethers.getContractFactory("Airdrop");
    const airdrop = await Airdrop.deploy(token, merkleTree); // Ensure token.address is used
    return { airdrop, owner, token, merkleTree };
  }

  describe("Deployment", function () {
    it("Should check if owner is correct", async function () {
      const { airdrop, owner } = await loadFixture(deployAirdropFixture);
      expect(await airdrop.owner()).to.equal(owner); // Compare with owner.address
    });
  });
});
