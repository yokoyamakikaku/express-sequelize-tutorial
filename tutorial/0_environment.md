# Web API のチュートリアル

このチュートリアルは Web API を作成する。

次のライブラリを使う。

- [Express.js](https://expressjs.com/ja/)
- [Sequelize](https://sequelize.org/)

# 環境構築

## Node.js

Node.js と npm がインストールされていることを前提とする。

```
% node -v
v20.11.1
% npm -v
10.2.4
```

## SQLite3

データベースには SQLite3 を使う。

```
% sqlite3 --version
3.42.0 ...
```

## curl

APIのデバッグのために curl コマンドを使う。

```
% curl --version
curl 8.7.1 ...
```

# チュートリアルの進め方

このリポジトリに含まれるソースコードは最終的な成果物である。

チュートリアルの手順はこのファイルに記載する。

# プロジェクトの初期化

Node.js のプロジェクトを初期化する。
ディレクトリを作成し、npm init コマンドを実行する。

```
% mkdir web-api-tutorial
% cd web-api-tutorial
% npm init -y
```

