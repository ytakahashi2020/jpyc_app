const { JPYC } = require('./sdks/packages/core/dist/src/jpyc.js');
const { SdkClient } = require('./sdks/packages/core/dist/src/client.js');
// Polygon Amoy上でJPYCトークンのテスト
async function testPolygonJPYC() {
    console.log('🔷 Polygon Mainnetネットワーク上でJPYCテスト開始');
    // 提供されたプライベートキー
    const testPrivateKey = '0x5522b7f7cbc55a2be20b58cfa864732f4af2be01c7b1370206a61c520bdd2da5';
    try {
        // SdkClientを作成
        const sdkClient = new SdkClient({
            chainName: 'polygon',
            networkName: 'mainnet',
            rpcEndpoint: 'https://polygon-rpc.com',
        });
        console.log('✅ SDK Client作成完了');
        // アカウント作成
        const account = sdkClient.createPrivateKeyAccount({ privateKey: testPrivateKey });
        console.log(`👤 アカウント: ${account.address}`);
        // クライアント作成
        const client = sdkClient.createLocalClient({ account });
        console.log('✅ Walletクライアント作成完了');
        // JPYCインスタンス作成
        const jpyc = new JPYC({ client });
        console.log('✅ JPYC インスタンス作成完了');
        // 基本情報取得テスト
        console.log('\n📊 JPYC基本情報取得中...');
        const totalSupply = await jpyc.totalSupply();
        console.log(`💰 総供給量: ${totalSupply.toLocaleString()} JPYC`);
        const balance = await jpyc.balanceOf({ account: account.address });
        console.log(`💳 残高: ${balance} JPYC`);
        // Minter権限確認
        const isMinter = await jpyc.isMinter({ account: account.address });
        console.log(`🏭 Minter権限: ${isMinter ? 'あり' : 'なし'}`);
        if (isMinter) {
            const minterAllowance = await jpyc.minterAllowance({ minter: account.address });
            console.log(`⚡ Minter許可量: ${minterAllowance.toLocaleString()} JPYC`);
        }
    }
    catch (error) {
        console.error('❌ エラーが発生しました:', error);
    }
}
// 転送テスト用の関数
async function testTransfer() {
    console.log('\n💸 転送テスト開始');
    const testPrivateKey = '0x5522b7f7cbc55a2be20b58cfa864732f4af2be01c7b1370206a61c520bdd2da5';
    try {
        const sdkClient = new SdkClient({
            chainName: 'polygon',
            networkName: 'mainnet',
            rpcEndpoint: 'https://polygon-rpc.com',
        });
        const account = sdkClient.createPrivateKeyAccount({ privateKey: testPrivateKey });
        const client = sdkClient.createLocalClient({ account });
        const jpyc = new JPYC({ client });
        // 送信前の残高確認
        const balanceBefore = await jpyc.balanceOf({ account: account.address });
        console.log(`📊 送信前残高: ${balanceBefore} JPYC`);
        // テスト用のダミーアドレス（実際のテストでは注意）
        const testReceiver = '0x742d35Cc6634C0532925a3b8D2BE2500AAE4b7a';
        if (balanceBefore > 0) {
            console.log(`🚀 ${testReceiver} に 1 JPYC を送信中...`);
            const txHash = await jpyc.transfer({
                to: testReceiver,
                value: 1
            });
            console.log(`✅ 転送完了! Transaction Hash: ${txHash}`);
            // 送信後の残高確認
            const balanceAfter = await jpyc.balanceOf({ account: account.address });
            console.log(`📊 送信後残高: ${balanceAfter} JPYC`);
        }
        else {
            console.log('⚠️  残高不足のため転送テストをスキップ');
        }
    }
    catch (error) {
        console.error('❌ 転送テストでエラーが発生しました:', error);
    }
}
// 利用可能な機能デモ
function showAvailableFeatures() {
    console.log('\n🛠️  利用可能なPolygon JPYC機能:');
    console.log('  📖 読み取り機能:');
    console.log('    - totalSupply(): 総供給量取得');
    console.log('    - balanceOf(): 残高確認');
    console.log('    - allowance(): 許可残高確認');
    console.log('    - isMinter(): Minter権限確認');
    console.log('    - minterAllowance(): Minter許可量確認');
    console.log('  ✍️  書き込み機能:');
    console.log('    - transfer(): トークン転送');
    console.log('    - transferFrom(): 代理転送');
    console.log('    - approve(): 許可設定');
    console.log('    - increaseAllowance(): 許可量増加');
    console.log('    - decreaseAllowance(): 許可量減少');
    console.log('    - mint(): トークン発行（権限必要）');
    console.log('  🔐 高度な機能:');
    console.log('    - transferWithAuthorization(): 署名付き転送');
    console.log('    - receiveWithAuthorization(): 署名付き受取');
    console.log('    - permit(): 署名付き許可');
}
// メイン実行
async function main() {
    console.log('🚀 JPYC SDK Polygon テスト開始\n');
    showAvailableFeatures();
    // プライベートキーとRPCが設定されたので実際のテストを実行
    console.log('\n🧪 Polygon Mainnetでのテスト実行中...');
    await testPolygonJPYC();
    // 転送テストも実行（残高があれば）
    await testTransfer();
}
if (process.argv[1].endsWith('polygon-test.cjs')) {
    main().catch(console.error);
}
module.exports = { testPolygonJPYC, testTransfer };
