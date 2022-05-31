import express from 'express';
import bodyParser from 'body-parser';
import { initialBalance, initialItems } from './data';
import { Item } from './data';
import cors from 'cors';

let items = initialItems;
let balance = initialBalance;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.send('ok');
});

app.get('/items', async (req, res) => {
  // const data = req.body;
  res.send(items);
});

app.get('/balance', async (req, res) => {
  // const data = req.body;
  res.send(balance);
});

app.post('/buy', async (req, res) => {
  // identify the item by id
  const itemId = Number(req.body.id);

  const item = items.filter((item) => item.id === itemId)[0];

  if (item.price > balance) {
    // throw new Error('Insufficient funds');
    // I was not sure whether we want to throw an error as the README describes or do the following
    res.status(400).send({ error: 'Insufficient funds' });
    return;
  }

  if (item.inventory === 0) {
    // throw new Error('Out of stock');
    // I was not sure whether we want to throw an error as the README describes or do the following
    res.status(400).send({ error: 'Out of stock' });
    return;
  }

  // decrement balance by item price
  balance = balance - item.price;

  // decrement inventory of the item by 1 and return updated items list
  const newItems = items.reduce((acc: [] | Item[], currentItem: Item) => {
    const newItem = currentItem;
    if (newItem.id === itemId) {
      newItem.inventory = newItem.inventory - 1;
    }
    return [...acc, newItem];
  }, []);

  items = newItems;
  console.log({ balance });
  console.log({ items });
  res.send({ items, balance });
});

app.listen(8000, () => {
  console.log('🚀 Server started 🚀');
});

// more routes to implement here
