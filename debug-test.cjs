const { SdkClient } = require('./sdks/packages/core/dist/src/client.js');

async function debugTest() {
  console.log('🔍 デバッグテスト開始');

  const testPrivateKey = '0x5522b7f7cbc55a2be20b58cfa864732f4af2be01c7b1370206a61c520bdd2da5';

  try {
    const sdkClient = new SdkClient({
      chainName: 'polygon',
      networkName: 'mainnet',
      rpcEndpoint: 'https://polygon-rpc.com',
    });

    const account = sdkClient.createPrivateKeyAccount({ privateKey: testPrivateKey });
    const client = sdkClient.createLocalClient({ account });

    // 直接コントラクトにアクセス
    const { getContract } = require('viem');
    const { JPYC_V2_ABI } = require('./sdks/packages/core/dist/src/interfaces/abis.js');
    const { V2_PROXY_ADDRESS } = require('./sdks/packages/core/dist/src/utils/addresses.js');

    console.log('📍 コントラクトアドレス:', V2_PROXY_ADDRESS);

    const contract = getContract({
      address: V2_PROXY_ADDRESS,
      abi: JPYC_V2_ABI,
      client: client,
    });

    // 生のレスポンスを確認
    console.log('\n🔍 totalSupply() の生レスポンス:');
    const totalSupplyResp = await contract.read.totalSupply();
    console.log('Type:', typeof totalSupplyResp);
    console.log('Value:', totalSupplyResp);
    console.log('String:', totalSupplyResp.toString());

    console.log('\n🔍 balanceOf() の生レスポンス:');
    const balanceResp = await contract.read.balanceOf([account.address]);
    console.log('Type:', typeof balanceResp);
    console.log('Value:', balanceResp);
    console.log('String:', balanceResp.toString());

    // 手動で変換テスト
    console.log('\n🔧 手動変換テスト:');
    const totalSupplyNumber = Number(totalSupplyResp) / (10 ** 18);
    const balanceNumber = Number(balanceResp) / (10 ** 18);
    
    console.log(`💰 総供給量: ${totalSupplyNumber.toLocaleString()} JPYC`);
    console.log(`💳 残高: ${balanceNumber} JPYC`);

  } catch (error) {
    console.error('❌ エラー:', error);
  }
}

debugTest().catch(console.error);