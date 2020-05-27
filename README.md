![](https://github.com/YoshijiFujiwara/himawari-project/workflows/deploy-client/badge.svg)
![](https://github.com/YoshijiFujiwara/himawari-project/workflows/deploy-node/badge.svg)
![](https://github.com/YoshijiFujiwara/himawari-project/workflows/test-client/badge.svg)
![](https://github.com/YoshijiFujiwara/himawari-project/workflows/test-node/badge.svg)

# ひまわりプロジェクト

## 環境構築

詳しい環境構築は、[wiki](https://github.com/YoshijiFujiwara/himawari-project/wiki) を参照してください

### ローカル開発環境

- アプリケーション URL: https://himawari.dev
- phpmyadmin: https://himawari-phpmyadmin.dev (username: `root`, password: `root`)

上記の wiki で、kubernetes 環境を整えた後、

```
$ skaffold dev
```

で動きます。

#### phpmyadmin の設定

ローカル環境では、phpmyadmin が使えます。
hosts ファイルに、下の行を追加してください

- docker desktop の場合

```
127.0.0.1 himawari.dev
127.0.0.1 himawari-phpmyadmin.dev # この行を追加
```

- docker toolbox の場合
  予め、

```
$ minikube ip
```

で調べた ip アドレス(たとえば、192.168.99.1 だとすると)に基づいて、下記の行を追加

```
192.168.99.1 himawari.dev
192.168.99.1 himawari-phpmyadmin.dev # この行を追加
```

### プロダクション環境

- アプリケーション URL: https://himawarigumi.xyz

## インフラ構成図

![infra_structure](https://user-images.githubusercontent.com/35862303/82797210-bc134180-9eb1-11ea-88d6-f0bb8c56f833.jpg)
