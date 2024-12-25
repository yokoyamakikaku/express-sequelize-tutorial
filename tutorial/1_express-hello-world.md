# Express.js の Hello World

## Express.js のインストール

```
% npm install express
```

## Hello World

`src/app.js` ファイルを作成し、次のコードを記述する。

```js
const express = require('express');
const port = 3000

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
```

## 実行

```
% node src/app.js
```

### package.json の修正

`package.json` の `scripts` に次のコードを追加する。

```json
{
  "scripts": {
    "start": "node src/app.js"
  }
}
```

`npm start` でアプリケーションを起動できる。

## curl で確認

次のコマンドでリクエストを送る。`Hello World!` が返ってくれば成功。

```
% curl localhost:3000
Hello World!
```
