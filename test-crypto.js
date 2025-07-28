// Test crypto-js import
async function testCrypto() {
  try {
    const CryptoJS = await import('crypto-js');
    console.log('CryptoJS imported successfully');
    console.log('CryptoJS keys:', Object.keys(CryptoJS));
    
    // Test HMAC-SHA1 with default import
    const testString = 'test';
    const testKey = 'key';
    const signature = CryptoJS.default.HmacSHA1(testString, testKey).toString(CryptoJS.default.enc.Base64);
    console.log('Test signature:', signature);
    
    return true;
  } catch (error) {
    console.error('Crypto test failed:', error);
    return false;
  }
}

testCrypto(); 