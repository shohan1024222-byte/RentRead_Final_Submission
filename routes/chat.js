const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/authMiddleware');

// Send message (user or admin)
router.post('/send', authMiddleware, async (req, res) => {
    try {
        const { message, sender_type = 'user' } = req.body;
        const user_id = req.user.id;

        if (!message || !message.trim()) {
            return res.status(400).json({ error: 'Message cannot be empty' });
        }

        const [result] = await pool.query(
            'INSERT INTO chat_messages (user_id, sender_type, message) VALUES (?, ?, ?)',
            [user_id, sender_type, message.trim()]
        );

        res.json({
            success: true,
            message_id: result.insertId,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Get user's chat history
router.get('/messages', authMiddleware, async (req, res) => {
    try {
        const user_id = req.user.id;

        const [messages] = await pool.query(
            `SELECT id, sender_type, message, is_read, created_at 
             FROM chat_messages 
             WHERE user_id = ? 
             ORDER BY created_at ASC`,
            [user_id]
        );

        // Mark admin messages as read
        await pool.query(
            'UPDATE chat_messages SET is_read = TRUE WHERE user_id = ? AND sender_type = ? AND is_read = FALSE',
            [user_id, 'admin']
        );

        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Admin: Get all chats (grouped by user)
router.get('/admin/users', async (req, res) => {
    try {
        const [users] = await pool.query(`
            SELECT 
                u.id,
                u.name,
                u.email,
                COUNT(cm.id) as message_count,
                SUM(CASE WHEN cm.sender_type = 'user' AND cm.is_read = FALSE THEN 1 ELSE 0 END) as unread_count,
                MAX(cm.created_at) as last_message_time
            FROM users u
            LEFT JOIN chat_messages cm ON u.id = cm.user_id
            GROUP BY u.id, u.name, u.email
            HAVING message_count > 0
            ORDER BY last_message_time DESC
        `);

        res.json(users);
    } catch (error) {
        console.error('Error fetching chat users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Admin: Get messages for specific user
router.get('/admin/messages/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const [messages] = await pool.query(
            `SELECT id, sender_type, message, is_read, created_at 
             FROM chat_messages 
             WHERE user_id = ? 
             ORDER BY created_at ASC`,
            [userId]
        );

        // Mark user messages as read by admin
        await pool.query(
            'UPDATE chat_messages SET is_read = TRUE WHERE user_id = ? AND sender_type = ? AND is_read = FALSE',
            [userId, 'user']
        );

        res.json(messages);
    } catch (error) {
        console.error('Error fetching user messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Admin: Send message to user
router.post('/admin/send', async (req, res) => {
    try {
        const { user_id, message } = req.body;

        if (!user_id || !message || !message.trim()) {
            return res.status(400).json({ error: 'User ID and message are required' });
        }

        const [result] = await pool.query(
            'INSERT INTO chat_messages (user_id, sender_type, message) VALUES (?, ?, ?)',
            [user_id, 'admin', message.trim()]
        );

        res.json({
            success: true,
            message_id: result.insertId,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Error sending admin message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Get unread count for user
router.get('/unread-count', authMiddleware, async (req, res) => {
    try {
        const user_id = req.user.id;

        const [result] = await pool.query(
            'SELECT COUNT(*) as count FROM chat_messages WHERE user_id = ? AND sender_type = ? AND is_read = FALSE',
            [user_id, 'admin']
        );

        res.json({ unread_count: result[0].count });
    } catch (error) {
        console.error('Error fetching unread count:', error);
        res.status(500).json({ error: 'Failed to fetch unread count' });
    }
});

module.exports = router;
