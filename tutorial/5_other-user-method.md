# その他のユーザーの操作

## ユーザーの取得

ユーザーを単一で取得するエンドポイントを作成する。

`GET /users/:id` エンドポイントを作成する。

```js
app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user === null) {
    res.status(404).json({ message: 'Not Found' });
    return
  }

  res.json({
    id: user.id,
    name: user.name
  });
});
```

- `'/users/:id'` URL パラメータを受け取る。
- `User.findByPk(req.params.id)` データベースからユーザーを取得する。プライマリーキーを使っている。
- `if (user === null)` ユーザーが見つからない場合は `404 Not Found` を返す。
- [findByPk](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findbypk)

### curl で確認

次のコマンドでリクエストを送る。

```sh
% curl -X POST -H "Content-Type: application/json" -d '{"id": "1", "name": "Alice"}' localhost:3000/users
tutorial % curl localhost:3000/users/1
{"id":"1","name":"Alice"}
```

## ユーザーの更新

ユーザーを更新するエンドポイントを作成する。

`PUT /users/:id` エンドポイントを作成する。

```js
app.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user === null) {
    res.status(404).json({ message: 'Not Found' });
    return
  }

  user.name = req.body.name;
  await user.save();

  res.json({
    id: user.id,
    name: user.name
  });
});
```

- `'/users/:id'` URL パラメータを受け取る。
- `User.findByPk(req.params.id)` データベースからユーザーを取得する。プライマリーキーを使っている。
- `if (user === null)` ユーザーが見つからない場合は `404 Not Found` を返す。
- `user.name = req.body.name` リクエストボディの `name` プロパティをユーザーの名前に設定する。
- `await user.save()` ユーザーをデータベースに保存する。

### curl で確認

変更前のユーザーを作成する。
```sh
% curl -X POST -H "Content-Type: application/json" -d '{"id": "1", "name": "Alice"}' localhost:3000/users
{"id":"1","name":"Alice"}
```

変更後に確認する
```sh
% curl -X PUT -H "Content-Type: application/json" -d '{"name": "Bob"}' localhost:3000/users/1
{"id":"1","name":"Bob"}
```


## ユーザーの削除

ユーザーを削除するエンドポイントを作成する。

`DELETE /users/:id` エンドポイントを作成する。

```js
app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user === null) {
    res.status(404).json({ message: 'Not Found' });
    return
  }

  await user.destroy();

  res.json({
    id: user.id,
    name: user.name
  });
});
```

- `'/users/:id'` URL パラメータを受け取る。
- `User.findByPk(req.params.id)` データベースからユーザーを取得する。プライマリーキーを使っている。
- `if (user === null)` ユーザーが見つからない場合は `404 Not Found` を返す。
- `await user.destroy()` ユーザーをデータベースから削除する。

### curl で確認

削除するユーザーを作成する。
```sh
% curl -X POST -H "Content-Type: application/json" -d '{"id": "1", "name": "Alice"}' localhost:3000/users
```

削除とデータが取得できないことを確認する。
```sh
% curl -X DELETE localhost:3000/users/1
% curl localhost:3000/users/1
{"message":"Not Found"}
````
