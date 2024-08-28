/* eslint-disable no-unused-vars */
import express from 'express';
import { exec } from 'child_process'; 
import cors from 'cors';

const app = express();
const port = 5000;

// Tambahkan middleware CORS
app.use(cors());

app.get('/api/packages', (req, res) => {
  exec('apt list --installed', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const packages = stdout.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const parts = line.split(/\s+/);
        return { name: parts[0], version: parts[1] };
      });
    res.json({ packages });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
