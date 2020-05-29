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

### URL 一覧

|                             | URL                                | 備考                               |
| --------------------------- | ---------------------------------- | ---------------------------------- |
| アプリケーション URL        | https://himawari.dev               |                                    |
| API リファレンス            | https://himawari.dev/swagger/      |                                    |
| API リファレンス(JSON 形式) | https://himawari.dev/swagger-json/ |                                    |
| phpmyadmin                  | https://himawari-phpmyadmin.dev    | username: `root`, password: `root` |

### よく使うコマンド一覧

| コマンド             | 実行場所 | 効果                                                                                                         |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `make codegen`       | /        | フロントエンド用の API リクエストコードを自動生成する。`/client/openapi`ディレクトリにコードが生成されます。 |
| `make client-format` | /        | フロントエンドのコードフォーマット                                                                           |
| `make client-lint`   | /        | フロントエンドのコードの文法チェック                                                                         |
| `make client-test`   | /        | フロントエンドのテスト                                                                                       |
| `make api-format`    | /        | バックエンドのコードフォーマット                                                                             |
| `make api-lint`      | /        | バックエンドのコードの文法チェック                                                                           |
| `make api-test`      | /        | バックエンドのテスト                                                                                         |

実行場所の`/`は、プロジェクトルートディレクトリの意味

### リファレンス

- フロントエンド
  - [Nuxt の公式](https://nuxtjs.org/)
  - [vuesax の公式](https://lusaxweb.github.io/vuesax/)
- バックエンド
  - [Nestjs の OpenAPI の書き方](https://docs.nestjs.com/recipes/swagger)

### phpmyadmin の設定

ローカル環境では、phpmyadmin が使えます。
hosts ファイルに、下の行を追加してください

1. docker desktop の場合

```
127.0.0.1 himawari.dev
127.0.0.1 himawari-phpmyadmin.dev # この行を追加
```

2. docker toolbox の場合
   予め、

```
$ minikube ip
```

で調べた ip アドレス(たとえば、192.168.99.1 だとすると)に基づいて、下記の行を追加

```
192.168.99.1 himawari.dev
192.168.99.1 himawari-phpmyadmin.dev # この行を追加
```

## プロダクション環境

### URL 一覧

|                      | URL                      | 備考 |
| -------------------- | ------------------------ | ---- |
| アプリケーション URL | https://himawarigumi.xyz |      |

## インフラ構成図(doing)

![infra_structure](https://user-images.githubusercontent.com/35862303/82797210-bc134180-9eb1-11ea-88d6-f0bb8c56f833.jpg)

hoge