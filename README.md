![](https://github.com/YoshijiFujiwara/himawari-project/workflows/deploy-client/badge.svg)
![](https://github.com/YoshijiFujiwara/himawari-project/workflows/deploy-node/badge.svg)
![](https://github.com/YoshijiFujiwara/himawari-project/workflows/test-client/badge.svg)
![](https://github.com/YoshijiFujiwara/himawari-project/workflows/test-node/badge.svg)

# ひまわりプロジェクト

## 環境構築

[wiki](https://github.com/YoshijiFujiwara/himawari-project/wiki) で、kubernetes 環境を整えた後、

```
$ skaffold dev
```

で動きます。

## ローカル開発環境

<details>
<summary>skaffoldの場合</summary>

### URL 一覧

|                             | URL                                | 備考                               |
| --------------------------- | ---------------------------------- | ---------------------------------- |
| アプリケーション URL        | https://himawari.dev               |                                    |
| API リファレンス            | https://himawari.dev/swagger/      |                                    |
| API リファレンス(JSON 形式) | https://himawari.dev/swagger-json/ |                                    |
| phpmyadmin                  | https://himawari-phpmyadmin.dev    | username: `root`, password: `root` |

### 基本コマンド

| 種類 | コマンド          | 実行場所 | 効果                                               |
| ---- | ----------------- | -------- | -------------------------------------------------- |
|      | `skaffold dev`    | /        | ローカル開発のサーバーを動かす                     |
|      | `skaffold delete` | /        | ローカル開発のサーバーを消す（失敗することもある） |

### make 系統の重要コマンド:star::star:

| 種類   | コマンド                  | 実行場所 | 効果                                                                                                             |
| ------ | ------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
|        | **`make codegen`**        | /        | **フロントエンド用の API リクエストコードを自動生成する。`/client/openapi`ディレクトリにコードが生成されます。** |
|        | **`make create-secrets`** | /        | **ローカル開発用の環境変数をセットする**                                                                         |
|        | `make delete-secrets`     | /        | ローカル開発用の環境変数を削除する(このあと`make create-secrets`することで上書きできる)                          |
| client | **`make client-setup`**   | /        | **client 系コマンドのセットアップ(npm install するだけ)**                                                        |
| api    | **`make api-setup`**      | /        | **api 系コマンドのセットアップ(npm install するだけ)**                                                           |

### make 系統のその他コマンド:star::star:

| 種類   | コマンド                     | 実行場所 | 効果                                                         |
| ------ | ---------------------------- | -------- | ------------------------------------------------------------ |
| client | `make client-format`         | /        | フロントエンドのコードフォーマット                           |
| 〃     | `make client-lint`           | /        | フロントエンドのコードの文法チェック                         |
| 〃     | `make client-test`           | /        | フロントエンドのテスト                                       |
| 〃     | `make client-test-container` | /        | フロントエンドのテストをコンテナ内部で実行する(基本使わない) |
| api    | `make api-format`            | /        | バックエンドのコードフォーマット                             |
| 〃     | `make api-lint`              | /        | バックエンドのコードの文法チェック                           |
| 〃     | `make api-test`              | /        | バックエンドのテスト                                         |
| 〃     | `make api-test-container`    | /        | バックエンドのテストをコンテナ内部で実行する(基本使わない)   |

実行場所の`/`は、プロジェクトルートディレクトリの意味

</details>

<details>
<summary>docker-composeの場合</summary>

### URL 一覧

**docker-toolboxの人は、localhostのところが`192.168.99.100`のはずです**

|                             | URL                                 | 備考                               |
| --------------------------- | ----------------------------------- | ---------------------------------- |
| アプリケーション URL        | http://localhost:3000               |                                    |
| API リファレンス            | http://localhost:3001/swagger/      |                                    |
| API リファレンス(JSON 形式) | http://localhost:3001/swagger-json/ |                                    |
| phpmyadmin                  | http://localhost:8888               | username: `root`, password: `root` |

### 基本コマンド

| 種類 | コマンド               | 実行場所 | 効果                                             |
| ---- | ---------------------- | -------- | ------------------------------------------------ |
|      | `docker-compose up`    | /        | ローカル開発のサーバーを動かす                   |
|      | `docker-compose up -d` | /        | ローカル開発のサーバーをバックグラウンドで動かす |
|      | `docker-compose down`  | /        | ローカル開発のサーバーを止める                   |

#### client ディレクトリ系

まず、下記のコマンドで client コンテナに入ります

```
$ docker-compose exec client sh
```

そうすると、client コンテナ（仮想環境）の中に ssh で入ってる感じになるので、そこで下記のコマンドを実行できる

| 種類   | コマンド          | 実行場所 | 効果                                 |
| ------ | ----------------- | -------- | ------------------------------------ |
| client | `npm run lintfix` | /        | フロントエンドのコードフォーマット   |
| 〃     | `npm run lint`    | /        | フロントエンドのコードの文法チェック |
| 〃     | `npm run test`    | /        | フロントエンドのテスト               |

#### api ディレクトリ系

まず、下記のコマンドで api コンテナに入ります

```
$ docker-compose exec api sh
```

そうすると、api コンテナ（仮想環境）の中に ssh で入ってる感じになるので、そこで下記のコマンドを実行できる

| 種類 | コマンド         | 実行場所 | 効果                               |
| ---- | ---------------- | -------- | ---------------------------------- |
| api  | `npm run format` | /        | バックエンドのコードフォーマット   |
| 〃   | `npm run lint`   | /        | バックエンドのコードの文法チェック |
| 〃   | `npm run test`   | /        | バックエンドのテスト               |

</details>

## プロダクション環境

### URL 一覧

|                      | URL                      | 備考 |
| -------------------- | ------------------------ | ---- |
| アプリケーション URL | https://himawarigumi.xyz |      |

## インフラ構成図(doing)

![infra_structure](https://user-images.githubusercontent.com/35862303/82797210-bc134180-9eb1-11ea-88d6-f0bb8c56f833.jpg)
