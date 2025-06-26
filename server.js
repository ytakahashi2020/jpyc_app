const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// 静的ファイルの提供
app.use(express.static('public'));
app.use(express.json());

// メインページ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ヘルスチェックAPI
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'JPYC Wallet Monitor',
    mode: 'wallet-only',
    timestamp: new Date().toISOString()
  });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`🦊 JPYC Wallet Monitor が起動しました`);
  console.log(`📱 ブラウザで開く: http://localhost:${PORT}`);
  console.log(`🔗 ウォレット接続のみで動作します`);
  console.log(`⏹️  終了するには Ctrl+C を押してください`);
});