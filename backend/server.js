import express from 'express';
import { connectToPostgreDatabase } from './config/db.config.js';
import router from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import blockchain_router from './routes/blockchain.routes.js';

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cookieParser())

app.use('/api', router);
app.use('/blockchain', blockchain_router)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectToPostgreDatabase()
})