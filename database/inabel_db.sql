-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 03, 2023 at 03:29 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inabel_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE IF NOT EXISTS `address` (
  `addressID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `street` varchar(50) DEFAULT NULL,
  `houseNo` varchar(50) DEFAULT NULL,
  `barangay` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `region` varchar(50) DEFAULT NULL,
  `postalCode` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`addressID`),
  KEY `fkUID_idx` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`addressID`, `userID`, `street`, `houseNo`, `barangay`, `city`, `province`, `region`, `postalCode`) VALUES
(1, 11, '65 Gabaya', NULL, 'Barretto', 'Olongapo', 'Zambales', '3', '2200'),
(2, 5, 'Maybank', NULL, NULL, 'Teppeng', 'Teppeng', '2', '2733'),
(3, 13, 'Jardine Davies Building', NULL, NULL, 'Makati', 'Metro Manila', '13', '1224'),
(4, 13, '88 Phils', '128', 'New Kalalake', 'Olongapo', 'Zambales', '3', '2200'),
(5, 5, NULL, NULL, NULL, 'Baguio', 'Benguet', '14', '2600'),
(6, 9, 'National Highway', NULL, 'Marauoy', 'Lipa', 'Batangas', '4', '4217'),
(7, 10, NULL, NULL, 'Tuding', 'Itogon', 'Benguet', '14', '2604'),
(8, 12, NULL, NULL, NULL, 'Asingan', 'Pangasinan', '1', '2439'),
(9, 3, '58 A Rita', NULL, NULL, 'San Juan', 'Metro Manila', '13', '1500'),
(10, 10, NULL, NULL, 'San Sebastian', 'Tarlac', 'Tarlac', '3', '2300');

-- --------------------------------------------------------

--
-- Table structure for table `attribute`
--

DROP TABLE IF EXISTS `attribute`;
CREATE TABLE IF NOT EXISTS `attribute` (
  `attributeID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`attributeID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attribute`
--

INSERT INTO `attribute` (`attributeID`, `name`) VALUES
(1, 'size'),
(2, 'color'),
(3, 'textile');

-- --------------------------------------------------------

--
-- Table structure for table `attribute_value`
--

DROP TABLE IF EXISTS `attribute_value`;
CREATE TABLE IF NOT EXISTS `attribute_value` (
  `attributeID` int(11) NOT NULL,
  `attribute_valueID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `imageSource` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`attribute_valueID`),
  UNIQUE KEY `UIname` (`name`),
  UNIQUE KEY `UIimageSource` (`imageSource`),
  KEY `fkAAV` (`attributeID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attribute_value`
--

INSERT INTO `attribute_value` (`attributeID`, `attribute_valueID`, `name`, `imageSource`) VALUES
(1, 1, 'small', NULL),
(1, 2, 'medium', NULL),
(1, 3, 'large', NULL),
(2, 4, 'blue', NULL),
(2, 5, 'red', NULL),
(2, 6, 'yellow', NULL),
(2, 7, 'black', NULL),
(2, 8, 'violet', NULL),
(3, 9, 'TEX1-GR', NULL),
(3, 10, 'TEX2-MR', NULL),
(3, 11, 'TEX3-BRTK', NULL),
(3, 12, 'TEX4-BRTN', NULL),
(3, 13, 'TEX5-RG', NULL),
(3, 14, 'TEX6-PDM', NULL),
(2, 15, 'green', NULL),
(2, 16, 'mustard', NULL),
(2, 17, 'navy blue', NULL),
(2, 18, 'gray', NULL),
(2, 19, 'baby pink', NULL),
(2, 20, 'hot pink', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `categoryID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`categoryID`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryID`, `name`) VALUES
(3, 'Accessories and Others'),
(2, 'Bags and Pouches'),
(1, 'Clothings');

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
CREATE TABLE IF NOT EXISTS `delivery` (
  `deliveryID` int(11) NOT NULL AUTO_INCREMENT,
  `orderID` int(11) NOT NULL,
  `dateShipped` date DEFAULT NULL,
  `dateDelivered` date DEFAULT NULL,
  `courierType` enum('J&T','JRS') NOT NULL,
  `deliveryStatus` enum('pending','preparing','in-transit','delivered') NOT NULL,
  PRIMARY KEY (`deliveryID`),
  KEY `fkDO_idx` (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `delivery`
--

INSERT INTO `delivery` (`deliveryID`, `orderID`, `dateShipped`, `dateDelivered`, `courierType`, `deliveryStatus`) VALUES
(1, 1, '2020-01-27', '2020-01-31', 'J&T', 'delivered'),
(2, 2, '2020-03-07', '2020-03-11', 'JRS', 'delivered'),
(3, 3, '2020-06-13', '2020-06-17', 'J&T', 'delivered'),
(4, 4, '2020-07-11', '2020-07-16', 'J&T', 'delivered'),
(5, 5, '2020-07-22', '2020-07-26', 'JRS', 'delivered'),
(6, 6, '2020-08-09', '2020-08-14', 'JRS', 'delivered'),
(7, 7, '2020-09-09', '2020-09-14', 'J&T', 'delivered'),
(8, 8, '2020-09-23', '2020-09-28', 'J&T', 'delivered'),
(9, 9, NULL, NULL, 'JRS', 'preparing'),
(10, 10, '2021-11-10', NULL, 'JRS', 'in-transit'),
(11, 11, NULL, NULL, 'J&T', 'preparing'),
(12, 33, NULL, NULL, 'JRS', 'preparing'),
(13, 34, NULL, NULL, 'JRS', 'preparing'),
(14, 35, NULL, NULL, 'JRS', 'preparing'),
(15, 36, NULL, NULL, 'JRS', 'preparing');

-- --------------------------------------------------------

--
-- Table structure for table `measurement`
--

DROP TABLE IF EXISTS `measurement`;
CREATE TABLE IF NOT EXISTS `measurement` (
  `measurementID` int(11) NOT NULL AUTO_INCREMENT,
  `orderID` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `bust` int(55) DEFAULT NULL,
  `waist` int(55) DEFAULT NULL,
  `hips` int(55) DEFAULT NULL,
  `back_width` int(55) DEFAULT NULL,
  `front_chest` int(55) DEFAULT NULL,
  `shoulder` int(55) DEFAULT NULL,
  `neck_size` int(55) DEFAULT NULL,
  `sleeve` int(55) DEFAULT NULL,
  `under_bust` int(55) DEFAULT NULL,
  `wrist` int(55) DEFAULT NULL,
  `upper_arm` int(55) DEFAULT NULL,
  `calf` int(55) DEFAULT NULL,
  `ankle` int(55) DEFAULT NULL,
  `nape_waist` int(55) DEFAULT NULL,
  `waist_hip` int(55) DEFAULT NULL,
  `frontShoulder_waist` int(55) DEFAULT NULL,
  `outside_leg` int(55) DEFAULT NULL,
  `inside_leg` int(55) DEFAULT NULL,
  `waist_custLength` int(55) DEFAULT NULL,
  PRIMARY KEY (`measurementID`),
  KEY `fkOM` (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `measurement`
--

INSERT INTO `measurement` (`measurementID`, `orderID`, `productName`, `bust`, `waist`, `hips`, `back_width`, `front_chest`, `shoulder`, `neck_size`, `sleeve`, `under_bust`, `wrist`, `upper_arm`, `calf`, `ankle`, `nape_waist`, `waist_hip`, `frontShoulder_waist`, `outside_leg`, `inside_leg`, `waist_custLength`) VALUES
(1, 8, 'Topper', 23, 23, NULL, 12, 54, 34, NULL, NULL, 35, NULL, 12, NULL, NULL, NULL, NULL, 56, NULL, NULL, 0),
(2, 17, 'Filipiniana', 45, 35, NULL, 38, 45, 34, NULL, NULL, 30, NULL, 23, NULL, NULL, NULL, NULL, 56, NULL, NULL, 0),
(3, 18, 'Topper', 34, 34, NULL, 34, 40, 23, NULL, NULL, 34, NULL, 12, NULL, NULL, NULL, NULL, 35, NULL, NULL, 0),
(4, 19, 'Skirt', NULL, 28, 30, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 16);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `addressID` int(11) DEFAULT NULL,
  `userID` int(11) NOT NULL,
  `measurementID` int(11) DEFAULT NULL,
  `attribute_valueID` int(11) DEFAULT NULL,
  `dateOrdered` date NOT NULL,
  `orderStatus` enum('pending','confirmed','in-transit','complete','cancelled','return') NOT NULL,
  `orderType` enum('customized','pre-made') NOT NULL,
  `totalAmount` double(12,2) UNSIGNED NOT NULL,
  PRIMARY KEY (`orderID`),
  KEY `fkAO_idx` (`addressID`),
  KEY `fkAU_idx` (`userID`),
  KEY `fkAVO` (`attribute_valueID`),
  KEY `fkMO` (`measurementID`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`orderID`, `addressID`, `userID`, `measurementID`, `attribute_valueID`, `dateOrdered`, `orderStatus`, `orderType`, `totalAmount`) VALUES
(1, 1, 11, NULL, NULL, '2020-01-24', 'complete', 'pre-made', 800.00),
(2, 2, 5, NULL, NULL, '2020-03-04', 'complete', 'pre-made', 1500.00),
(3, 3, 13, NULL, NULL, '2020-06-10', 'complete', 'pre-made', 20000.00),
(4, 4, 13, NULL, NULL, '2020-07-08', 'complete', 'pre-made', 3000.00),
(5, 5, 5, NULL, NULL, '2020-07-18', 'complete', 'pre-made', 450.00),
(6, 6, 9, NULL, NULL, '2020-08-05', 'complete', 'pre-made', 1800.00),
(7, 7, 10, NULL, NULL, '2020-09-04', 'complete', 'pre-made', 2500.00),
(8, 8, 12, 1, 11, '2020-09-20', 'complete', 'customized', 15000.00),
(9, 9, 3, NULL, 14, '2021-10-30', 'pending', 'pre-made', 1800.00),
(10, 9, 3, NULL, 9, '2021-11-04', 'pending', 'pre-made', 800.00),
(11, 10, 10, NULL, NULL, '2021-11-06', 'pending', 'pre-made', 300.00),
(12, 10, 10, NULL, NULL, '2022-02-16', 'pending', 'pre-made', 1500.00),
(13, 1, 13, NULL, 3, '2022-11-09', 'complete', 'pre-made', 1500.00),
(14, 9, 3, NULL, NULL, '2021-02-16', 'confirmed', 'pre-made', 63000.00),
(15, 6, 9, NULL, NULL, '2021-02-16', 'confirmed', 'pre-made', 49400.00),
(16, 9, 3, NULL, NULL, '2021-08-18', 'cancelled', 'pre-made', 3240.00),
(17, 7, 10, 2, 14, '2022-09-23', 'complete', 'pre-made', 14000.00),
(18, 10, 10, 3, 12, '2022-09-24', 'pending', 'customized', 90305.00),
(19, 10, 10, 4, 11, '2022-09-25', 'pending', 'customized', 1500.00),
(20, 6, 9, NULL, NULL, '2022-09-26', 'pending', 'pre-made', 10800.00),
(21, 8, 12, NULL, NULL, '2022-09-27', 'complete', 'pre-made', 12000.00),
(22, 7, 10, NULL, NULL, '2022-09-28', 'complete', 'pre-made', 40000.00),
(23, 4, 13, NULL, 9, '2022-09-29', 'complete', 'customized', 12425.00),
(24, 5, 5, NULL, 13, '2022-09-30', 'in-transit', 'customized', 600.00),
(25, 3, 13, NULL, 12, '2022-10-01', 'in-transit', 'customized', 3720.00),
(26, 6, 9, NULL, NULL, '2022-10-02', 'in-transit', 'pre-made', 16200.00),
(27, 2, 5, NULL, NULL, '2022-10-03', 'in-transit', 'pre-made', 15600.00),
(28, 8, 12, NULL, 13, '2022-10-04', 'in-transit', 'customized', 46800.00),
(29, 6, 9, NULL, 10, '2022-10-05', 'pending', 'customized', 128800.00),
(30, 10, 10, NULL, 9, '2023-01-09', 'pending', 'customized', 184200.00),
(31, 1, 1, NULL, NULL, '2022-11-12', 'pending', 'pre-made', 800.00),
(32, 1, 11, NULL, NULL, '2022-11-12', 'pending', 'pre-made', 800.00),
(33, 6, 9, NULL, NULL, '2022-11-19', 'pending', 'pre-made', 3555.00),
(34, 6, 9, NULL, NULL, '2022-11-19', 'pending', 'pre-made', 10155.00),
(35, 6, 9, NULL, NULL, '2022-11-19', 'pending', 'pre-made', 7055.00),
(36, 2, 5, NULL, NULL, '2022-11-19', 'pending', 'pre-made', 1555.00),
(37, 2, 16, NULL, NULL, '2023-02-03', 'pending', 'pre-made', 5000.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_customized`
--

DROP TABLE IF EXISTS `order_customized`;
CREATE TABLE IF NOT EXISTS `order_customized` (
  `order_customizedID` int(11) NOT NULL AUTO_INCREMENT,
  `orderID` int(11) NOT NULL,
  `textileID` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `price` double(12,2) NOT NULL,
  PRIMARY KEY (`order_customizedID`),
  KEY `fkTOC` (`textileID`),
  KEY `fkOOC` (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_customized`
--

INSERT INTO `order_customized` (`order_customizedID`, `orderID`, `textileID`, `productName`, `price`) VALUES
(1, 8, 1, 'Topper', 2700.00),
(2, 17, 2, 'Filipiniana', 2500.00),
(3, 18, 3, 'Topper', 2300.00),
(4, 19, 4, 'Skirt', 1800.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
CREATE TABLE IF NOT EXISTS `order_product` (
  `productID` int(11) NOT NULL,
  `orderID` int(11) NOT NULL,
  `quantity` int(30) NOT NULL,
  `amount` double(12,2) NOT NULL,
  KEY `productID_UNIQUE` (`productID`) USING BTREE,
  KEY `orderID_UNIQUE` (`orderID`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_product`
--

INSERT INTO `order_product` (`productID`, `orderID`, `quantity`, `amount`) VALUES
(26, 1, 1, 800.00),
(8, 2, 1, 1500.00),
(36, 3, 8, 20000.00),
(32, 4, 1, 500.00),
(17, 4, 1, 2500.00),
(33, 5, 3, 450.00),
(20, 6, 1, 1800.00),
(13, 7, 1, 2500.00),
(4, 8, 6, 15000.00),
(39, 9, 15, 1800.00),
(29, 10, 1, 800.00),
(27, 11, 2, 300.00),
(31, 12, 3, 1500.00),
(3, 13, 1, 1500.00),
(38, 13, 23, 62100.00),
(15, 14, 35, 63000.00),
(18, 15, 31, 31000.00),
(22, 15, 23, 18400.00),
(39, 16, 24, 3240.00),
(3, 17, 7, 14000.00),
(7, 18, 10, 25000.00),
(46, 18, 14, 1400.00),
(10, 18, 21, 31500.00),
(50, 18, 23, 3105.00),
(6, 18, 5, 9500.00),
(11, 19, 1, 1500.00),
(57, 20, 18, 10800.00),
(28, 21, 24, 12000.00),
(5, 22, 16, 40000.00),
(10, 23, 4, 6000.00),
(46, 23, 17, 1700.00),
(39, 23, 35, 4725.00),
(34, 24, 6, 600.00),
(59, 25, 6, 3720.00),
(15, 26, 9, 16200.00),
(8, 27, 12, 15600.00),
(20, 28, 26, 46800.00),
(60, 29, 13, 27300.00),
(31, 29, 11, 5500.00),
(58, 30, 33, 125400.00),
(34, 30, 34, 3400.00),
(5, 30, 22, 55000.00),
(47, 30, 4, 400.00);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `paymentID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `orderID` int(11) NOT NULL,
  `amountPaid` double(12,2) UNSIGNED NOT NULL,
  `paymentType` enum('Direct Bank Transfer','Digital Wallet') NOT NULL,
  `paymentName` varchar(45) NOT NULL,
  `paymentDate` date NOT NULL,
  `referenceNo` varchar(255) NOT NULL,
  `paymentStatus` enum('pending','paid','partially paid','refunded') NOT NULL,
  PRIMARY KEY (`paymentID`),
  KEY `fkUP_idx` (`userID`),
  KEY `fkOP` (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`paymentID`, `userID`, `orderID`, `amountPaid`, `paymentType`, `paymentName`, `paymentDate`, `referenceNo`, `paymentStatus`) VALUES
(1, 11, 1, 800.00, 'Direct Bank Transfer', 'BDO', '2020-01-25', 'Z170327EO3', 'paid'),
(2, 5, 2, 1500.00, 'Direct Bank Transfer', 'BDO', '2020-03-05', 'Q208981SP8', 'paid'),
(3, 13, 3, 20000.00, 'Digital Wallet', 'Gcash', '2020-06-11', 'R454338TO6', 'paid'),
(4, 13, 4, 3000.00, 'Digital Wallet', 'Gcash', '2020-07-09', 'W586947LC2', 'paid'),
(5, 5, 5, 450.00, 'Direct Bank Transfer', 'BDO', '2020-07-20', 'J208487LC6', 'paid'),
(6, 9, 6, 1800.00, 'Digital Wallet', 'Gcash', '2020-08-07', 'F916348TU6', 'paid'),
(7, 10, 7, 2500.00, 'Direct Bank Transfer', 'Unionbank', '2020-09-07', 'G285863LD3', 'paid'),
(8, 12, 8, 5000.00, 'Direct Bank Transfer', 'Unionbank', '2020-09-21', 'I197389YI3', 'partially paid'),
(9, 12, 8, 10000.00, 'Direct Bank Transfer', 'Unionbank', '2020-09-25', 'M870298YI4', 'paid'),
(10, 3, 9, 1000.00, 'Digital Wallet', 'Gcash', '2021-11-01', 'B026471EW2', 'partially paid'),
(11, 10, 10, 0.00, 'Digital Wallet', 'Gcash', '2021-11-07', 'U557552QN3', 'pending'),
(12, 3, 11, 150.00, 'Direct Bank Transfer', 'BPI', '2021-11-08', 'H579248EV1', 'partially paid'),
(13, 12, 12, 0.00, 'Digital Wallet', 'Gcash', '2022-02-18', 'M880332CR9', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `productID` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) CHARACTER SET latin1 NOT NULL,
  `price` double(12,2) UNSIGNED NOT NULL,
  `qtyStock` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `sub_categoryID` int(11) DEFAULT NULL,
  `attribute_valueID` int(11) DEFAULT NULL,
  `productDesc` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `imageSource` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `SKU` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`productID`),
  UNIQUE KEY `SKU` (`SKU`),
  KEY `fkCP_idx` (`categoryID`),
  KEY `fkSCP` (`sub_categoryID`),
  KEY `fkAVP` (`attribute_valueID`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productID`, `productName`, `price`, `qtyStock`, `categoryID`, `sub_categoryID`, `attribute_valueID`, `productDesc`, `imageSource`, `SKU`) VALUES
(1, 'Filipiniana - Small', 1500.00, 100, 1, 1, 1, 'A traditional attire for women in the Philippines.', '/products/Filipiniana_Red.JPG', NULL),
(2, 'Filipiniana - Medium', 1800.00, 100, 1, 1, 2, 'A traditional attire for women in the Philippines.', '/products/Filipiniana_Black.JPG', NULL),
(3, 'Filipiniana - Large', 2000.00, 100, 1, 1, 3, 'A traditional attire for women in the Philippines.', '/products/Filipiniana_Violet.JPG', NULL),
(4, 'Binakol Short Topper - Blue and White Katarines', 2500.00, 100, 1, 3, 2, 'A loose fitting upper top worn by men or women', '/products/BinakolShortTopper_BlueandWhiteKatarines.png', NULL),
(5, 'Binakol Short Topper - Gray', 2500.00, 100, 1, 3, 2, 'A loose fitting upper top worn by men or women', '/products/BinakolShortTopper_Gray.png', ''),
(6, 'Binakol Short Topper - Red', 1900.00, 100, 1, 3, 2, 'A loose fitting upper top worn by men or women', '/products/BinakolShortTopper_Red.png', NULL),
(7, 'Binakol Long Topper - Gray', 2500.00, 100, 1, 3, 2, 'Longer than the regular cut (topper)', '/products/BinakolLongTopper_Gray.png', NULL),
(8, 'Chaleco - Navy Blue', 1300.00, 100, 1, 3, 2, 'Made with woven cotton or polyester cotton', '/products/Chaleco_NavyBlue.png', NULL),
(9, 'Poncho', 2500.00, 100, 1, 1, NULL, 'A short, sleeveless, tightfitting garment worn by men', '/products/DefaultShirtIcon1.png', NULL),
(10, 'Vest - Violet', 1500.00, 100, 1, 3, 2, 'A piece of clothing like a jacket without a sleeves', '/products/Vest_VioletStripes.png', NULL),
(11, 'Skirt', 1500.00, 100, 1, 1, NULL, 'Come in several lengths and types', '/products/Skirt.png', NULL),
(12, 'Puff blouse', 2000.00, 100, 1, 1, NULL, 'Short sleeve gathered at the top and cuff', '/products/DefaultShirtIcon1.png', NULL),
(13, 'Polo', 2500.00, 100, 1, 2, NULL, 'A casual short-sleeve with a collar and buttons', '/products/Polo.png', NULL),
(14, 'Chaleco', 2000.00, 100, 1, 2, NULL, 'A similar garment worn by women', '/products/DefaultShirtIcon1.png', NULL),
(15, 'Haori - Small', 1800.00, 100, 1, 3, 1, 'Loose outer wear resembling a coat', '/products/DefaultShirtIcon1.png', NULL),
(16, 'Haori - Medium', 2000.00, 100, 1, 3, 2, 'Loose outer wear resembling a coat', '/products/DefaultShirtIcon1.png', NULL),
(17, 'Haori - Large', 2500.00, 100, 1, 3, 3, 'Loose outer wear resembling a coat', '/products/DefaultShirtIcon1.png', NULL),
(18, 'Shawl', 1000.00, 100, 1, 3, NULL, 'A square or oblong used as a covering for head or shoulders', '/products/DefaultShirtIcon1.png', NULL),
(19, 'Leather Backpack', 2300.00, 100, 2, NULL, NULL, 'Most durable and can withstand a lot of wear', '/products/LeatherBackpack.png', NULL),
(20, 'Plain Backpack textile', 1800.00, 100, 2, NULL, NULL, 'Basically a plain weave fabric', '/products/DefaultShirtIcon1.png', NULL),
(21, 'Shoulder bag - Violet Stripes', 1200.00, 100, 2, NULL, 8, 'With adjustable strap to be carried under your arm', '/products/ShoulderBag_VioletStripes.png', NULL),
(22, 'Bucket bag', 800.00, 100, 2, NULL, NULL, 'A handy drawstring make it simple to use', '/products/DefaultShirtIcon1.png', NULL),
(23, 'Holster bag', 1200.00, 100, 2, NULL, NULL, 'Small bag for carrying a usually small item', '/products/HolsterBag.png', NULL),
(24, 'Body bag', 1200.00, 100, 2, NULL, NULL, 'Large bag used for transportation/travel', '/products/DefaultShirtIcon1.png', NULL),
(25, 'Mini Sling Bag - Red Green', 640.00, 100, 2, NULL, NULL, 'Much like a backpack but with a single strap', '/products/MiniSlingBag_RedGreen.png', NULL),
(26, 'Lunchbox bag', 800.00, 100, 2, NULL, NULL, 'A box that you can take with you', '/products/DefaultShirtIcon1.png', NULL),
(27, 'Neck pouch - Small', 150.00, 100, 2, NULL, 1, 'Small thin bag with a narrow neck strap', '/products/DefaultShirtIcon1.png', NULL),
(28, 'Neck pouch - Medium', 500.00, 100, 2, NULL, 2, 'Small thin bag with a narrow neck strap', '/products/DefaultShirtIcon1.png', NULL),
(29, 'Neck pouch - Large', 800.00, 100, 2, NULL, 3, 'Small thin bag with a narrow neck strap', '/products/DefaultShirtIcon1.png', NULL),
(30, 'Handheld pouch', 500.00, 100, 2, NULL, NULL, 'Typically made of heavy paper and used for carring small purchases', '/products/DefaultShirtIcon1.png', NULL),
(31, 'Ladies Wallet', 500.00, 100, 2, NULL, NULL, 'Use to carry yoour currency or cards', '/products/LadiesWallet.jpg', NULL),
(32, 'Tumbler Holder', 500.00, 100, 2, NULL, NULL, 'A metal with a handle', '/products/TumblerHolder.png', NULL),
(33, 'Alcohol Holder', 150.00, 100, 2, NULL, NULL, 'Handy holder for alcohol or sanitizer', '/products/AlcoholHolder.png', NULL),
(34, 'Coin Purse', 100.00, 100, 2, NULL, NULL, 'Small pouch for carrying coins (money)', '/products/CoinPurse.png', NULL),
(35, 'Cleo Bag', 2500.00, 100, 2, NULL, 5, 'A sleek flowing lines highlighted by unique rounded bottom', '/products/CleoBag_Red.jpg', NULL),
(36, 'Cleo Bag', 2500.00, 100, 2, NULL, 7, 'A sleek flowing lines highlighted by unique rounded bottom', '/products/CleoBag_Black.jpg', NULL),
(37, 'Athena Bag', 2700.00, 100, 2, NULL, 5, 'An ideal daily option for a workplace', '/products/AthenaBag_Red.jpg', NULL),
(38, 'Athena Bag', 2700.00, 100, 2, NULL, 7, 'An ideal daily option for a workplace', '/products/AthenaBag_Black.jpg', NULL),
(39, 'Facemask - Green', 135.00, 100, 3, NULL, 15, 'Worn over or in front of the face', '/products/Facemask_Green.png', NULL),
(40, 'Headband - Baby Pink', 135.00, 100, 3, NULL, 19, 'Worn in the hair or around the forehead', '/products/Headband_BabyPink.png', NULL),
(41, 'Bandana', 180.00, 100, 3, NULL, NULL, 'A large colorful patterned handkerchief', '/products/DefaultShirtIcon1.png', NULL),
(42, 'Cellphone Case', 500.00, 100, 3, NULL, NULL, 'Use to protect back and sides of your cellphone', '/products/DefaultShirtIcon1.png', NULL),
(43, 'Belt Bag - Red Yellow', 750.00, 100, 2, NULL, NULL, 'Bag worn on the belt area.', '/products/BeltBag_RedYelllow.png', NULL),
(44, 'Belt Bag - Red', 750.00, 100, 2, NULL, 5, 'Bag worn on the belt area.', '/products/BeltBag_Red.png', NULL),
(45, 'Coin Purse - Blue Orange', 100.00, 100, 2, NULL, NULL, 'Small pouch for carrying coins (money)', '/products/CoinPurse_BlueOrange.png', NULL),
(46, 'Coin Purse - Mustard', 100.00, 100, 2, NULL, 16, 'Small pouch for carrying coins (money)', '/products/CoinPurse_Mustard.png', NULL),
(47, 'Coin Purse - Red', 100.00, 100, 2, NULL, 5, 'Small pouch for carrying coins (money)', '/products/CoinPurse_Red.png', NULL),
(48, 'Facemask - Red White', 135.00, 100, 3, NULL, NULL, 'Worn over or in front of the face', '/products/Facemask_RedWhite.png', NULL),
(49, 'Facemask - Red', 135.00, 100, 3, NULL, 5, 'Worn over or in front of the face', '/products/Facemask_Red.png', NULL),
(50, 'Facemask - Yellow', 135.00, 100, 3, NULL, 6, 'Worn over or in front of the face', '/products/Facemask_Yellow.png', NULL),
(51, 'Handbag - Small', 1350.00, 100, 2, NULL, 1, 'Small bag for everyday use.', '/products/Handbag_Small.png', NULL),
(52, 'Headband - Plain Hotpink', 135.00, 100, 3, NULL, 20, 'Worn in the hair or around the forehead', '/products/Headband_PlainHotpink.png', NULL),
(53, 'Headband - Violet', 135.00, 100, 3, NULL, 8, 'Worn in the hair or around the forehead', '/products/Headband_Violet.png', NULL),
(54, 'INI Long Wallet - Red Yellow', 715.00, 100, 2, NULL, NULL, 'Use to carry your currency or cards', '/products/INILongWallet_RedYellow.png', NULL),
(55, 'INI Long Wallet - Red', 715.00, 100, 2, NULL, 5, 'Use to carry your currency or cards', '/products/INILongWallet_Red.png', NULL),
(56, 'INI Long Wallet - Violet', 715.00, 100, 2, NULL, 8, 'Use to carry your currency or cards', '/products/INILongWallet_Violet.png', NULL),
(57, 'INI T-shirt', 600.00, 100, 1, NULL, 2, 'Tshirt designed with textile fabrics', '/products/INIT-shirt.png', NULL),
(58, 'Kalinga Dress - Red', 3800.00, 100, 1, NULL, 5, 'A red Kalinga Dress', '/products/KalingaDress_Red.png', NULL),
(59, 'Mini Sling Bag - Red', 620.00, 100, 2, NULL, 5, 'Much like a backpack but with a single strap', '/products/MiniSlingBag_Red.png', NULL),
(60, 'Mountain Province Short Topper - Green', 2100.00, 100, 1, NULL, 15, 'A loose fitting upper top worn by men or women', '/products/MountainProvinceShortTopper_Green.png', NULL),
(61, 'Kalinga Short Topper', 2000.00, 100, 1, NULL, 15, 'A loose fitting upper top worn by men or women', '/products/KalingaShortTopper_Green.png', NULL),
(62, 'Wrist Pouch', 600.00, 100, 2, NULL, NULL, 'Small pouch that we can hang on our wrist', '/products/WristPouch.png', NULL),
(63, 'Facemask - Gray', 135.00, 100, 3, NULL, 18, 'Worn over or in front of the face', '/products/Facemask_Gray.png', NULL),
(64, 'Facemask - Pink', 135.00, 100, 3, NULL, 20, 'Worn over or in front of the face', '/products/Facemask_Pink.png', NULL),
(65, 'Filipiniana - Red Black', 1500.00, 100, 1, 1, 1, 'A traditional attire for women in the Philippines.', '/products/Filipiniana_RedBlack.png', NULL),
(66, 'Vest - Dark Blue', 1500.00, 100, 1, 3, 2, 'A piece of clothing like a jacket without sleeves', '/products/Vest_DarkBlue.png', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
CREATE TABLE IF NOT EXISTS `ratings` (
  `ratingsID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `datePosted` date NOT NULL,
  `rating` double(5,1) NOT NULL,
  `review` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ratingsID`),
  KEY `fkUR` (`userID`),
  KEY `fkPR` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`ratingsID`, `userID`, `productID`, `datePosted`, `rating`, `review`) VALUES
(1, 11, 26, '2020-02-04', 5.0, 'Gave the product as a gift. My sister really liked it. Thank you!'),
(2, 5, 8, '2020-03-14', 3.5, 'salamat mas maganda pa sa shapi kaso bagal ng delivery'),
(3, 13, 36, '2020-06-20', 4.5, 'Really like the bag! I\'ll bili more next time ;)'),
(4, 5, 33, '2020-07-23', 4.0, 'nawala covid ko dahil dito thank u'),
(5, 9, 20, '2020-07-28', 5.0, 'sxhet sobrang astig'),
(6, 10, 13, '2022-11-08', 5.0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stock_log`
--

DROP TABLE IF EXISTS `stock_log`;
CREATE TABLE IF NOT EXISTS `stock_log` (
  `stock_logID` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `productID` int(11) NOT NULL,
  `batchCode` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`stock_logID`),
  KEY `fkPSL` (`productID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
CREATE TABLE IF NOT EXISTS `sub_category` (
  `categoryID` int(11) NOT NULL,
  `sub_categoryID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`sub_categoryID`),
  KEY `fkSCC` (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`categoryID`, `sub_categoryID`, `name`) VALUES
(1, 1, 'Women'),
(1, 2, 'Men'),
(1, 3, 'Unisex');

-- --------------------------------------------------------

--
-- Table structure for table `textile`
--

DROP TABLE IF EXISTS `textile`;
CREATE TABLE IF NOT EXISTS `textile` (
  `textileID` int(11) NOT NULL AUTO_INCREMENT,
  `orderID` int(11) NOT NULL,
  `attribute_valueID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`textileID`),
  KEY `fkOT` (`orderID`),
  KEY `fkAVT` (`attribute_valueID`),
  KEY `fkNT` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `textile`
--

INSERT INTO `textile` (`textileID`, `orderID`, `attribute_valueID`, `name`, `comments`) VALUES
(1, 8, 9, 'TEX1-GR', NULL),
(2, 17, 10, 'TEX2-MR', NULL),
(3, 18, 11, 'TEX3-BRTK', NULL),
(4, 19, 12, 'TEX4-BRTN', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `userType` enum('admin','store manager','customer') NOT NULL,
  `userName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `phoneNumber` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `phoneNumber_UNIQUE` (`phoneNumber`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `userType`, `userName`, `firstName`, `lastName`, `phoneNumber`, `email`, `password`) VALUES
(1, 'admin', 'che', 'che', 'marlene', '09662608312', 'cheynadinedauz@gmail.com', '123'),
(2, 'admin', 'shii', 'Sheena', 'Costales', '09283567462', 'sheenacostales@gmail.com', 'kulayOrange88'),
(3, 'customer', 'rui', 'Luwy', 'Colina', '09280876453', 'luwycolina@gmail.com', '6789ruisenpai'),
(4, 'store manager', 'eberu', 'Yverre', 'Cabintos', '09280666856', 'yverrecabintos@gmail.com', 'ackohszieber99'),
(5, 'customer', 'maku', 'Marc', 'Torres', '09929699111', 'marctorres@gmail.com', '213seminarypogi'),
(6, 'store manager', 'jeru', 'Jermel', 'Danganan', '09322342186', 'jermeldanganan@gmail.com', 'ilovehotdogs28'),
(7, 'admin', 'god', 'Su', 'Sej', '09668877111', 'ilovejesus@gmail.com', 'ABCDEF'),
(8, 'store manager', 'eheh99', 'Gina', 'Tan', '09073476665', 'tangina@gmail.com', 'haha88'),
(9, 'customer', 'jj8', 'Junyor', 'Batumbakal', '09285556005', 'jujunjun@gmail.com', 'junjun'),
(10, 'customer', '893batMan', 'Bruce', 'Wayne', '09326344367', 'batako@icloud.com', 'bat1939'),
(11, 'customer', 'qt_Anya_03', 'Anya', 'Forger', '09298881116', 'wakuwaku@gmail.com', 'ilovespywars'),
(12, 'customer', 'yor', 'Yor', 'Forger', '09325552186', 'yorforger@gmail.com', 'password'),
(13, 'customer', '12Lionel', 'Loid', 'Forger', '09286764554', 'tasogare@gmail.com', 'hindiakospy777'),
(14, 'store manager', 'RizalinDAHAUS', 'Pepe', 'Rizal', '09238907844', 'peperizal@gmail.com', 'sakitlikodko999'),
(15, 'admin', 'hatdog', 'Lala', 'Han', '09325550806', 'jambohatdog@gmail.com', '456'),
(16, 'customer', 'yvercab', 'Yverre', 'Cabintos', '09275025473', 'yverrecabintos9@gmail.com', 'hatdiggitydog');

-- --------------------------------------------------------

--
-- Table structure for table `user_log`
--

DROP TABLE IF EXISTS `user_log`;
CREATE TABLE IF NOT EXISTS `user_log` (
  `user_logID` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `userType` enum('admin','store manager') NOT NULL,
  `userID` int(11) NOT NULL,
  `action` enum('add','update','view','delete') NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`user_logID`),
  KEY `fkUHL` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_log`
--

INSERT INTO `user_log` (`user_logID`, `date`, `userType`, `userID`, `action`, `description`) VALUES
(1, '2023-01-02', 'admin', 1, 'delete', 'deleted smth hoohooho');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fkUA` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attribute_value`
--
ALTER TABLE `attribute_value`
  ADD CONSTRAINT `fkAAV` FOREIGN KEY (`attributeID`) REFERENCES `attribute` (`attributeID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `delivery`
--
ALTER TABLE `delivery`
  ADD CONSTRAINT `fkDO` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `measurement`
--
ALTER TABLE `measurement`
  ADD CONSTRAINT `fkOM` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `fkAO` FOREIGN KEY (`addressID`) REFERENCES `address` (`addressID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkAVO` FOREIGN KEY (`attribute_valueID`) REFERENCES `attribute_value` (`attribute_valueID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkMO` FOREIGN KEY (`measurementID`) REFERENCES `measurement` (`measurementID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkUO` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_customized`
--
ALTER TABLE `order_customized`
  ADD CONSTRAINT `fkOOC` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkTOC` FOREIGN KEY (`textileID`) REFERENCES `textile` (`textileID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `fkOPR` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkPPR` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fkOP` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkUP` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fkAVP` FOREIGN KEY (`attribute_valueID`) REFERENCES `attribute_value` (`attribute_valueID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkCP` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkSCP` FOREIGN KEY (`sub_categoryID`) REFERENCES `sub_category` (`sub_categoryID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `fkPR` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkUR` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stock_log`
--
ALTER TABLE `stock_log`
  ADD CONSTRAINT `fkPSL` FOREIGN KEY (`productID`) REFERENCES `product` (`productID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `fkSCC` FOREIGN KEY (`categoryID`) REFERENCES `category` (`categoryID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `textile`
--
ALTER TABLE `textile`
  ADD CONSTRAINT `fkAVT` FOREIGN KEY (`attribute_valueID`) REFERENCES `attribute_value` (`attribute_valueID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkNT` FOREIGN KEY (`name`) REFERENCES `attribute_value` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkOT` FOREIGN KEY (`orderID`) REFERENCES `order` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_log`
--
ALTER TABLE `user_log`
  ADD CONSTRAINT `fkUHL` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
