import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

interface Item {
  id: number;
  name: string;
  price: number;
  inventory: number;
}

const Index = () => {
  const buy = (id: number) => {
    // I Google how to POST with fetch as I totally forgot that we have a body field
    fetch('http://localhost:8000/buy', {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(async (response) => console.log(await response.json()))
      .catch((error) => console.log({ error }));
  };

  const [items, setItems] = useState<[] | Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch('http://localhost:8000/items');
      const data = await res.json();
      console.log({ data });
      setItems(data);
    };

    fetchItems();
  }, []);

  return (
    <main className={styles.main}>
      <h1>Create, Inc. Store</h1>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <p>
                {item.name} {`| Quantity: ${item.inventory}`}{' '}
                {`| Price: ${item.price}`}
              </p>
              <button
                onClick={() => {
                  buy(item.id);
                }}
              >
                Buy
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Index;
