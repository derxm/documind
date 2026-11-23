import 'dotenv/config';
import app from './app.js';
import { env } from './config/env.js';

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`[DocuMind AI] Server running on port ${PORT} in ${env.NODE_ENV} mode`);
});
