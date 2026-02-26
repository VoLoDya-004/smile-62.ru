CREATE DATABASE  IF NOT EXISTS `shop` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shop`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `basket`
--

DROP TABLE IF EXISTS `basket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basket` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_product` int NOT NULL,
  `count` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3076 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
INSERT INTO `basket` VALUES (1773,12,4,1),(1774,12,3,1),(2789,24,5,1),(2790,24,4,1),(2826,27,3,1),(2827,27,4,1),(2828,27,5,1),(3018,30,3,2),(3019,30,2,1),(3075,26,4,1);
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_methods`
--

DROP TABLE IF EXISTS `delivery_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_methods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `cost` decimal(10,2) NOT NULL,
  `estimated_days` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_methods`
--

LOCK TABLES `delivery_methods` WRITE;
/*!40000 ALTER TABLE `delivery_methods` DISABLE KEYS */;
INSERT INTO `delivery_methods` VALUES (1,'Самовывоз','Забрать из пункта выдачи',0.00,1),(2,'Курьер','Доставка курьером по адресу',500.00,2),(3,'Почта России','Доставка почтой',300.00,7);
/*!40000 ALTER TABLE `delivery_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `id_product` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2000 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
INSERT INTO `favourites` VALUES (676,12,3),(1900,24,2),(1932,27,3),(1933,27,1),(1990,18,2),(1991,30,2);
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_order` int NOT NULL,
  `id_product` int NOT NULL,
  `quantity` int NOT NULL,
  `price_at_moment` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,3,17,175000.00),(2,2,3,1,175000.00),(3,3,7,1,9000.00),(4,4,7,2,9000.00),(5,5,7,1,9000.00),(6,6,7,1,9000.00),(7,7,7,1,9000.00),(8,8,7,2,9000.00),(9,9,7,1,9000.00),(10,10,7,1,9000.00),(11,11,7,1,9000.00),(12,12,7,1,9000.00),(13,13,7,1,9000.00),(14,14,7,1,9000.00),(15,15,7,1,9000.00),(16,16,7,1,9000.00),(17,17,7,1,9000.00),(18,18,4,1,110000.00),(19,19,7,2,9000.00),(20,20,7,5,9000.00),(21,20,13,1,53500.00),(22,21,100,11,136000.00),(23,22,3,1,175000.00),(24,23,7,1,9000.00),(25,24,7,1,9000.00),(26,25,7,1,9000.00),(27,26,7,1,9000.00),(28,27,7,1,9000.00),(29,28,7,1,9000.00),(30,29,7,1,9000.00),(31,30,7,1,9000.00),(32,31,3,1,175000.00),(33,32,9,2,14000.00),(34,33,12,1,33000.00),(35,34,14,1,48000.00),(36,35,7,14,9000.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(20) NOT NULL,
  `delivery_address` text NOT NULL,
  `delivery_type` varchar(100) DEFAULT 'courier',
  `delivery_cost` decimal(10,2) DEFAULT '0.00',
  `customer_notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tracking_number` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (18,18,110300.00,'accepted','оор','Почта России',300.00,'','2026-02-07 18:02:25','78855721133016'),(19,26,18300.00,'accepted','город Рязань, улица семашко 38/40','Почта России',300.00,'комментариев нет','2026-02-09 16:32:07',NULL),(20,26,98800.00,'accepted','ewrgiomnewo;risog;wnoe;rk gno;nqo;jerao;jgv ;gsegagareh','Почта России',300.00,'awrgnaiergboslndgfoknserioppwnpnbpnspnpinpitnhpwnpsn ','2026-02-09 16:34:36','60038001824880'),(21,26,1496500.00,'accepted','Москва','Курьер',500.00,'','2026-02-14 17:22:55',NULL),(22,26,175500.00,'accepted','Москва','Курьер',500.00,'','2026-02-17 11:26:03',NULL),(23,26,9000.00,'accepted','Москва','Самовывоз',0.00,'','2026-02-17 11:28:49',NULL),(24,26,9000.00,'accepted','Москва','Самовывоз',0.00,'','2026-02-17 11:32:25',NULL),(25,26,9300.00,'accepted','в','Почта России',300.00,'','2026-02-17 11:36:45','61177879273011'),(26,26,9300.00,'accepted','w','Почта России',300.00,'','2026-02-17 11:45:02','95368560314601'),(27,26,9500.00,'accepted','w','Курьер',500.00,'','2026-02-17 11:52:47',NULL),(28,26,9300.00,'completed','e','Почта России',300.00,'','2026-02-17 11:53:26','21609048972578'),(29,26,9000.00,'accepted','e','Самовывоз',0.00,'','2026-02-17 11:54:38',NULL),(30,26,9000.00,'accepted','ewqtrwerter','Самовывоз',0.00,'trweywtwru','2026-02-17 11:58:08',NULL),(31,26,175300.00,'accepted','sasdfdg','Почта России',300.00,'','2026-02-18 09:59:07','35823887848937'),(32,26,28000.00,'accepted','dsged','Самовывоз',0.00,'','2026-02-18 09:59:19',NULL),(33,26,33500.00,'accepted','23rweed','Курьер',500.00,'','2026-02-18 09:59:30',NULL),(34,26,48500.00,'accepted','ergefwg','Курьер',500.00,'','2026-02-18 09:59:40',NULL),(35,26,126500.00,'accepted','йцуцйукцу','Курьер',500.00,'','2026-02-19 15:16:12',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tovar`
--

DROP TABLE IF EXISTS `tovar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tovar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nazvanie` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `price_sale` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `id_category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tovar`
--

LOCK TABLES `tovar` WRITE;
/*!40000 ALTER TABLE `tovar` DISABLE KEYS */;
INSERT INTO `tovar` VALUES (1,'Lenovo ThinkPad X1 Carbon 2019',200000.00,150000.00,'noyt','1'),(2,'Dell XPS 13',150000.00,140000.00,'noyt','1'),(3,'Samsung Galaxy Book Pro',180000.00,175000.00,'noyt','1'),(4,'MacBook Air',190000.00,110000.00,'noyt','1'),(5,'HP Omen 15',120000.00,120000.00,'noyt','1'),(6,'HP Spectre x360',194000.00,160000.00,'noyt','1'),(7,'Apple iPhone 14',10000.00,9000.00,'telephon','2'),(8,'Apple iPhone 15',20000.00,18000.00,'telephon','2'),(9,'Samsung Galaxy S23',14000.00,14000.00,'telephon','2'),(10,'Xiaomi 13 Pro',12000.00,11500.00,'telephon','2'),(11,'Huawei P50 Pro',25000.00,20000.00,'telephon','2'),(12,'Apple iPhone 14 pro max',35000.00,33000.00,'telephon','2'),(13,'Microsoft Surface Pro 9',55000.00,53500.00,'planshet','3'),(14,'Apple iPad Air (2022)',52000.00,48000.00,'planshet','3'),(15,'Lenovo Tab P11 Pro',68000.00,68000.00,'planshet','3'),(16,'Amazon Fire HD 10',74000.61,61500.99,'planshet','3'),(17,'Samsung Galaxy Tab A8',44000.00,38000.00,'planshet','3'),(18,'Microsoft Surface Go 3',100000.00,92000.00,'planshet','3'),(19,'Apple iPad (10-го поколения)',81000.00,78000.39,'planshet','3'),(20,'ASUS ZenBook 14',125000.00,125000.00,'noyt','1'),(21,'Microsoft Surface Laptop 4',130000.00,115000.00,'noyt','1'),(22,'Acer Swift 3',145000.45,140000.00,'noyt','1'),(23,'Razer Blade 15',161000.00,156000.00,'noyt','1'),(24,'Sony Xperia 1 IV',24000.78,23000.94,'telephon','2'),(25,'Motorola Edge 30',26000.00,23000.00,'telephon','2'),(26,'Oppo Find X5 Pro',31000.00,29000.00,'telephon','2'),(27,'Realme GT 2 Pro',19000.00,17000.60,'telephon','2'),(28,'Samsung Galaxy Tab S7 FE',32000.50,29000.00,'planshet','3'),(29,'Xiaomi Pad 5',39000.09,31000.09,'planshet','3'),(30,'Asus ZenPad 3S 10',45600.05,34700.00,'planshet','3'),(31,'LG G Pad 5',51500.00,48000.02,'planshet','3'),(32,'LG OLED65C3 (65 дюймов)',179990.00,155500.00,'televisions','4'),(33,'Samsung QE55Q70C (55 дюймов)',74990.00,74990.00,'televisions','4'),(34,'Sony XR-55X90L (55 дюймов)',99990.00,95990.00,'televisions','4'),(35,'Apple iMac 24\" (M3, 8GB, 256GB)',159990.00,159990.00,'computers','5'),(36,'Dell XPS Desktop (i7, 16GB, 512GB SSD)',129990.00,100990.00,'computers','5'),(37,'HP Pavilion Gaming Desktop (Ryzen 5, 16GB, 256GB SSD + 1TB HDD)',79990.50,75000.00,'computers','5'),(38,'Электрическая зубная щетка Philips Sonicare DiamondClean 9000',24990.00,24990.00,'brush','6'),(39,'Фен Dyson Supersonic',44990.00,40000.00,'fan','6'),(40,'Фен Dyson ',19990.00,18990.00,'fan','6'),(41,'Холодильник Bosch Serie 6 KGN392LAU',84990.00,75990.00,'fridge','7'),(42,'Микроволновая печь Samsung MG23T5018UW',9990.00,9100.00,'nuke','7'),(43,'Холодильник Bosch Serie 5 KGN392LAU',64990.00,60000.00,'fridge','7'),(44,'Наушники Sony WH-1000XM5',34990.00,33990.00,'headphones','8'),(45,'Беспроводная колонка JBL Charge 5',14990.00,13990.00,'column','8'),(46,'Наушники Samsung',79990.00,74990.00,'headphones','8'),(47,'Фотоаппарат Sony Alpha 7 IV (Body)',249990.00,235990.00,'photo','9'),(48,'Объектив Sony FE 24-70mm f/2.8 GM',219990.99,219990.99,'photo','9'),(49,'Экшн-камера GoPro HERO11 Black',44990.00,41990.00,'photo','9'),(50,'Чехол для iPhone 14 Pro Max Apple Leather Case',6490.09,5990.09,'case','10'),(51,'Зарядка Samsung',1990.30,1990.30,'charging','10'),(52,'Зарядка Xiaomi',1990.99,1990.99,'charging','10'),(53,'Газонокосилка Bosch Rotak 32',12990.00,12590.00,'lawnmower','11'),(54,'Газонокосилка Bosch Rotak 32',12990.00,12590.00,'lawnmower','11'),(55,'Газонокосилка Bosch Rotak 32',12990.00,12590.00,'lawnmower','11'),(56,'МФУ HP Smart Tank 515',24990.00,22990.00,'MFPs','12'),(57,'Офисное кресло Chairman CH 696',12990.00,11990.00,'armchair','12'),(58,'МФУ HP Smart Tank 100',14990.00,10990.00,'MFPs','12'),(59,'Умная колонка Яндекс Станция Макс',39990.00,36990.00,'column','13'),(60,'Умные часы Apple Watch Series 8',34990.00,29990.00,'watch','13'),(61,'Робот-пылесос Xiaomi Robot Vacuum S10',24990.90,24990.90,'robot','13'),(62,'Видеорегистратор Xiaomi 70mai Dash Cam Pro Plus+ A500S',9990.99,7990.99,'DVR','14'),(63,'Видеорегистратор Xiaomi 50mai Dash Cam Pro Plus+ A500S',4990.00,3990.00,'DVR','14'),(64,'Автомагнитола Pioneer MVH-S120UB',3490.99,3490.99,'carradio','14'),(65,'Wi-Fi роутер ASUS RT-AX82U',19990.00,17990.00,'router','15'),(66,'Wi-Fi роутер ASUS RT-1256',2990.00,1000.00,'router','15'),(67,'Wi-Fi роутер ASUS RT-3476',1990.00,1990.00,'router','15'),(68,'Кабель USB-C to Lightning Apple (1m)',2490.00,2390.00,'cable','16'),(69,'Адаптер питания Apple 20W USB-C Power Adapter',2490.00,2390.00,'cable','16'),(70,'HDMI кабель DEXP HDMI 2.0 (2m)',790.00,780.00,'cable','16'),(71,'PocketBook 628 Touch Lux 5',11990.00,11990.00,'eBooks','17'),(72,'Amazon Kindle Paperwhite (11th generation)',14990.11,13990.99,'eBooks','17'),(73,'Onyx Boox Note Air 2 Plus',45000.00,39000.00,'eBooks','17'),(74,'Кондиционер Haier',34990.00,30990.00,'conditioner','18'),(75,'Увлажнитель воздуха Xiaomi Smart Humidifier 2',4990.00,4490.00,'humidifier','18'),(76,'Увлажнитель воздуха Xiaomi Smart Humidifier 2',4990.00,4490.00,'humidifier','18'),(77,'Графический планшет Wacom Intuos Pro Medium',34990.00,32990.00,'graphictablet','19'),(78,'Швейная машина Brother',24990.00,21990.00,'sewing','19'),(79,'Швейная машина Brother Innov-is A16',29990.00,25990.00,'sewing','19'),(80,'Игровая консоль PlayStation 5',54990.00,52990.50,'ps','20'),(81,'Настольная игра \"Монополия\"',2490.00,2490.00,'monopoly','20'),(82,'Батут DFC Trampoline Fitness First 10ft',19990.99,19990.99,'trampoline','20'),(83,'Meta Quest 2 (128GB)',39990.99,35990.99,'vr','21'),(84,'Sony PlayStation VR2',59990.00,58990.00,'vr','21'),(85,'HTC Vive Pro 2',149990.00,139990.00,'vr','21'),(86,'Камера видеонаблюдения Ezviz C3W Pro',5990.00,5990.00,'videosurveillance','22'),(87,'Домофон Commax CDV-70A',12990.00,10990.00,'intercomsystem','22'),(88,'Сигнализация Ajax StarterKit 2',24990.08,22990.08,'alarmsystem','22'),(89,'Шуруповерт DeWALT DCD791D2',17990.00,16990.00,'screwdriver','23'),(90,'Лазерный уровень Bosch GLL 3-80 C Professional',44990.00,43490.00,'level','23'),(91,'Сварочный аппарат Ресанта САИ 220',14990.00,13590.00,'welding','23'),(92,'Стиральная машина LG F2J3WS0W',44990.00,41990.00,'washing','24'),(93,'Пылесос Dyson V15 Detect Absolute Extra',79990.00,72990.00,'cleaner','24'),(94,'Утюг Philips DST8040/30 ',9990.00,9990.00,'iron','24');
/*!40000 ALTER TABLE `tovar` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_tovar` BEFORE INSERT ON `tovar` FOR EACH ROW BEGIN
    IF NEW.price > 0 AND NEW.price_sale IS NOT NULL AND NEW.price_sale <= NEW.price THEN
        SET NEW.discount = ROUND(100 * (NEW.price - NEW.price_sale) / NEW.price);
    ELSE
        SET NEW.discount = NULL;  -- можно заменить на 0, если хотите показывать 0% при отсутствии скидки
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_update_tovar` BEFORE UPDATE ON `tovar` FOR EACH ROW BEGIN
    IF NEW.price > 0 AND NEW.price_sale IS NOT NULL AND NEW.price_sale <= NEW.price THEN
        SET NEW.discount = ROUND(100 * (NEW.price - NEW.price_sale) / NEW.price);
    ELSE
        SET NEW.discount = NULL;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `type` enum('deposit','payment') NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,18,12.00,'deposit','Пополнение баланса','2026-02-04 14:51:59'),(2,18,14.00,'deposit','Пополнение баланса','2026-02-04 14:52:26'),(3,18,1000.00,'deposit','Пополнение баланса','2026-02-04 14:52:45'),(4,18,4.00,'deposit','Пополнение баланса','2026-02-04 14:55:06'),(5,18,10.00,'deposit','Пополнение баланса','2026-02-04 16:28:58'),(6,18,1.00,'deposit','Пополнение баланса','2026-02-04 16:30:11'),(7,18,9.00,'deposit','Пополнение баланса','2026-02-04 16:30:27'),(8,18,100000.00,'deposit','Пополнение баланса','2026-02-04 16:30:50'),(9,18,100000.00,'deposit','Пополнение баланса','2026-02-04 16:30:59'),(10,18,800000.00,'deposit','Пополнение баланса','2026-02-04 16:31:13'),(11,18,1000000.00,'deposit','Пополнение баланса','2026-02-04 16:34:13'),(12,18,1000000.00,'deposit','Пополнение баланса','2026-02-04 16:34:22'),(13,18,10.00,'deposit','Пополнение баланса','2026-02-04 16:50:24'),(14,18,1.00,'deposit','Пополнение баланса','2026-02-04 16:57:40'),(15,18,1.00,'deposit','Пополнение баланса','2026-02-04 16:57:42'),(16,18,1.00,'deposit','Пополнение баланса','2026-02-04 16:57:46'),(17,18,1.00,'deposit','Пополнение баланса','2026-02-04 16:57:52'),(18,18,1.00,'deposit','Пополнение баланса','2026-02-04 16:57:54'),(19,18,1.00,'deposit','Пополнение баланса','2026-02-04 16:57:56'),(20,18,2975300.00,'payment','Оплата заказа #1','2026-02-07 14:20:45'),(21,18,200000.00,'deposit','Пополнение баланса','2026-02-07 14:23:19'),(22,18,175000.00,'payment','Оплата заказа #2','2026-02-07 14:24:19'),(23,18,9000.00,'payment','Оплата заказа #3','2026-02-07 16:16:24'),(24,18,18000.00,'payment','Оплата заказа #4','2026-02-07 16:22:41'),(25,18,9000.00,'payment','Оплата заказа #5','2026-02-07 16:25:10'),(26,18,9300.00,'payment','Оплата заказа #6','2026-02-07 16:28:39'),(27,18,9300.00,'payment','Оплата заказа #7','2026-02-07 16:29:18'),(28,18,120000.00,'deposit','Пополнение баланса','2026-02-07 16:29:31'),(29,18,18300.00,'payment','Оплата заказа #8','2026-02-07 16:31:13'),(30,18,9300.00,'payment','Оплата заказа #9','2026-02-07 16:31:46'),(31,18,9000.00,'payment','Оплата заказа #10','2026-02-07 16:38:19'),(32,18,9300.00,'payment','Оплата заказа #11','2026-02-07 16:41:58'),(33,18,9000.00,'payment','Оплата заказа #12','2026-02-07 16:45:34'),(34,18,9300.00,'payment','Оплата заказа #13','2026-02-07 17:12:12'),(35,18,9000.00,'payment','Оплата заказа #14','2026-02-07 17:16:21'),(36,18,9500.00,'payment','Оплата заказа #15','2026-02-07 17:31:01'),(37,18,9300.00,'payment','Оплата заказа #16','2026-02-07 17:31:26'),(38,18,9300.00,'payment','Оплата заказа #17','2026-02-07 17:32:16'),(39,18,1000000.00,'deposit','Пополнение баланса','2026-02-07 18:02:02'),(40,18,110300.00,'payment','Оплата заказа #18','2026-02-07 18:02:25'),(41,26,10000.00,'deposit','Пополнение баланса','2026-02-09 16:31:03'),(42,26,18300.00,'payment','Оплата заказа #19','2026-02-09 16:32:07'),(43,26,100000.00,'deposit','Пополнение баланса','2026-02-09 16:33:42'),(44,26,98800.00,'payment','Оплата заказа #20','2026-02-09 16:34:36'),(45,26,1000000.00,'deposit','Пополнение баланса','2026-02-14 17:10:44'),(46,26,500000.00,'deposit','Пополнение баланса','2026-02-14 17:10:58'),(47,26,1496500.00,'payment','Оплата заказа #21','2026-02-14 17:22:55'),(48,26,1000000.00,'deposit','Пополнение баланса','2026-02-17 11:25:40'),(49,26,175500.00,'payment','Оплата заказа #22','2026-02-17 11:26:03'),(50,26,9000.00,'payment','Оплата заказа #23','2026-02-17 11:28:49'),(51,26,9000.00,'payment','Оплата заказа #24','2026-02-17 11:32:25'),(52,26,9300.00,'payment','Оплата заказа #25','2026-02-17 11:36:45'),(53,26,9300.00,'payment','Оплата заказа #26','2026-02-17 11:45:02'),(54,26,9500.00,'payment','Оплата заказа #27','2026-02-17 11:52:47'),(55,26,9300.00,'payment','Оплата заказа #28','2026-02-17 11:53:26'),(56,26,9000.00,'payment','Оплата заказа #29','2026-02-17 11:54:38'),(57,26,9000.00,'payment','Оплата заказа #30','2026-02-17 11:58:08'),(58,26,175300.00,'payment','Оплата заказа #31','2026-02-18 09:59:07'),(59,26,28000.00,'payment','Оплата заказа #32','2026-02-18 09:59:19'),(60,26,33500.00,'payment','Оплата заказа #33','2026-02-18 09:59:30'),(61,26,48500.00,'payment','Оплата заказа #34','2026-02-18 09:59:40'),(62,26,126500.00,'payment','Оплата заказа #35','2026-02-19 15:16:12');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (18,'Арина','ar@yandex.ru','$2y$10$U6zxVnWwhH4qvijFzJRBtenLYEvL/TXZl903WqpX3R1687tNd012G',0),(26,'Иван','ivan@yandex.ru','$2y$10$JPH9pbHDPJGwL1ev4IOwBeeMF0VVpCdALu4fWpRLXurf9GXwXDtpy',1),(27,'Максим','max@yandex.ru','$2y$10$kvfH3q0hnsLKMlyVnU3b.u.UfkbGbrqvS2qrN7wgX1.P8ujCwMxEa',0),(29,'Зоя','zoya@yandex.ru','$2y$10$tUZ2i5OKR9elAfmel9C5PemiV/b1FbUQdR0/sUi5maFPb2isaGUjC',0),(30,'Олег','oleg@yandex.ru','$2y$10$tpuhCrHsQJzE5CsT3JUbDeHB8qPeI2ERvnyt7VX8xZFv5X7GsGikG',0),(31,'Олеся','olesya@yandex.ru','$2y$10$pLvxBy6Nep9JqV9H92TcouyN4nOZ3WCPat.nLq.tT6TTLzmwcFQBm',0),(32,'Иван Иванов','ivan.ivanov@example.com','$2y$10$USTJSeQafWOCBRCdxUd5qOi8.pwJFDldvWkiDpVdv9Tn27uLyYEJC',0),(33,'Петр Сидоров','petr.sidorov@test.com','$2y$10$huFeziNcpef6h6RkUOMaouqjRv1gGh3TI1uTx2sv/qUkjHBBjM7n2',0),(34,'Анна Кузнецова','anna.kuznetsova@mail.ru','$2y$10$nyCOGMhi8p0qT.CdttrKGOR8e1GQg53IGcVidGIH6voepuaVZ5.SC',0),(35,'John Doe','john.doe@gmail.com','$2y$10$ERPtAoSSVzXH0Bt7wZSRzucOvk14dYlCWLZ6hu75Zdok7ClamJaG.',0),(36,'Jane Smith','jane.smith@yahoo.com','$2y$10$Y4OsVy2YuXJQToa53ueKNekWDCJIC1yjt/TGnbZtMnFO8ekSJmUUC',0),(37,'Mike Brown','mike.brown@outlook.com','$2y$10$CKcUECsJXDfe6QBciDF40O4OdLA1KwxAAo99FTOjKD8jDaDQwaJU6',0),(38,'Emily Wilson','emily.wilson@hotmail.com','$2y$10$09sIVwrETkCSQ99Fk3115O2ApNFZxdhO7pWVC4csE.7rD3a7.0SDG',0),(39,'David Jones','david.jones@aol.com','$2y$10$3F/8gZXarFC9ruImhVY42uDcChtPGS5BWj8f3EesaOKZEv8fi46vO',0),(40,'Sarah Johnson','sarah.johnson@icloud.com','$2y$10$I/wbVH8IIEuvcppaMtGYseQ7XBdS4haQEiRT1z13Nicc12E0HQyWe',0),(41,'Chris Lee','chris.lee@protonmail.com','$2y$10$nlEFLrCrtWg75LDqeVdLg.ms7pPOXFVLG5JwPx02XmnT5anE0lspG',0),(42,'Ольга Смирнова','olga.smirnova@yandex.ru','$2y$10$gk6jPhO49lBt9Drnl1yOzuSOh7JtmSCQtoAGc1PDKxA5kXzBWVuKa',0),(43,'Дмитрий Волков','dmitry.volkov@bk.ru','$2y$10$vPIZeioXekQmTNntuF85uekdgYfSX0c0nKLFoWK8VwyJoE8WO70Em',0),(44,'Елена Морозова','elena.morozova@list.ru','$2y$10$VulJdDJsg9XzAd2b/5g9t.pEsrfVQdy0hlb/XJe9mXnVPXmLx6uZq',0),(45,'Алексей Попов','alexey.popov@inbox.ru','$2y$10$gedojXy0EIMjgv8uc5yGhuUvW9VPJCF7whgmvIZTX/JBFKmzg0vVi',0),(46,'Мария Васильева','maria.vasilyeva@rambler.ru','$2y$10$0Lv9fbjI6dAKusDCgzcbG.wA3sNsGG1s3wFb/0PZUP33Pilhko1cu',0),(47,'Максим Соколов','maksim.sokolov@example.org','$2y$10$u5Ft/2jrJ0Lk4CojK3WP6urfuSgnRRJ7VBg6zX.CUu1FlrncI33dm',0),(48,'Анастасия Михайлова','anastasia.mikhailova@test.net','$2y$10$J/FwLiHDTBsGFc5uSizISeP2D80Q.U8xR/V1Aqqm.GoqdzsMbc.Vq',0),(49,'Артем Новиков','artem.novikov@domain.com','$2y$10$LaU6hYtS/8VuhBeQ3UahIuzav7RINKUR.VtFMGGWh.p0xxOAAgp3u',0),(50,'Виктория Федорова','viktoria.fedorova@website.com','$2y$10$B3NZwG0M1ROQC06RghCS0OQIjcI9mtF1hC2oxcl/0lbipoLw3Xhmu',0),(51,'Сергей Козлов','sergey.kozlov@company.com','$2y$10$lcex9V8Z5xagI7JSizxFS.ES5B2/s.lFPhRNTy61I.mNnW8HvT0Pe',0),(52,'Bob Smith','bob.smith@reggae.com','$2y$10$TnGbc5Yx5UwXfq/geps1sOg.CJEm43kktVZv5UchnXxNBUd9mKu8C',0),(53,'Carol White','carol.white@example.net','$2y$10$AlTRmEiqQFPh5VDrIyVjWOGu4JwRRF.PLq4R6GOcYE5DqfVhHvIeS',0),(54,'Daniel Clark','daniel.clark@domain.net','$2y$10$HpvcmjekLuNc99jyWZoYqOMDpVVkssFWgGyHQRZDqT27iKXC5TCVy',0),(55,'Emma Jones','emma.jones@domain.org','$2y$10$MX2tueJ418n62ZNvxPXlk.nNE9SG6rWt4m1xZqBvRakOULsjlCac6',0),(56,'Frank Miller','frank.miller@website.org','$2y$10$jwpyhGviYv5arElT.6f5IeqBVVyN.jGEbPNf5xsfMoDLG4DktZ9ny',0),(57,'Grace Lee','grace.lee@company.org','$2y$10$mnSCEhYdapWmZoKqpLcak.dcIrxZS1FaxcntPz9UIVYEwJOHtM25a',0),(58,'Henry Green','henry.green@business.com','$2y$10$NP8OBhqkP062EtKgILbu4uqqkSGN9HCteYpNX.MDQenOttUaDPKPO',0),(59,'Isabel Martin','isabel.martin@organisation.com','$2y$10$0LNB.6ZIfNdZR.0Y0v1ySugTDDSaTawVUfaSa6QCBPtc.pin5.52i',0),(60,'Jack Thompson','jack.thompson@service.com','$2y$10$a19yQvNjRsVY49GucEW6eOn.9Ijznj0v6Qn6rMLgZpD.4Gdp0eSNu',0),(61,'Karen Robinson','karen.robinson@consulting.com','$2y$10$ucr6qsRe1JMYKr3dko0vvehK.VTu4MFBjWaNvaN4U3GmVHvPZCLwK',0),(62,'Larry Lewis','larry.lewis@tech.com','$2y$10$VWE9QS92x0DAX7aQUjRQ0O7ZpPBJ5..pXmsfDhR/nvLXUfREhIioi',0),(63,'Monica Walker','monica.walker@startup.com','$2y$10$VtJcH.18nqghH8GrlpySwuqIZZ8aaDoY6/CnDD67qKWdEn7SfUa7m',0),(64,'Nancy Hall','nancy.hall@web.com','$2y$10$Vaad84pliCOUPLFdEEAryeWx7vQUZslpJDV97RKkkAMalFvrDQXOe',0),(65,'Oscar Young','oscar.young@online.com','$2y$10$PVcstqRanim7OLDA3JQJH.tOoF9sXYo/rf3I89k6oXUIxyJecw3f.',0),(66,'Patricia King','patricia.king@system.com','$2y$10$6uqfzpkhOYxdOuQD/wvLc.njx7F223DQjQ2VtsfZmEISlYEo6aBai',0),(67,'Quentin Adams','quentin.adams@network.com','$2y$10$sU0CNpmcDGEfgyrKnw1zs.cO4QzlJgOZF6GjqfGvn2Y5JaZOdHgku',0),(68,'Rachel Baker','rachel.baker@cloud.com','$2y$10$hw88moDMv9r5l5A4a.Ea.OEJRuZ5KX/HsX7omC7eDB0EEmLmh5Fz6',0),(69,'Steve Nelson','steve.nelson@data.com','$2y$10$9MAhzz4shHdsxLvc8xaKj.kQ4lGeYfRvdGIbrJHpPbYlLStqzzcvO',0),(70,'Tina Carter','tina.carter@mail.net','$2y$10$4yUkSqGMIrg/joXOoltRzu1o7nbWtsm/fcj/CqJHAUS2TXyhd.0EC',0),(71,'Ульяна Громова','ulyana.gromova@planet.com','$2y$10$LVoC2.p3C4xTcB5JMyzcZO719nq1HonSw6U69SmVJy6YFHylcT6tK',0),(72,'Вадим Орлов','vadim.orlov@galaxy.com','$2y$10$AmXF6gZSpNUHXxYrhIKHauUBm8aF1aFCGwWKkUcDA3dYgjCnZIL.u',0),(73,'Яна Соколова','yana.sokolova@universe.com','$2y$10$UrITAmi8LKtU2VJnNIjwbO7mCme.s8fMYM8FQIo.NAt3qa3oKH/um',0),(74,'Федор Емельянов','fedor.emelyanov@cosmos.com','$2y$10$LOmW0NwHPpugfmelMRBIG.FYiK4/Tabk05OAwAVEru8lEijJHyDQC',0),(75,'Евгения Романова','evgeniya.romanova@space.com','$2y$10$smTJ0Uh1lTpP8fSlzkEBouyaNeSlQs66oAy/32sxzW1/8Ry11quU2',0),(76,'Константин Белов','konstantin.belov@earth.com','$2y$10$SQXthAtV/ysSwG7b4qK9Tey1.sh2fE78FbC391Usyt0X0nv2tvAJW',0),(77,'Лариса Медведева','larisa.medvedeva@air.com','$2y$10$sZp8DaF/FSRXaEy1mSFSkuWeRnuP6nTytEIqWq9F.ymXtkx40ogYK',0),(78,'Никита Егоров','nikita.egorov@fire.com','$2y$10$qI21uBfptGeyp.PexmYKOu7BCiVYwOOc/7XCg4UiosUsqJEMbX1h6',0),(79,'Полина Павлова','polina.pavlova@water.com','$2y$10$eey9w2UYjJ0VNIDL/1Ynee7HRD11dOwwKOEvzLcm8RCSqMa3O0e1m',0),(80,'Роман Зиновьев','roman.zinoviev@tree.com','$2y$10$bAKIopxtErgFPV8wBesd1O6UDB.PRQma2l2uh6mK7Nnt8j4Kn6/bi',0),(81,'Светлана Андреева','svetlana.andreeva@flower.com','$2y$10$hMUEWLUnjR2/fYoeq9VeH.HDeH5GKwK8PjciYiurAluT9lsLFEoEy',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallets`
--

DROP TABLE IF EXISTS `wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `balance` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `wallets_ibfk_1` (`id_user`),
  CONSTRAINT `wallets_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallets`
--

LOCK TABLES `wallets` WRITE;
/*!40000 ALTER TABLE `wallets` DISABLE KEYS */;
INSERT INTO `wallets` VALUES (1,18,914566.00),(2,26,345700.00),(3,27,10000.00),(4,29,10000.00),(5,30,10000.00),(6,31,10000.00),(7,50,0.00),(8,48,0.00);
/*!40000 ALTER TABLE `wallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'shop'
--

--
-- Dumping routines for database 'shop'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-26 13:51:30
