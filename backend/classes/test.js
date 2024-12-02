import Blockchain from "./blockchain.js";
import ProofOfWork from "./proof.of.work.js";

const myBlockchain = new Blockchain();

let newBlock = new Block(1, Date.now(), { amount : 4 });
ProofOfWork.mineBlock(newBlock);
myBlockchain.addBlock(newBlock);

newBlock = new Block(2, Date.now(), { amount : 10 } );
ProofOfWork.mineBlock(newBlock);
myBlockchain.addBlock(newBlock);

console.log('Is blockchain valid? ' + myBlockchain.isChainValid());
console.log('Blockchain : ', myBlockchain.chain)