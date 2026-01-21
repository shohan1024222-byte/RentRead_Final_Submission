-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2025 at 05:31 PM
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
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `price_per_day` decimal(10,2) DEFAULT 5.00,
  `total_pages` int(11) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1,
  `filename` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `base_price` decimal(8,2) DEFAULT 10.00,
  `daily_increment` decimal(5,2) DEFAULT 2.00,
  `max_rental_days` int(11) DEFAULT 30,
  `image_url` varchar(500) DEFAULT NULL,
  `pdf_file` varchar(255) DEFAULT NULL,
  `file_size` varchar(20) DEFAULT NULL,
  `availability_status` enum('available','maintenance','discontinued') DEFAULT 'available',
  `total_rented` int(11) DEFAULT 0,
  `language` varchar(50) DEFAULT 'Bangla',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `drive_link` varchar(500) DEFAULT NULL COMMENT 'Google Drive shareable link for the book'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `description`, `author`, `price_per_day`, `total_pages`, `category`, `is_available`, `filename`, `created_at`, `base_price`, `daily_increment`, `max_rental_days`, `image_url`, `pdf_file`, `file_size`, `availability_status`, `total_rented`, `language`, `updated_at`, `drive_link`) VALUES
(131, 'algorithm book pdf', '', '', 1.00, 0, 'Computer Science', 0, '', '2025-11-08 21:35:34', 10.00, 2.00, 30, '/img/covers/image-1762637734178-293883024.png', NULL, NULL, 'available', 0, 'Bangla', '2025-11-08 21:35:34', 'https://drive.google.com/file/d/1BZ-grpvaMTN_9QsDV0NMByF-5WDcDfZt/view'),
(132, 'Theory of Computer Science Automata', '', '', 1.00, 0, 'Computer Science', 0, '', '2025-11-08 21:36:47', 10.00, 2.00, 30, '/img/covers/image-1762637807134-112668398.png', NULL, NULL, 'available', 0, 'Bangla', '2025-11-08 21:36:47', 'https://drive.google.com/file/d/1-CwQ3bcSEUUDLLiK4Z3f6Cw-7mZ7rJNs/view'),
(133, 'Microprocessors and Microcomputer', '', '', 1.00, 0, 'Computer Science', 0, '', '2025-11-08 21:38:31', 10.00, 2.00, 30, '/img/covers/image-1762637911346-579364272.png', NULL, NULL, 'available', 0, 'Bangla', '2025-11-08 21:38:31', 'https://drive.google.com/file/d/136FHsdcdvw3B_-TiWKV_cAXkVWO5svTk/view'),
(134, 'Dsa book pdf', '', '', 2.00, 0, 'Computer Science', 0, '', '2025-11-08 21:39:54', 10.00, 2.00, 30, '/img/covers/image-1762637994036-331624253.png', NULL, NULL, 'available', 0, 'Bangla', '2025-11-08 21:39:54', 'https://drive.google.com/file/d/1jOw1JnXb9nTffPuue_r7uE2J3MBhaRJX/view'),
(135, 'Nursery-Rhymes-Book', '', '', 0.30, 0, 'Extra Educational', 0, '', '2025-11-08 21:42:34', 10.00, 2.00, 30, '/img/covers/image-1764173474586-403674246.png', NULL, NULL, 'available', 0, 'Bangla', '2025-11-26 16:11:14', 'https://drive.google.com/file/d/1gwPZ_QyPuVVURuuqpBiGWwZ80MwSugPD/view'),
(136, 'Physics 9 and 10', '', '', 1.00, 0, 'General Science', 0, '', '2025-11-08 21:45:09', 10.00, 2.00, 30, '/img/covers/image-1762638309202-119178408.png', NULL, NULL, 'available', 0, 'Bangla', '2025-11-08 21:45:09', 'https://drive.google.com/file/d/1OL2GWVGSay3yNt5iuA1f2-MIHFUyz5GP/view'),
(138, 'df', 'kh', 'gk', 0.02, 0, 'Science Fiction', 0, '', '2025-11-26 16:28:29', 10.00, 2.00, 30, '/img/covers/image-1764174569006-26573133.png', NULL, NULL, 'available', 0, 'Bangla', '2025-11-26 16:29:29', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_filename` (`filename`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_available` (`is_available`),
  ADD KEY `idx_book_category` (`category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
