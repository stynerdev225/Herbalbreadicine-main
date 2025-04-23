import express from 'express';
import { contactHandler } from './api/contact';

const app = express();
app.use(express.json());

app.post('/api/contact', contactHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
