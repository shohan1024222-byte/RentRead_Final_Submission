-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2025 at 05:28 PM
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
-- Table structure for table `user_rentals`
--

CREATE TABLE `user_rentals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) DEFAULT NULL,
  `rental_days` int(11) NOT NULL DEFAULT 1,
  `total_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `rental_date` datetime NOT NULL DEFAULT current_timestamp(),
  `expiry_date` datetime NOT NULL,
  `status` varchar(32) DEFAULT 'active',
  `access_count` int(11) DEFAULT 0,
  `last_accessed` datetime DEFAULT NULL,
  `title` varchar(512) NOT NULL,
  `description` text DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `price_per_day` decimal(10,2) DEFAULT NULL,
  `total_pages` int(11) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `filename` varchar(255) DEFAULT NULL,
  `base_price` decimal(10,2) DEFAULT NULL,
  `daily_increment` decimal(10,2) DEFAULT NULL,
  `max_rental_days` int(11) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `pdf_file` varchar(500) DEFAULT NULL,
  `file_size` bigint(20) DEFAULT NULL,
  `availability_status` varchar(50) DEFAULT NULL,
  `total_rented` int(11) DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `drive_link` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_rentals`
--

INSERT INTO `user_rentals` (`id`, `user_id`, `book_id`, `rental_days`, `total_price`, `rental_date`, `expiry_date`, `status`, `access_count`, `last_accessed`, `title`, `description`, `author`, `price_per_day`, `total_pages`, `category`, `is_available`, `filename`, `base_price`, `daily_increment`, `max_rental_days`, `image_url`, `pdf_file`, `file_size`, `availability_status`, `total_rented`, `language`, `drive_link`, `created_at`, `updated_at`) VALUES
(1, 2, NULL, 1, 0.00, '2025-11-06 22:58:02', '2025-11-07 22:58:02', 'active', 0, NULL, 'f', 'fd', 'f', 0.00, 0, 'Computer Science', 0, '', 10.00, 2.00, 30, '/img/covers/image-1762445920166-941774559.jpg', NULL, NULL, 'available', 0, 'Bangla', 'https://docs.google.com/presentation/d/1Yps2XYxCZ-EYM9f7wNFDa5E_rDmwEp-E/edit?slide=id.p1#slide=id.p1', '2025-11-06 22:58:02', '2025-11-06 22:58:02'),
(2, 2, NULL, 1, 0.00, '2025-11-08 20:04:07', '2025-11-09 20:04:07', 'active', 0, NULL, 'f', 'fd', 'f', 0.00, 0, 'Computer Science', 0, '', 10.00, 2.00, 30, '/img/covers/image-1762445920166-941774559.jpg', NULL, NULL, 'available', 0, 'Bangla', 'https://docs.google.com/presentation/d/1Yps2XYxCZ-EYM9f7wNFDa5E_rDmwEp-E/edit?slide=id.p1#slide=id.p1', '2025-11-08 20:04:07', '2025-11-08 20:04:07'),
(3, 2, NULL, 1, 0.00, '2025-11-08 20:53:48', '2025-11-09 20:53:48', 'active', 0, NULL, 'f', 'fd', 'f', 0.00, 0, 'Computer Science', 0, '', 10.00, 2.00, 30, '/img/covers/image-1762445920166-941774559.jpg', NULL, NULL, 'available', 0, 'Bangla', 'https://docs.google.com/presentation/d/1Yps2XYxCZ-EYM9f7wNFDa5E_rDmwEp-E/edit?slide=id.p1#slide=id.p1', '2025-11-08 20:53:48', '2025-11-08 20:53:48'),
(4, 2, NULL, 1, 0.00, '2025-11-09 00:43:40', '2025-11-10 00:43:40', 'active', 0, NULL, 'f', 'fd', 'f', 0.00, 0, 'Computer Science', 0, '', 10.00, 2.00, 30, '/img/covers/image-1762445920166-941774559.jpg', NULL, NULL, 'available', 0, 'Bangla', 'https://docs.google.com/presentation/d/1Yps2XYxCZ-EYM9f7wNFDa5E_rDmwEp-E/edit?slide=id.p1#slide=id.p1', '2025-11-09 00:43:40', '2025-11-09 00:43:40'),
(5, 2, NULL, 1, 9.00, '2025-11-09 01:32:31', '2025-11-10 01:32:31', 'active', 0, NULL, 'বিজ্ঞান কল্পকাহিনী সমগ্র', '৳9 total • 7 days • Bangla • Collection', 'Multiple Authors', 9.00, 0, 'Science Fiction', 0, '', 10.00, 2.00, 30, '/img/covers/scifi_collection.jpg', NULL, NULL, 'available', 0, 'Bangla', NULL, '2025-11-09 01:32:31', '2025-11-09 01:32:31'),
(6, 2, NULL, 1, 1.00, '2025-11-09 03:29:01', '2025-11-10 03:29:01', 'active', 0, NULL, 'Theory of Computer Science Automata', '', '', 1.00, 0, 'Computer Science', 0, '', 10.00, 2.00, 30, '/img/covers/image-1762637304139-859186431.png', NULL, NULL, 'available', 0, 'Bangla', 'https://drive.google.com/file/d/1-CwQ3bcSEUUDLLiK4Z3f6Cw-7mZ7rJNs/view', '2025-11-09 03:29:01', '2025-11-09 03:29:01'),
(7, 2, 136, 1, 1.00, '2025-11-09 03:47:45', '2025-11-10 03:47:45', 'active', 0, NULL, 'Physics 9 and 10', '', '', 1.00, 0, 'General Science', 0, '', 10.00, 2.00, 30, '/img/covers/image-1762638309202-119178408.png', NULL, NULL, 'available', 0, 'Bangla', 'https://drive.google.com/file/d/1OL2GWVGSay3yNt5iuA1f2-MIHFUyz5GP/view', '2025-11-09 03:47:45', '2025-11-09 03:47:45'),
(8, 2, 136, 5, 9.00, '2025-11-10 12:57:16', '2025-11-15 12:57:16', 'active', 0, NULL, 'Physics 9 and 10', '', '', 1.00, 0, 'General Science', 0, '', 10.00, 2.00, 30, '/img/covers/image-1762638309202-119178408.png', NULL, NULL, 'available', 0, 'Bangla', 'https://drive.google.com/file/d/1OL2GWVGSay3yNt5iuA1f2-MIHFUyz5GP/view', '2025-11-10 12:57:16', '2025-11-10 12:57:16'),
(9, 3, 136, 1, 1.00, '2025-11-25 13:29:53', '2025-11-26 13:29:53', 'active', 0, NULL, 'Physics 9 and 10', '', '', 1.00, 0, 'General Science', 0, '', 10.00, 2.00, 30, '/img/covers/image-1762638309202-119178408.png', NULL, NULL, 'available', 0, 'Bangla', 'https://drive.google.com/file/d/1OL2GWVGSay3yNt5iuA1f2-MIHFUyz5GP/view', '2025-11-25 13:29:53', '2025-11-25 13:29:53'),
(10, 3, 136, 1, 1.00, '2025-11-25 13:54:01', '2025-11-26 13:54:01', 'active', 0, NULL, 'Physics 9 and 10', '', '', 1.00, 0, 'General Science', 0, '', 10.00, 2.00, 30, '/img/covers/image-1762638309202-119178408.png', NULL, NULL, 'available', 0, 'Bangla', 'https://drive.google.com/file/d/1OL2GWVGSay3yNt5iuA1f2-MIHFUyz5GP/view', '2025-11-25 13:54:01', '2025-11-25 13:54:01'),
(11, 3, 134, 1, 2.00, '2025-11-25 13:54:08', '2025-11-26 13:54:08', 'active', 0, NULL, 'Dsa book pdf', '', '', 2.00, 0, 'Computer Science', 0, '', 10.00, 2.00, 30, '/img/covers/image-1762637994036-331624253.png', NULL, NULL, 'available', 0, 'Bangla', 'https://drive.google.com/file/d/1jOw1JnXb9nTffPuue_r7uE2J3MBhaRJX/view', '2025-11-25 13:54:08', '2025-11-25 13:54:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_rentals`
--
ALTER TABLE `user_rentals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_book_id` (`book_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_expiry_date` (`expiry_date`),
  ADD KEY `idx_user_rental_status` (`user_id`,`status`),
  ADD KEY `idx_user_rental_date` (`user_id`,`rental_date`),
  ADD KEY `idx_book_title` (`title`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_rentals`
--
ALTER TABLE `user_rentals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_rentals`
--
ALTER TABLE `user_rentals`
  ADD CONSTRAINT `user_rentals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_rentals_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
