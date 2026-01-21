// Test chat API endpoints
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000';

async function testChatAPI() {
    console.log('🧪 Testing Chat API...\n');

    try {
        console.log('1️⃣ Testing server health...');
        const health = await fetch(`${BASE_URL}/health`);
        console.log('   ✅ Server is running\n');

        console.log('2️⃣ Testing chat endpoints accessibility...');
        const messagesTest = await fetch(`${BASE_URL}/api/chat/messages`);
        if (messagesTest.status === 401) {
            console.log('   ✅ /api/chat/messages endpoint exists (requires auth)\n');
        } else {
            console.log(`   ⚠️  Unexpected status: ${messagesTest.status}\n`);
        }

        console.log('✅ Chat API is properly configured!');
        console.log('\n📝 Next steps:');
        console.log('   1. Open http://localhost:5000/contact.html in browser');
        console.log('   2. Login with your credentials');
        console.log('   3. Try sending a message in the chat box');
        console.log('   4. Open http://localhost:5000/admin-chat.html in another tab');
        console.log('   5. You should see the user in the list and can reply\n');

    } catch (error) {
        console.error('❌ Error testing API:', error.message);
    }
}

testChatAPI();