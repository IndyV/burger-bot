import { Router } from 'express';

const webhook = Router();

webhook.get('/', async (req, res) => {
  res.send('It\'s burger time baby');
});

webhook.post('/', (req, res) => {
  const authors = req.body.commits.map((commit: any) => commit.author.name);

  console.log("Commit ammount:", req.body.commits.length);
  console.log("Authors:", ...authors);
  console.log(`${req.body.head_commit.author.name} commited ${req.body.head_commit.message}`);

  res.sendStatus(204);
});

export { webhook };
