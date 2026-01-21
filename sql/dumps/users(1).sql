-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2025 at 04:34 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentread`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `registration_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('active','inactive','suspended') DEFAULT 'active',
  `total_rentals` int(11) DEFAULT 0,
  `last_transaction_id` varchar(100) DEFAULT NULL,
  `last_payment_date` timestamp NULL DEFAULT NULL,
  `last_payment_amount` decimal(10,2) DEFAULT 0.00,
  `payment_verified` tinyint(1) DEFAULT 0,
  `payment_verified_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `created_at`, `phone`, `address`, `registration_date`, `status`, `total_rentals`, `last_transaction_id`, `last_payment_date`, `last_payment_amount`, `payment_verified`, `payment_verified_date`) VALUES
(1, 'Test User', 'testuser@example.com', '$2a$10$OrLTnUdASb6Y3dA6loF9f.00tKV.SQln/.PwWivZYDerpnWyjhR.q', '2025-10-25 12:46:40', NULL, NULL, '2025-10-30 18:05:08', 'active', 0, NULL, NULL, 0.00, 0, NULL),
(2, 'Shohan', 'shohan1024222@gmail.com', '$2a$10$0HMsxB8TA4KFM5WIGo.ogephkPM0/XPs7KJpie552Ch9/MD0U6uiy', '2025-10-25 17:32:08', '01620145753', 'hgvg', '2025-10-30 18:05:08', 'active', 0, NULL, NULL, 0.00, 0, NULL),
(3, 'Shohan2', 'shohan@gmail.com', '$2a$10$LYYYoxEaBn9p476H/gC9OuMrJUrACyaJpkHW6BX3iYsJhbk6mP.96', '2025-11-25 07:29:34', NULL, NULL, '2025-11-25 07:29:34', 'active', 0, NULL, NULL, 0.00, 0, NULL),
(4, 'shohan29', 'shohan29@gmail.com', '$2a$10$qNUqz4JxV/3uMYd5QKCxheBwiOgQm.Dfkj67HS3tNViSIY8p/lw1m', '2025-11-25 08:12:02', NULL, NULL, '2025-11-25 08:12:02', 'active', 0, 'DSA', '2025-11-25 15:20:12', 25.00, 0, NULL),
(6, 'shohan30', 'shohan30@gmail.com', '$2a$10$AHFunkjnXb4icFXWScFvI.jvSS5Dwe8ZJbEgSjOQMJelqJNVhY8BS', '2025-11-25 15:21:58', NULL, NULL, '2025-11-25 15:21:58', 'active', 0, 'B354', '2025-11-25 15:22:33', 15.00, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_user_email` (`email`),
  ADD KEY `idx_transaction_id` (`last_transaction_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
