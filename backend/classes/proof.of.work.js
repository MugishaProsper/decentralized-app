class ProofOfWork {
  static mineBlock(block, difficulty = 4){
    let nonce = 0;
    let hash = block.hash;

    while (hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
      nonce += 1;
      block.timestamp = Date.now();
      block.hash = block.calculateHash(nonce);
      hash = block.hash;
    };

    console.log(`Block mined : ${block.hash}`)
    return block
  }
}

export default ProofOfWork;