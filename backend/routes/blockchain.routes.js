import express from 'express';
import { addBlock, getBlockchain, mine, validateBlock } from '../controllers/blockchain.controllers.js';

const blockchain_router = express.Router();

blockchain_router.get('/', getBlockchain);
blockchain_router.post('/block', addBlock);
blockchain_router.post('/mine', mine);
blockchain_router.get('/validate', validateBlock);

export default blockchain_router;