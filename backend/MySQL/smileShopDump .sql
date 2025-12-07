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
) ENGINE=InnoDB AUTO_INCREMENT=2711 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
INSERT INTO `basket` VALUES (1773,12,4,1),(1774,12,3,1);
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` varchar(255) NOT NULL,
  `nazvanye` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('laptops','ноутбуки'),('smartphones','телефоны'),('tablets','планшеты');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1837 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
INSERT INTO `favourites` VALUES (676,12,3);
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
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
  `count` int DEFAULT NULL,
  `price_total` varchar(100) DEFAULT NULL,
  `discount` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tovar`
--

LOCK TABLES `tovar` WRITE;
/*!40000 ALTER TABLE `tovar` DISABLE KEYS */;
INSERT INTO `tovar` VALUES (1,'Lenovo ThinkPad X1 Carbon 2019',200000.00,150000.00,'noyt','1',1,'150000.00',25),(2,'Dell XPS 13',150000.00,140000.00,'noyt','1',1,'140000.00',7),(3,'Samsung Galaxy Book Pro',180000.00,175000.00,'noyt','1',1,'175000.00',3),(4,'MacBook Air',190000.00,110000.00,'noyt','1',1,'110000.00',42),(5,'HP Omen 15',120000.00,120000.00,'noyt','1',1,'120000.00',0),(6,'HP Spectre x360',194000.00,160000.00,'noyt','1',1,'160000.00',18),(7,'Apple iPhone 14',10000.00,9000.00,'telephon','2',1,'9000.00',10),(8,'Apple iPhone 15',20000.00,18000.00,'telephon','2',1,'18000.00',10),(9,'Samsung Galaxy S23',14000.00,14000.00,'telephon','2',1,'14000.00',0),(10,'Xiaomi 13 Pro',12000.00,11500.00,'telephon','2',1,'11500.00',4),(11,'Huawei P50 Pro',25000.00,20000.00,'telephon','2',1,'20000.00',20),(12,'Apple iPhone 14 pro max',35000.00,33000.00,'telephon','2',1,'33000.00',6),(13,'Microsoft Surface Pro 9',55000.00,53500.00,'planshet','3',1,'53500.00',3),(14,'Apple iPad Air (2022)',52000.00,48000.00,'planshet','3',1,'48000.00',8),(15,'Lenovo Tab P11 Pro',68000.00,68000.00,'planshet','3',1,'68000.00',0),(16,'Amazon Fire HD 10',74000.61,61500.99,'planshet','3',1,'61500.99',17),(17,'Samsung Galaxy Tab A8',44000.00,38000.00,'planshet','3',1,'38000.00',14),(18,'Microsoft Surface Go 3',100000.00,92000.00,'planshet','3',1,'92000.00',8),(19,'Apple iPad (10-го поколения)',81000.00,78000.39,'planshet','3',1,'78000.39',4),(20,'ASUS ZenBook 14',125000.00,125000.00,'noyt','1',1,'125000.00',0),(21,'Microsoft Surface Laptop 4',130000.00,115000.00,'noyt','1',1,'115000.00',12),(22,'Acer Swift 3',145000.45,140000.00,'noyt','1',1,'140000.00',3),(23,'Razer Blade 15',161000.00,156000.00,'noyt','1',1,'156000.00',3),(24,'Sony Xperia 1 IV',24000.78,23000.94,'telephon','2',1,'23000.94',4),(25,'Motorola Edge 30',26000.00,23000.00,'telephon','2',1,'23000.00',12),(26,'Oppo Find X5 Pro',31000.00,29000.00,'telephon','2',1,'29000.00',6),(27,'Realme GT 2 Pro',19000.00,17000.60,'telephon','2',1,'17000.60',11),(28,'Samsung Galaxy Tab S7 FE',32000.50,29000.00,'planshet','3',1,'29000.00',9),(29,'Xiaomi Pad 5',39000.09,31000.09,'planshet','3',1,'31000.09',21),(30,'Asus ZenPad 3S 10',45600.05,34700.00,'planshet','3',1,'34700.00',24),(31,'LG G Pad 5',51500.00,48000.02,'planshet','3',1,'48000.02',7),(32,'LG OLED65C3 (65 дюймов)',179990.00,155500.00,'televisions','4',1,'155500.00',14),(33,'Samsung QE55Q70C (55 дюймов)',74990.00,74990.00,'televisions','4',1,'74990.00',0),(34,'Sony XR-55X90L (55 дюймов)',99990.00,95990.00,'televisions','4',1,'95990.00',4),(35,'Apple iMac 24\" (M3, 8GB, 256GB)',159990.00,159990.00,'computers','5',1,'159990.00',0),(36,'Dell XPS Desktop (i7, 16GB, 512GB SSD)',129990.00,100990.00,'computers','5',1,'100990.00',22),(37,'HP Pavilion Gaming Desktop (Ryzen 5, 16GB, 256GB SSD + 1TB HDD)',79990.50,75000.00,'computers','5',1,'75000.00',6),(38,'Электрическая зубная щетка Philips Sonicare DiamondClean 9000',24990.00,24990.00,'brush','6',1,'24990.00',0),(39,'Фен Dyson Supersonic',44990.00,40000.00,'fan','6',1,'40000.00',11),(40,'Фен Dyson ',19990.00,18990.00,'fan','6',1,'18990.00',5),(41,'Холодильник Bosch Serie 6 KGN392LAU',84990.00,75990.00,'fridge','7',1,'75990.00',11),(42,'Микроволновая печь Samsung MG23T5018UW',9990.00,9100.00,'nuke','7',1,'9100.00',9),(43,'Холодильник Bosch Serie 5 KGN392LAU',64990.00,60000.00,'fridge','7',1,'60000.00',8),(44,'Наушники Sony WH-1000XM5',34990.00,33990.00,'headphones','8',1,'33990.00',3),(45,'Беспроводная колонка JBL Charge 5',14990.00,13990.00,'column','8',1,'13990.00',7),(46,'Наушники Samsung',79990.00,74990.00,'headphones','8',1,'74990.00',6),(47,'Фотоаппарат Sony Alpha 7 IV (Body)',249990.00,235990.00,'photo','9',1,'235990.00',6),(48,'Объектив Sony FE 24-70mm f/2.8 GM',219990.99,219990.99,'photo','9',1,'219990.99',0),(49,'Экшн-камера GoPro HERO11 Black',44990.00,41990.00,'photo','9',1,'41990.00',7),(50,'Чехол для iPhone 14 Pro Max Apple Leather Case',6490.09,5990.09,'case','10',1,'5990.09',8),(51,'Зарядка Samsung',1990.30,1990.30,'charging','10',1,'1990.30',0),(52,'Зарядка Xiaomi',1990.99,1990.99,'charging','10',1,'1990.99',0),(53,'Газонокосилка Bosch Rotak 32',12990.00,12590.00,'lawnmower','11',1,'12590.00',3),(54,'Газонокосилка Bosch Rotak 32',12990.00,12590.00,'lawnmower','11',1,'12590.00',3),(55,'Газонокосилка Bosch Rotak 32',12990.00,12590.00,'lawnmower','11',1,'12590.00',3),(56,'МФУ HP Smart Tank 515',24990.00,22990.00,'MFPs','12',1,'22990.00',8),(57,'Офисное кресло Chairman CH 696',12990.00,11990.00,'armchair','12',1,'11990.00',8),(58,'МФУ HP Smart Tank 100',14990.00,10990.00,'MFPs','12',1,'10990.00',27),(59,'Умная колонка Яндекс Станция Макс',39990.00,36990.00,'column','13',1,'36990.00',8),(60,'Умные часы Apple Watch Series 8',34990.00,29990.00,'watch','13',1,'29990.00',14),(61,'Робот-пылесос Xiaomi Robot Vacuum S10',24990.90,24990.90,'robot','13',1,'24990.90',0),(62,'Видеорегистратор Xiaomi 70mai Dash Cam Pro Plus+ A500S',9990.99,7990.99,'DVR','14',1,'7990.99',20),(63,'Видеорегистратор Xiaomi 50mai Dash Cam Pro Plus+ A500S',4990.00,3990.00,'DVR','14',1,'3990.00',20),(64,'Автомагнитола Pioneer MVH-S120UB',3490.99,3490.99,'carradio','14',1,'3490.99',0),(65,'Wi-Fi роутер ASUS RT-AX82U',19990.00,17990.00,'router','15',1,'17990.00',10),(66,'Wi-Fi роутер ASUS RT-1256',2990.00,1000.00,'router','15',1,'19000.00',67),(67,'Wi-Fi роутер ASUS RT-3476',1990.00,1990.00,'router','15',1,'1990.00',0),(68,'Кабель USB-C to Lightning Apple (1m)',2490.00,2390.00,'cable','16',1,'2390.00',4),(69,'Адаптер питания Apple 20W USB-C Power Adapter',2490.00,2390.00,'cable','16',1,'2390.00',4),(70,'HDMI кабель DEXP HDMI 2.0 (2m)',790.00,780.00,'cable','16',1,'780',1),(71,'PocketBook 628 Touch Lux 5',11990.00,11990.00,'eBooks','17',1,'11990.00',0),(72,'Amazon Kindle Paperwhite (11th generation)',14990.11,13990.99,'eBooks','17',1,'13990.99',7),(73,'Onyx Boox Note Air 2 Plus',45000.00,39000.00,'eBooks','17',1,'39000.00',13),(74,'Кондиционер Haier',34990.00,30990.00,'conditioner','18',1,'30990.00',11),(75,'Увлажнитель воздуха Xiaomi Smart Humidifier 2',4990.00,4490.00,'humidifier','18',1,'4490.00',10),(76,'Увлажнитель воздуха Xiaomi Smart Humidifier 2',4990.00,4490.00,'humidifier','18',1,'4490.00',10),(77,'Графический планшет Wacom Intuos Pro Medium',34990.00,32990.00,'graphictablet','19',1,'32990.00',6),(78,'Швейная машина Brother',24990.00,21990.00,'sewing','19',1,'21990.00',12),(79,'Швейная машина Brother Innov-is A16',29990.00,25990.00,'sewing','19',1,'25990.00',13),(80,'Игровая консоль PlayStation 5',54990.00,52990.50,'ps','20',1,'52990.50',4),(81,'Настольная игра \"Монополия\"',2490.00,2490.00,'monopoly','20',1,'2490.00',0),(82,'Батут DFC Trampoline Fitness First 10ft',19990.99,19990.99,'trampoline','20',1,'19990.99',0),(83,'Meta Quest 2 (128GB)',39990.99,35990.99,'vr','21',1,'35990.99',10),(84,'Sony PlayStation VR2',59990.00,58990.00,'vr','21',1,'58990.00',2),(85,'HTC Vive Pro 2',149990.00,139990.00,'vr','21',1,'139990.00',7),(86,'Камера видеонаблюдения Ezviz C3W Pro',5990.00,5990.00,'videosurveillance','22',1,'5990.00',0),(87,'Домофон Commax CDV-70A',12990.00,10990.00,'intercomsystem','22',1,'10990.00',15),(88,'Сигнализация Ajax StarterKit 2',24990.08,22990.08,'alarmsystem','22',1,'22990.08',8),(89,'Шуруповерт DeWALT DCD791D2',17990.00,16990.00,'screwdriver','23',1,'16990.00',6),(90,'Лазерный уровень Bosch GLL 3-80 C Professional',44990.00,43490.00,'level','23',1,'43490.00',3),(91,'Сварочный аппарат Ресанта САИ 220',14990.00,13590.00,'welding','23',1,'13590.00',9),(92,'Стиральная машина LG F2J3WS0W',44990.00,41990.00,'washing','24',1,'41990.00',7),(93,'Пылесос Dyson V15 Detect Absolute Extra',79990.00,72990.00,'cleaner','24',1,'72990.00',9),(94,'Утюг Philips DST8040/30 ',9990.00,9990.00,'iron','24',1,'9990.00',0);
/*!40000 ALTER TABLE `tovar` ENABLE KEYS */;
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
  `confirmPassword` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'Иван','IVAN2003@yandex.ru','$2y$10$q7HiifLgrF6sg15qpaumoe/sIpkB0jv.fXdE2clW2/zrlT0brRp52',NULL),(13,'Марина','mar-3048@yandex.ru','$2y$10$knhk3EGz/ry0m6.szF1xteDRiNKM45cgoYy7gPe2/KGgS4zHe0ppK',NULL),(14,'Николай','nik@yandex.ru','$2y$10$3FVBnvfVyR5tQWJ4aJU98OQRSfj9zhQhLjMaZdnr0OZJ46igj3Vjq',NULL),(15,'Jack','j@yandex.ru','$2y$10$5rdmEtMAQvaQQ.RgZnwiLOgKwrxVeS4aes1.mMSkUd2X/86w85fXe',NULL),(16,'Александр','alex@yandex.ru','$2y$10$Q1He4ASm5OIILAebThov..WAprkmeopESJTQzDwQH3PwJ/itaHPuS',NULL),(17,'Максим','max@yandex.ru','$2y$10$oRp/6ASHfias3AW4ohIP8ep0AnbGa3U79yFP2No62nfGZmd/4W.Di',NULL),(18,'Арина','ar@yandex.ru','$2y$10$U6zxVnWwhH4qvijFzJRBtenLYEvL/TXZl903WqpX3R1687tNd012G',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-07 19:12:59
