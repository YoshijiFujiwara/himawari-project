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

| コマンド              | 実行場所 | 効果                                                                                                         |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `make codegen`        | /        | フロントエンド用の API リクエストコードを自動生成する。`/client/openapi`ディレクトリにコードが生成されます。 |
| `make create-secrets` | /        | ローカル開発用の環境変数をセットする                                                                         |
| `make delete-secrets` | /        | ローカル開発用の環境変数を削除する(このあと`make create-secrets`することで上書きできる)                      |
| `make client-format`  | /        | フロントエンドのコードフォーマット                                                                           |
| `make client-lint`    | /        | フロントエンドのコードの文法チェック                                                                         |
| `make client-test`    | /        | フロントエンドのテスト                                                                                       |
| `make api-format`     | /        | バックエンドのコードフォーマット                                                                             |
| `make api-lint`       | /        | バックエンドのコードの文法チェック                                                                           |
| `make api-test`       | /        | バックエンドのテスト                                                                                         |

実行場所の`/`は、プロジェクトルートディレクトリの意味

## プロダクション環境

### URL 一覧

|                      | URL                      | 備考 |
| -------------------- | ------------------------ | ---- |
| アプリケーション URL | https://himawarigumi.xyz |      |

## インフラ構成図(doing)

![infra_structure](https://user-images.githubusercontent.com/35862303/82797210-bc134180-9eb1-11ea-88d6-f0bb8c56f833.jpg)
