-- Create anonymous chat messages table
CREATE TABLE IF NOT EXISTS anonymous_chat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(100) NOT NULL,
    sender_type ENUM('guest', 'admin') NOT NULL,
    message TEXT NOT NULL,
    guest_name VARCHAR(100) DEFAULT 'Guest',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session_id (session_id),
    INDEX idx_created_at (created_at)
);
