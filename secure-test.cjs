require('dotenv').config();
const { JPYC } = require('./sdks/packages/core/dist/src/jpyc.js');
const { SdkClient } = require('./sdks/packages/core/dist/src/client.js');

// 環境変数から設定を取得
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;
const CHAIN_NAME = process.env.CHAIN_NAME;
const NETWORK_NAME = process.env.NETWORK_NAME;

if (!PRIVATE_KEY) {
  console.error('❌ PRIVATE_KEY が .env ファイルに設定されていません');
  process.exit(1);
}

// セキュアなJPYCテスト関数
async function secureJPYCTest() {
  console.log('🔐 セキュアなJPYC Polygonテスト開始');
  console.log(`🌐 接続先: ${CHAIN_NAME} ${NETWORK_NAME}`);
  console.log(`🔗 RPC: ${RPC_URL}`);

  try {
    // SdkClientを作成
    const sdkClient = new SdkClient({
      chainName: CHAIN_NAME,
      networkName: NETWORK_NAME,
      rpcEndpoint: RPC_URL,
    });

    console.log('✅ SDK Client作成完了');

    // アカウント作成（秘密鍵は環境変数から）
    const account = sdkClient.createPrivateKeyAccount({ privateKey: PRIVATE_KEY });
    console.log(`👤 アカウント: ${account.address}`);

    // クライアント作成
    const client = sdkClient.createLocalClient({ account });
    console.log('✅ Walletクライアント作成完了');

    // JPYCインスタンス作成
    const jpyc = new JPYC({ client });
    console.log('✅ JPYC インスタンス作成完了');

    // 基本情報取得
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

    // 戻り値として結果を返す
    return {
      success: true,
      data: {
        address: account.address,
        totalSupply,
        balance,
        isMinter,
        timestamp: new Date().toISOString()
      }
    };

  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// 転送テスト（残高がある場合のみ）
async function secureTransferTest(testAmount = 1, recipient = null) {
  console.log('\n💸 セキュア転送テスト開始');

  try {
    const sdkClient = new SdkClient({
      chainName: CHAIN_NAME,
      networkName: NETWORK_NAME,
      rpcEndpoint: RPC_URL,
    });

    const account = sdkClient.createPrivateKeyAccount({ privateKey: PRIVATE_KEY });
    const client = sdkClient.createLocalClient({ account });
    const jpyc = new JPYC({ client });

    // 送信前の残高確認
    const balanceBefore = await jpyc.balanceOf({ account: account.address });
    console.log(`📊 送信前残高: ${balanceBefore} JPYC`);

    if (balanceBefore >= testAmount) {
      // 送信先アドレスの決定（パラメータまたはデフォルト）
      const testReceiver = recipient || '0x0000000000000000000000000000000000000001';
      console.log(`🚀 ${testReceiver} に ${testAmount} JPYC を送信中...`);
      
      const txHash = await jpyc.transfer({
        to: testReceiver,
        value: testAmount
      });
      
      console.log(`✅ 転送完了! Transaction Hash: ${txHash}`);
      console.log(`🔗 Polygonscan: https://polygonscan.com/tx/${txHash}`);
      
      // 送信後の残高確認
      const balanceAfter = await jpyc.balanceOf({ account: account.address });
      console.log(`📊 送信後残高: ${balanceAfter} JPYC`);

      return {
        success: true,
        txHash,
        balanceBefore,
        balanceAfter,
        recipient: testReceiver,
        amount: testAmount
      };
    } else {
      console.log(`⚠️  残高不足 (${balanceBefore} JPYC < ${testAmount} JPYC)`);
      return {
        success: false,
        reason: '残高不足',
        balance: balanceBefore
      };
    }

  } catch (error) {
    console.error('❌ 転送エラー:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// メイン実行
async function main() {
  console.log('🚀 セキュアなJPYC SDK テスト開始\n');
  
  // 基本テスト
  const basicResult = await secureJPYCTest();
  
  // 転送テスト（残高があれば）
  if (basicResult.success && basicResult.data.balance > 0) {
    const transferResult = await secureTransferTest();
    console.log('\n📋 転送結果:', transferResult);
  }

  console.log('\n🎉 テスト完了!');
  return basicResult;
}

// ファイルが直接実行された場合のみmainを呼び出し
if (require.main === module) {
  main().catch(console.error);
}

// 外部から使用できるようにエクスポート
module.exports = { secureJPYCTest, secureTransferTest, main };