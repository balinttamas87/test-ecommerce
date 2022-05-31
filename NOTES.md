1.  I realised instead of a query param I can send the data in body (It just clicked that this is how I used to do it at previous companies). Now, at the British Council we use Apollo client as we use GraphQL.

2.  I had the following error:

`Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0`

After like 15-20 minutes I realised I need to update the route handler in express to post.

```js
app.post('/buy', ...
```

Huh...

3. I could finally figure out how to modify the items with reduce. Sorry for my brain functioning slowly.

4. Errors: First time I was handling errors in Express.

5. I thought about disabling the buy button on the front-end for items that are more expensive than the user's current balance. However, I realised the task asks for the back-end throwing errors instead.

6. I displayed the quantity on the UI even though the task only asked for product name and price. Hope it's okay.

7. After a manual test I realised I need to return after each error to make sure the balance and items do not get altered if there is an error (insufficient funds / out of stock).
