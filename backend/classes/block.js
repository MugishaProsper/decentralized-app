import crypto from 'crypto'
class Block {
  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

    calculateHash(){
      const { index, timestamp, data, previousHash } = this;
      return crypto.createHash('sha256').update(index + timestamp + JSON.stringify(data) + previousHash).digest('hex')
    }
}

export default Block;