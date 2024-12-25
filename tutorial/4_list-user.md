# ユーザーの一覧

API を介してユーザーの一覧を取得する。

## ユーザーの一覧を取得するエンドポイント

`GET /users` エンドポイントを作成する。

`./src/app.js` に次のコードを追加する。

```js
app.get('/users', (req, res) => {
  res.json([]);
});
```

### curl で確認

次のコマンドでリクエストを送る。

```sh
% curl localhost:3000/users
[]
```

`[]` が返ってくれば成功。


## データベースから取得

データベースからユーザーを取得する。

`./src/app.js` に次のコードを追加する。

```js
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  const items = []
  for (const user of users) {
    items.push({
      id: user.id,
      name: user.name
    });
  }
  res.json(items);
});
```

- [Simple SELECT queries](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries)

### curl で確認

次のコマンドでリクエストを送る。

```sh
% curl -X POST -H "Content-Type: application/json" -d '{"id": "1", "name": "Alice"}' localhost:3000/users
% curl -X POST -H "Content-Type: application/json" -d '{"id": "2", "name": "Bob"}' localhost:3000/users
% curl -X POST -H "Content-Type: application/json" -d '{"id": "3", "name": "Charlie"}' localhost:3000/users
% curl localhost:3000/users
[{"id":"1","name":"Alice"},{"id":"2","name":"Bob"},{"id":"3","name":"Charlie"}]
```

作成したユーザーのデータが返ってくる。
