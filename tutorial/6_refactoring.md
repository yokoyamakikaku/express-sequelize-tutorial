# リファクタリング

## ルーティング

### RootRouter

ルーティングを別ファイルにかき分ける

`./src/routes/root.js` に以下を記述する。

```js
const express = require('express');
const { getHealth } = require('../usecases/health');

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!'
  });
});

module.exports = rootRouter;
```

`./src/app.js` に以下を記述する
```js
app.use('/', require('./routers/root'));
```

### UsersRouter

`./src/routes/users.js` に以下を記述する。

```js
const express = require('express');
const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => { /* ... */ });
usersRouter.get('/', async (req, res) => { /* ... */ });
usersRouter.get('/:id', async (req, res) => { /* ... */ });
usersRouter.put('/:id', async (req, res) => { /* ... */ });
usersRouter.delete('/:id', async (req, res) => { /* ... */ });
```

`./src/app.js` に以下を記述する
```js
app.use('/users', require('./routers/users'));
```


- `./src/app.js` で `/users` と指定する
- `./src/routes/users.js` では `/users` の以下を指定する

## ユースケース

`./src/usecases` 内に処理を取り出してルーティングとの関心事を分離する。

## エラーハンドリング

- `./src/errors` 内にエラーを定義する
- 各処理の中でエラーがあれば定義したエラーを返す
- `./src/middlewares/errorHandler.js` 内でエラーハンドリングを行う
