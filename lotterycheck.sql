-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 11, 2022 at 04:40 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_lotterycheck`
--

-- --------------------------------------------------------

--
-- Table structure for table `lotterycheck`
--

CREATE TABLE `lotterycheck` (
  `id` int(60) NOT NULL,
  `date` varchar(60) NOT NULL,
  `types` varchar(60) NOT NULL,
  `number` varchar(60) NOT NULL,
  `money` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lotterycheck`
--

INSERT INTO `lotterycheck` (`id`, `date`, `types`, `number`, `money`) VALUES
(123, '2022-03-16', 'First Prize', '123456', '6,000,000'),
(201, '2022-03-16', 'Second Prize', '656963', '200,000'),
(202, '2022-03-16', 'Second Prize', '121212', '200,000'),
(203, '2022-03-16', 'Second Prize', '808182', '200,000'),
(204, '2022-03-16', 'Second Prize', '767574', '200,000'),
(205, '2022-03-16', 'Second Prize', '353535', '200,000'),
(301, '2022-03-16', 'Two Digit Suffix', '555555', '2,000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `lotterycheck`
--
ALTER TABLE `lotterycheck`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
