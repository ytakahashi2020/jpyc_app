# JPYC Polygon 確認方法

## 🔍 1. ブロックチェーンエクスプローラーでの確認

### あなたのウォレット確認
- **アドレス**: `0x049E8641964cf92f38c50397e34CCE9C3f24dB5E`
- **Polygonscan**: https://polygonscan.com/address/0x049E8641964cf92f38c50397e34CCE9C3f24dB5E

### JPYCコントラクト確認
- **コントラクトアドレス**: `0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB`
- **Polygonscan**: https://polygonscan.com/token/0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB

## 💰 2. JPYC取得方法

### A. 取引所から送金
1. JPYC対応取引所でJPYCを購入
2. Polygon Mainnetに出金設定
3. あなたのアドレス `0x049E8641964cf92f38c50397e34CCE9C3f24dB5E` に送金

### B. Polygon Bridge使用
1. Ethereum MainnetのJPYCを保有
2. Polygon公式ブリッジでPolygonに移動
3. https://wallet.polygon.technology/polygon/bridge

### C. DEX（分散取引所）で交換
1. Polygon上のDEX（Uniswap V3、QuickSwap等）を使用
2. MATIC → JPYC に交換

## 🧪 3. SDK機能テスト

### 基本機能テスト（現在利用可能）
```bash
# 総供給量・残高確認
node polygon-test.cjs

# デバッグモード
node debug-test.cjs
```

### 転送機能テスト（JPYC残高必要）
- JPYCを取得後、転送テストが自動実行される
- 1 JPYCがテストアドレスに送信される

## 📱 4. MetaMaskでの確認

### ネットワーク追加
1. MetaMaskを開く
2. ネットワーク → カスタムRPC追加
3. 設定値：
   - ネットワーク名: Polygon Mainnet
   - RPC URL: https://polygon-rpc.com
   - チェーンID: 137
   - 通貨記号: MATIC
   - ブロックエクスプローラー: https://polygonscan.com

### JPYCトークン追加
1. MetaMaskでPolygon Mainnetに切り替え
2. 「トークンをインポート」をクリック
3. コントラクトアドレス: `0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB`
4. シンボル: JPYC
5. 小数点: 18

### プライベートキーインポート
⚠️ **注意**: テスト用途のみ推奨
1. MetaMask → アカウントをインポート
2. プライベートキー: `5522b7f7cbc55a2be20b58cfa864732f4af2be01c7b1370206a61c520bdd2da5`

## 🔧 5. 追加のSDKテスト

### Approve機能テスト
```javascript
// 別のアドレスにJPYC使用許可を与える
await jpyc.approve({
  spender: '0x742d35Cc6634C0532925a3b8D2BE2500AAE4b7a',
  value: 10 // 10 JPYC
});
```

### 許可量確認
```javascript
await jpyc.allowance({
  owner: '0x049E8641964cf92f38c50397e34CCE9C3f24dB5E',
  spender: '0x742d35Cc6634C0532925a3b8D2BE2500AAE4b7a'
});
```

## 📊 6. リアルタイム監視

### イベントログ監視
- Polygonscanでトランザクション履歴を確認
- JPYCの Transfer イベントをリアルタイム監視

### 残高監視スクリプト
```bash
# 30秒ごとに残高確認
watch -n 30 "node debug-test.cjs"
```

## 🎯 次のステップ

1. **JPYCを少額取得** → 転送機能の完全テスト
2. **DApp開発** → Web3アプリケーションと統合
3. **自動化** → 定期的な残高監視・通知システム
4. **高度な機能** → 署名付き転送、Permit機能のテスト