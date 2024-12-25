# Sequelize の導入

## Sequelize のインストール

Sequlize と SQLite3 をインストールする。

```
% npm install sequelize sqlite3
```

## Sequelize の設定

`src/services/sequelize.js` ファイルを作成し、次のコードを記述する。

- `storage` は SQLite3 のデータベースファイルのパスを指定する。

```js
const path = require('path');
const { Sequelize } = require('sequelize');

const storage = path.resolve(__dirname, '../../data/database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storage,
});

module.exports = sequelize;
```

## モデルの定義

`src/models/user.js` ファイルを作成し、次のコードを記述する。

```js
const { DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = User
```

- [Model Basics](https://sequelize.org/docs/v6/core-concepts/model-basics/)

## 起動時にデータベースを同期

`src/app.js` に次のコードを追加する。

定義したモデルを読み込む。
```js
require('./models/user');
```

データベースの同期を行う。
```js
sequelize.sync({ force: true }).then(() => {
  console.log('データベースの同期が完了しました');
});
```

- `{ force: true }` は起動時に毎回テーブルを作り直すオプション。

## 実行

`npm start` でアプリケーションを起動する。

```
% npm start

> tutorial@1.0.0 start
> node src/app.js

Listening at http://localhost:3000
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): PRAGMA foreign_keys = OFF
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): PRAGMA foreign_keys = ON
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` VARCHAR(255) PRIMARY KEY, `name` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`Users`)
Executing (default): PRAGMA INDEX_INFO(`sqlite_autoindex_Users_1`)
データベースの同期が完了しました
```

## SQLite3 の確認

SQLite3 でデータベースを確認する。

SQLite3 を起動する。
```sh
% sqlite3 data/database.sqlite
```

データベースのテーブルを確認する。
```sh
sqlite> .tables
Users
```

Users テーブルができていることを確認する。
