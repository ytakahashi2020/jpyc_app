# 🦊 JPYC Wallet Monitor

MetaMask連携でJPYC情報表示・操作を行うWebアプリケーション

## 📋 機能

- 🦊 **MetaMask連携** - ウォレット接続でJPYC情報にアクセス
- 📊 **リアルタイム情報表示** - JPYC残高、総供給量、Minter権限の確認
- 💸 **転送機能** - 任意のアドレスへのJPYC送金
- 🔄 **自動更新** - 30秒間隔での自動データ更新
- 🔗 **外部リンク** - Polygonscan直接アクセス
- 🔐 **セキュア** - 完全にクライアント側で動作、サーバーに秘密鍵を保存しない

## 🚀 セットアップ

### 1. 依存関係のインストール
```bash
# JPYC SDKのクローン
git clone https://github.com/jcam1/sdks.git

# 依存関係のインストール
npm install

# SDKのビルド
cd sdks/packages/core
npm install --ignore-engines
npx tsc
cd ../../..
```

### 2. 環境変数の設定（オプション）
`.env`ファイルを作成（ポート番号のみ）:
```env
# Web server port
PORT=3001
```

### 3. アプリケーション起動
```bash
# Webアプリケーション起動
npm run dev
```

## 🌐 使用方法

### Webアプリ（推奨）
1. `npm run dev` でサーバー起動
2. ブラウザで `http://localhost:3001` にアクセス
3. MetaMaskを接続
4. Polygon Mainnetに切り替え（必要に応じて）
5. リアルタイムでJPYC情報を確認
6. 転送先アドレスと金額を入力して送金テスト

## 📱 Webアプリ機能詳細

### 🦊 ウォレット接続
- **MetaMask自動検出** - MetaMaskの有無を自動確認
- **ネットワーク切り替え** - Polygon Mainnetへの自動切り替え機能
- **アカウント変更対応** - ウォレットアカウント変更を自動検出

### 📊 基本情報表示
- ウォレットアドレス
- JPYC残高
- 総供給量
- Minter権限

### 💸 転送テスト
- **送信先アドレス入力** - 任意のEthereumアドレスに送金
- **金額指定** - 送金するJPYC数量
- **クイック選択** - Burnアドレス、テストアドレスの簡単選択
- **リアルタイム確認** - Polygonscanリンクで即座に確認

### 🔄 監視機能
- 手動更新ボタン
- 30秒間隔自動更新
- 転送後の自動残高更新

## 🔧 技術スタック

- **Backend**: Node.js + Express（最小限のWebサーバー）
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Blockchain**: Polygon + MetaMask
- **Web3**: MetaMask Provider

## 📁 ファイル構成

```
jpyc/
├── .env                    # 環境変数（ポート番号のみ）
├── .gitignore             # Git除外設定
├── README.md              # このファイル
├── package.json           # npm設定
├── server.js              # 最小限のWebサーバー
├── public/
│   └── index.html         # Webアプリ UI
└── sdks/                  # JPYC SDK (Git除外)
```

## 🔒 セキュリティ

- 🔐 **クライアント専用** - すべての処理がブラウザ内で完結
- 🚫 **秘密鍵不要** - サーバーサイドに秘密鍵を保存しない
- ✅ **MetaMask依存** - MetaMaskの既存セキュリティ機能を活用
- 🌐 **透明性** - すべてのコードがフロントエンドで確認可能

## 🔗 便利なリンク

- **Polygonscan**: https://polygonscan.com/
- **JPYCコントラクト**: https://polygonscan.com/token/0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB
- **JPYC SDK**: https://github.com/jcam1/sdks
- **MetaMask**: https://metamask.io/

## 📈 実績

✅ Polygon Mainnet接続成功  
✅ MetaMask統合完了  
✅ JPYC総供給量取得: 22億5千万JPYC  
✅ 実際のJPYC転送成功  
✅ リアルタイム残高監視  
✅ セキュアなウォレット専用アーキテクチャ  

## 🆘 トラブルシューティング

### よくある問題

1. **MetaMask未検出**
   - MetaMaskブラウザ拡張機能をインストール
   - ページをリロードして再試行

2. **ネットワークエラー**
   - MetaMaskでPolygon Mainnetに切り替え
   - 「Polygonに切り替え」ボタンを使用

3. **転送失敗**
   - ウォレットにMATIC（ガス代）があることを確認
   - JPYCの残高を確認

4. **ポート使用中エラー**
   - `.env`ファイルで`PORT`を変更
   - 他のアプリケーションがポートを使用していないか確認

## 🎯 特徴

- **🔐 プライバシー重視**: サーバーに秘密鍵を送信・保存しない
- **🚀 簡単セットアップ**: MetaMaskさえあれば即座に利用可能
- **💫 リアルタイム**: ブロックチェーンデータの即座取得・表示
- **🌐 透明性**: すべての処理がクライアント側で実行

---

🦊 **Made with MetaMask + JPYC on Polygon** 🚀