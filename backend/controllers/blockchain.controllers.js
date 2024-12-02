import Blockchain from '../classes/blockchain.js';
import Block from '../classes/block.js';
import ProofOfWork from '../classes/proof.of.work.js'

const myBlockchain = new Blockchain();

export const getBlockchain = async (req, res) => {
  try {
    return res.status(200).json({ chain : myBlockchain.chain })
  } catch (error) {
    return res.status(500).json({ message : 'server error'})
  }
};

export const addBlock = async (req, res) => {
  const { data } = req.body;

  try {
    if(!data){
      return res.status(403).json({ message : 'Data is required' })
    }
    const newBlock = new Block(myBlockchain.chain.length, Date.now(), data, myBlockchain.getLatestBlock().hash);

    myBlockchain.addBlock(newBlock);

    return res.status(200).json({ message : 'block added', block : newBlock })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
};

export const mine = async (req, res) => {
  const { data } = req.body;
  try {
    if(!data){
      return res.status(404).json({ message : 'Data is required to mine' })
    }
    const newBlock = new Block(myBlockchain.chain.length, Date.now(), data, myBlockchain.getLatestBlock().hash);

    ProofOfWork.mineBlock(newBlock);
    myBlockchain.addBlock(newBlock);

    return res.status(200).json({ message : "block mined successfully", block : newBlock })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : 'server error' })
  }
}

export const validateBlock = async (req, res) => {
  try {
    const isValid = myBlockchain.isChainValid();

    if(!isValid){
      return res.status(400).json({ message : 'block is invalid' })
    };

    return res.status(200).json({ message : 'blockchain is valid' })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : 'Server error' });
  }
}