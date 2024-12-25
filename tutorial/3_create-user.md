# ユーザーの作成

APIを介してユーザーを作成する。

## JSON のパース

リクエストボディを JSON としてパースするために、`express.json()` ミドルウェアを使う。

`./src/app.js`　に次のコードを追加する。

```js
app.use(express.json());
```

このコードを追加することでリクエストボディを JSON としてパースできる。

## ユーザーを作成するエンドポイント

`POST /users` エンドポイントを作成する。

`./src/app.js` に次のコードを追加する。

```js
app.post('/users', (req, res) => {
  const { name } = req.body;
  res.json({ name });
});
```

このコードを追加することで、`POST /users` にリクエストを送ると、リクエストボディの `name` パラメータを返すようになる。

## curl で確認

次のコマンドでリクエストを送る。

```sh
% curl -X POST -H "Content-Type: application/json" -d '{"name": "Alice"}' localhost:3000/users
{"name":"Alice"}
```

`{"name":"Alice"}` が返ってくれば成功。

- `-X POST`: POST メソッドでリクエストを送る
- `-H "Content-Type: application/json"`: リクエストヘッダに `Content-Type: application/json` を追加
- `-d '{"name": "Alice"}'`: リクエストボディに `{"name": "Alice"}` を追加
- [JSON](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON)

## データベースへの書き込み

ユーザーをデータベースに書き込む。

`./src/app.js` に次のコードを追加する。

User モデルのインポート方法を変更
```js
const User = require('./models/User');
```

`POST /users` エンドポイントを次のように変更する。
```js
app.post('/users', async (req, res) => {
  const { id, name } = req.body;
  const user = await User.create({ id, name })
  res.json({
    id: user.id,
    name: user.name
  });
});
```

- `async (req, res)`: 非同期処理を行えるようにする
- `await User.create({ id, name })`: ユーザーをデータベースに書き込む
- `res.json({ id: user.id, name: user.name })`: レスポンスにユーザーの情報を返す
- [A very useful shortcut: the create method](https://sequelize.org/docs/v6/core-concepts/model-instances/#a-very-useful-shortcut-the-create-method)

## curl で確認

次のコマンドでリクエストを送る。

```sh
% curl -X POST -H "Content-Type: application/json" -d '{"id": 1, "name": "Alice"}' localhost:3000/users
{"id":1,"name":"Alice"}
```

`{"id":1,"name":"Alice"}` が返ってくれば成功。

## SQLite3 の確認

SQLite3 でデータベースにユーザーが書き込まれていることを確認する。

```sh
% sqlite3 ./data/database.sqlite
SQLite version 3.42.0 2023-05-16 12:36:15
Enter ".help" for usage hints.
sqlite> SELECT id, name FROM Users;
1|Alice
```

`1|Alice` が表示されれば成功。データベースに書き込まれていることがわかる。
