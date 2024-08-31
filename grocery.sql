-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2024 at 05:45 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grocery`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `item_id`, `count`, `created_at`) VALUES
(18, 1, 3, 2, '2024-03-15 12:45:29');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Fruits', 'fruits.png', 1, '2024-03-08 09:22:03', '2024-03-08 09:22:03'),
(2, 'Vegetables', 'vegetables.png', 1, '2024-03-08 09:24:05', '2024-03-08 09:24:05'),
(3, 'Milk', 'milk.png', 1, '2024-03-08 09:24:24', '2024-03-08 09:24:24'),
(4, 'Eggs', '1710313042792-eggs.png', 1, '2024-03-13 06:57:22', '2024-03-13 06:57:22'),
(5, 'Meat', '1710313071743-meat.png', 1, '2024-03-13 06:57:51', '2024-03-13 06:57:51');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `mobile`, `comment`, `created_at`) VALUES
(1, 'Shikha', 'test@gmail.com', '4444444444', 'Testing', '2024-03-12 08:40:18');

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorites`
--

INSERT INTO `favorites` (`id`, `user_id`, `item_id`, `created_at`) VALUES
(3, 1, 1, '2024-03-13 09:25:00'),
(4, 12, 1, '2024-03-15 09:05:35'),
(5, 13, 2, '2024-03-15 09:27:03');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `item_id`, `image`, `created_at`, `updated_at`) VALUES
(3, 1, '1709897087080-Apple.jpg', '2024-03-08 11:24:47', '2024-03-08 11:24:47'),
(7, 2, '1710477603546-carrot.png', '2024-03-15 04:40:03', '2024-03-15 04:40:03'),
(8, 2, '1710477716300-carrot.jpg', '2024-03-15 04:41:56', '2024-03-15 04:41:56'),
(10, 3, '1710494165801-orange1.jpeg', '2024-03-15 09:16:05', '2024-03-15 09:16:05'),
(11, 3, '1710494185237-orange.jpeg', '2024-03-15 09:16:25', '2024-03-15 09:16:25');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `summary` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` double NOT NULL DEFAULT 0,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `summary`, `description`, `category_id`, `price`, `quantity`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Apple', 'An apple a day keeps doctor away', '<h2><span style=\"color: var(--tw-prose-bold);\">Discover Freshness with Our Premium Applesss!</span></h2><p>At our e-grocery store, we take pride in offering the <span style=\"color: var(--tw-prose-bold);\">freshest and highest-quality apples</span> to our customers. Sourced directly from trusted orchards, our apples are handpicked to ensure peak ripeness and flavor. Here\'s why you should choose our apples:</p><ol><li><strong style=\"color: var(--tw-prose-bold);\">Exceptional Quality:</strong> Our apples are carefully selected to meet strict quality standards, guaranteeing a crisp texture and delicious taste with every bite.</li><li><strong style=\"color: var(--tw-prose-bold);\">Variety:</strong> From classic favorites like Red Delicious and Granny Smith to specialty varieties such as Honeycrisp and Gala, we offer a wide range of apple options to satisfy every palate.</li><li><strong style=\"color: var(--tw-prose-bold);\">Nutritional Benefits:</strong> Packed with essential vitamins, minerals, and dietary fiber, apples are not only delicious but also contribute to a healthy lifestyle. They make a perfect snack or ingredient for a variety of recipes.</li><li><strong style=\"color: var(--tw-prose-bold);\">Convenient Delivery:</strong> With our hassle-free online ordering system and prompt delivery service, you can enjoy fresh apples delivered right to your doorstep, ensuring convenience and peace of mind.</li></ol><h3><u style=\"color: var(--tw-prose-bold);\">Experience the Difference</u><span style=\"color: var(--tw-prose-bold);\">:</span> Elevate your snacking and cooking experience with our premium apples. Shop now and indulge in the unparalleled freshness and flavor that only our apples can provide!</h3>', 1, 45, 4, 1, '2024-03-08 10:20:22', '2024-03-08 10:20:22'),
(2, 'Carrot', 'This is a Carrot', '<p>Again This is a carrot</p>', 2, 15, 78, 1, '2024-03-15 04:39:28', '2024-03-15 04:39:28'),
(3, 'Orange', 'American orange', '<p>The price is in kg.</p>', 1, 80, 10, 1, '2024-03-15 09:15:05', '2024-03-15 09:15:05');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `user_id`, `address`, `status`, `created_at`) VALUES
(1, 1, 'Capace Jp nagar 5th Phase', 1, '2024-03-13 11:05:27'),
(2, 2, 'My Address 1', 1, '2024-03-15 04:45:39'),
(3, 12, '103 Brown St', 1, '2024-03-15 09:07:17'),
(4, 13, '12345678', 1, '2024-03-15 09:27:37');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `order_number` varchar(100) NOT NULL,
  `location_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `item_id`, `count`, `order_number`, `location_id`, `status`, `created_at`) VALUES
(1, 1, 1, 1, '6205033031336017', 1, 0, '2024-03-13 11:14:02'),
(2, 2, 2, 4, '8948786436165745', 2, 2, '2024-03-15 04:45:53'),
(3, 2, 2, 3, '2568436508090380', 2, 0, '2024-03-15 04:47:44'),
(4, 12, 1, 3, '4673997115802716', 3, 2, '2024-03-15 09:12:03'),
(5, 12, 2, 6, '4673997115802716', 3, 2, '2024-03-15 09:12:03'),
(7, 13, 2, 1, '4056887863520727', 4, 2, '2024-03-15 09:27:52');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `user_id`, `item_id`, `rating`, `created_at`, `updated_at`) VALUES
(3, 1, 1, 5, '2024-03-13 06:19:42', '2024-03-13 06:19:42'),
(11, 2, 2, 3, '2024-03-15 04:49:12', '2024-03-15 04:49:12');

-- --------------------------------------------------------

--
-- Table structure for table `tokenizer`
--

CREATE TABLE `tokenizer` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokenizer`
--

INSERT INTO `tokenizer` (`id`, `user_id`, `token`, `created_at`, `updated_at`) VALUES
(18, 13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX0lkIjoxMywiVXNlcl9uYW1lIjoiS293c2FseWEiLCJkYXRlIjoiMTUvMy8yMDI0LCAyOjU2OjIxIHBtIiwiaWF0IjoxNzEwNDk0NzgxfQ.VmWqtaRv7YnmvkQwN8F68xSaBxrGmbs1qi4Upstmfuo', '2024-03-15 09:25:32', '2024-03-15 09:26:21'),
(19, 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX0lkIjoxMiwiVXNlcl9uYW1lIjoic2hvbmFsIiwiZGF0ZSI6IjE1LzMvMjAyNCwgNTo0NDoyNyBwbSIsImlhdCI6MTcxMDUwNDg2N30.M_5UMHTjmkJNkwBchpCQzFZxxZpTRlc6SpeNsygGjb8', '2024-03-15 12:14:28', '2024-03-15 12:14:28'),
(20, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyX0lkIjoxLCJVc2VyX25hbWUiOiJTaGlraGEiLCJkYXRlIjoiMTYvMy8yMDI0LCAxMDoxMTo0MCBhbSIsImlhdCI6MTcxMDU2NDEwMX0.ebSwLwkxszZk12y4FqbKGMsWcxXGIZcmkSa4aM0wGYY', '2024-03-15 12:24:14', '2024-03-16 04:41:41');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `mobile`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Shikha', 'test@gmail.com', '8584868589', 'eyJhbGciOiJIUzI1NiJ9.MTIzNDU2Nzg.3f2TisIDYX_z3_XVqJeJutileuPPPw0gX77XoROhfmA', '2024-03-08 07:21:41', '2024-03-13 10:17:54'),
(2, 'Khushboo', '123@gmail.com', '8486858284', 'eyJhbGciOiJIUzI1NiJ9.MTIzNDU2Nzg.3f2TisIDYX_z3_XVqJeJutileuPPPw0gX77XoROhfmA', '2024-03-13 11:48:32', '2024-03-13 11:48:32'),
(9, 'Adithya', 'hr@gmail.com', '8584868589', 'eyJhbGciOiJIUzI1NiJ9.MTIzNDU2Nzg.3f2TisIDYX_z3_XVqJeJutileuPPPw0gX77XoROhfmA', '2024-03-13 12:02:46', '2024-03-13 12:02:46'),
(10, 'Tester', 'tifevix793@dovesilo.com', '9874563210', 'eyJhbGciOiJIUzI1NiJ9.QXNkZkAxMjM0NQ.0JRScq1Ic84ADJRmuBfNi6t3vEAoRICjMxowoBsA9Zg', '2024-03-15 06:03:46', '2024-03-15 06:03:46'),
(11, 'Test', '1234@gmail.com', '8681858888', 'eyJhbGciOiJIUzI1NiJ9.MTIzNDU2Nzg.3f2TisIDYX_z3_XVqJeJutileuPPPw0gX77XoROhfmA', '2024-03-15 07:19:16', '2024-03-15 07:19:16'),
(12, 'shonal', 'sonal@gmail.com', '9685636563', 'eyJhbGciOiJIUzI1NiJ9.MTIzNDU2Nzg.3f2TisIDYX_z3_XVqJeJutileuPPPw0gX77XoROhfmA', '2024-03-15 09:05:00', '2024-03-15 09:05:00'),
(13, 'Kowsalya', 'kowsalya.s@capace.co.in', '8485868987', 'eyJhbGciOiJIUzI1NiJ9.MTIzNDU2Nzg.3f2TisIDYX_z3_XVqJeJutileuPPPw0gX77XoROhfmA', '2024-03-15 09:22:20', '2024-03-15 09:22:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_favorites` (`user_id`,`item_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id_2` (`user_id`,`item_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `tokenizer`
--
ALTER TABLE `tokenizer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tokenizer`
--
ALTER TABLE `tokenizer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- Constraints for table `tokenizer`
--
ALTER TABLE `tokenizer`
  ADD CONSTRAINT `tokenizer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
