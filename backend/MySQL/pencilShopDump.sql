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
) ENGINE=InnoDB AUTO_INCREMENT=3184 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2043 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (69,61,101,2,1090.00),(70,62,5,14,650.00),(71,63,81,1,429.00),(72,64,8,1,1099.00),(73,65,1,4,99.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (61,26,2180.00,'collected','Москва, пл. Маяковского, д. 23','Самовывоз',0.00,'','2026-04-01 16:10:11',NULL),(62,80,9600.00,'accepted','г. Владикавказ, ул. Шмулевича, д.5','Курьер',500.00,'Упакуйте в подарочную обертку','2026-04-01 16:37:28',NULL),(63,74,729.00,'cancelled','г. Липецк, ул. Набережная, д.23','Почта России',300.00,'','2026-04-01 17:37:31','32536376138837'),(64,56,1399.00,'completed','г. Тула, ул. Горького, д.12','Почта России',300.00,'','2026-04-01 17:42:23','43971217160770'),(65,26,396.00,'completed','г. Тверь, ул. Яхонтова, д.27','Самовывоз',0.00,'','2026-04-01 17:44:17',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tovar`
--

LOCK TABLES `tovar` WRITE;
/*!40000 ALTER TABLE `tovar` DISABLE KEYS */;
INSERT INTO `tovar` VALUES (1,'Карандаш чернографитный HB',120.00,99.00,'pencil','1'),(2,'Карандаш чернографитный 2B',130.00,109.00,'pencil','1'),(3,'Карандаш чернографитный 4B',140.00,119.00,'pencil','1'),(4,'Карандаш чернографитный H',110.00,110.00,'pencil','1'),(5,'Набор чернографитных карандашей 6 шт',650.00,650.00,'pencil','1'),(6,'Набор цветных карандашей 12 цветов',450.00,399.00,'pencil','2'),(7,'Набор цветных карандашей 24 цвета',890.00,799.00,'pencil','2'),(8,'Набор цветных карандашей 36 цветов',1290.00,1099.00,'pencil','2'),(9,'Цветные карандаши металлик 6 шт',320.00,279.00,'pencil','2'),(10,'Цветные карандаши пастельные 12 шт',490.00,439.00,'pencil','2'),(11,'Цветные карандаши неоновые 6 шт',390.00,349.00,'pencil','2'),(12,'Акварельные карандаши 12 цветов',590.00,499.00,'pencil','3'),(13,'Акварельные карандаши 24 цвета',1090.00,990.00,'pencil','3'),(14,'Акварельные карандаши 36 цветов',1590.00,1390.00,'pencil','3'),(15,'Акварельные карандаши профессиональные 12 шт',890.00,790.00,'pencil','3'),(16,'Акварельные карандаши профессиональные 24 шт',1590.00,1390.00,'pencil','3'),(17,'Карандаш механический 0.5 мм',350.00,299.00,'pencil','4'),(18,'Карандаш механический 0.7 мм',350.00,299.00,'pencil','4'),(19,'Карандаш механический 0.3 мм',390.00,339.00,'pencil','4'),(20,'Карандаш механический с ластиком 0.5 мм',420.00,369.00,'pencil','4'),(21,'Карандаш для эскизов HB',150.00,129.00,'pencil','5'),(22,'Карандаш для эскизов 2B',160.00,160.00,'pencil','5'),(23,'Карандаш для эскизов 4B',170.00,149.00,'pencil','5'),(24,'Набор для эскизов 5 шт',650.00,590.00,'pencil','5'),(25,'Карандаш для левшей HB',140.00,119.00,'pencil','6'),(26,'Карандаш для левшей 2B',150.00,129.00,'pencil','6'),(27,'Карандаш для левшей H',130.00,109.00,'pencil','6'),(28,'Набор для левшей 5 шт',650.00,590.00,'pencil','6'),(29,'Набор для художника (карандаши + бумага)',1890.00,1890.00,'pencil','7'),(30,'Подарочный набор 24 цвета',1450.00,1290.00,'pencil','7'),(31,'Набор для скетчинга',990.00,890.00,'pencil','7'),(32,'Набор профессиональный 48 цветов',2490.00,2190.00,'pencil','7'),(33,'Набор для школы 12 цветов',390.00,349.00,'pencil','7'),(34,'Набор для школы 24 цвета',690.00,590.00,'pencil','7'),(35,'Детские цветные карандаши 12 цветов',290.00,249.00,'pencil','8'),(36,'Детские цветные карандаши 18 цветов',390.00,349.00,'pencil','8'),(37,'Треугольные карандаши для малышей 6 шт',280.00,239.00,'pencil','8'),(38,'Детские карандаши с игрушкой 6 цветов',350.00,350.00,'pencil','8'),(39,'Художественные карандаши профессиональные 12 шт',890.00,790.00,'pencil','9'),(40,'Художественные карандаши профессиональные 24 шт',1590.00,1390.00,'pencil','9'),(41,'Художественные карандаши угольные',450.00,399.00,'pencil','9'),(42,'Сангина 3 шт',320.00,279.00,'pencil','9'),(43,'Сепия 3 шт',340.00,340.00,'pencil','9'),(44,'Скетч-карандаши 6 шт',420.00,369.00,'pencil','10'),(45,'Скетч-карандаши 12 шт',780.00,699.00,'pencil','10'),(46,'Скетч-карандаши с углём 3 шт',350.00,299.00,'pencil','10'),(47,'Скетч-карандаши белые 3 шт',290.00,249.00,'pencil','10'),(48,'Карандаш для черчения H',150.00,129.00,'pencil','11'),(49,'Карандаш для черчения 2H',150.00,129.00,'pencil','11'),(50,'Карандаш для черчения 3H',150.00,129.00,'pencil','11'),(51,'Набор архитектора 6 шт',890.00,790.00,'pencil','11'),(52,'Карандаш механический 0.3 мм',390.00,339.00,'pencil','12'),(53,'Набор чертёжных карандашей 4 шт',590.00,499.00,'pencil','12'),(54,'Карандаш для черчения H',120.00,99.00,'pencil','12'),(55,'Карандаш для черчения 2H',120.00,99.00,'pencil','12'),(56,'Угольный карандаш мягкий',180.00,149.00,'pencil','13'),(57,'Угольный карандаш средний',180.00,149.00,'pencil','13'),(58,'Набор угольных карандашей 3 шт',490.00,439.00,'pencil','13'),(59,'Карандаш для письма HB',90.00,79.00,'pencil','14'),(60,'Карандаш для письма 2B',95.00,85.00,'pencil','14'),(61,'Карандаш для письма H',85.00,75.00,'pencil','14'),(62,'Набор письменных карандашей 6 шт',490.00,439.00,'pencil','14'),(63,'Карандаш с ластиком HB',180.00,99.00,'pencil','15'),(64,'Карандаш с ластиком 2B',125.00,105.00,'pencil','15'),(65,'Карандаш с ластиком H',115.00,95.00,'pencil','15'),(66,'Набор карандашей с ластиком 5 шт',550.00,490.00,'pencil','15'),(67,'Металлический карандаш серебро',290.00,249.00,'pencil','16'),(68,'Металлический карандаш золото',290.00,249.00,'pencil','16'),(69,'Металлический карандаш бронза',290.00,249.00,'pencil','16'),(70,'Набор металлических карандашей 4 шт',1090.00,990.00,'pencil','16'),(71,'Карандаши с блёстками 6 цветов',450.00,299.00,'pencil','17'),(72,'Карандаши с блёстками 12 цветов',650.00,590.00,'pencil','17'),(73,'Карандаши с блёстками серебряные 6 шт',390.00,349.00,'pencil','17'),(74,'Карандаши с блёстками золотые 6 шт',390.00,349.00,'pencil','17'),(75,'Карандаши для витражей 6 цветов',490.00,439.00,'pencil','18'),(76,'Карандаши для витражей 12 цветов',890.00,799.00,'pencil','18'),(77,'Карандаши для витражей профессиональные 12 шт',1290.00,1090.00,'pencil','18'),(78,'Карандаши для витражей с блёстками 6 шт',590.00,499.00,'pencil','18'),(79,'Карандаши для ткани 6 цветов',420.00,379.00,'pencil','19'),(80,'Карандаши для ткани 12 цветов',790.00,790.00,'pencil','19'),(81,'Карандаши для ткани смываемые 6 шт',490.00,429.00,'pencil','19'),(82,'Карандаши для ткани термофиксационные 6 шт',590.00,499.00,'pencil','19'),(83,'Карандаши для стекла 6 цветов',520.00,449.00,'pencil','20'),(84,'Карандаши для стекла 12 цветов',990.00,890.00,'pencil','20'),(85,'Карандаши для стекла маркерные 6 шт',690.00,590.00,'pencil','20'),(86,'Карандаши для стекла перманентные 6 шт',790.00,690.00,'pencil','20'),(87,'Карандаши для дерева 6 цветов',390.00,349.00,'pencil','21'),(88,'Карандаши для дерева 12 цветов',690.00,590.00,'pencil','21'),(89,'Карандаши для дерева водостойкие 6 шт',490.00,429.00,'pencil','21'),(90,'Карандаши для дерева профессиональные 12 шт',990.00,890.00,'pencil','21'),(91,'Карандаши для керамики 6 цветов',590.00,590.00,'pencil','22'),(92,'Карандаши для керамики 12 цветов',1090.00,990.00,'pencil','22'),(93,'Карандаши для керамики профессиональные 12 шт',1490.00,1290.00,'pencil','22'),(94,'Карандаши для керамики под обжиг 6 шт',890.00,790.00,'pencil','22'),(95,'Карандаши для пластика 6 цветов',450.00,399.00,'pencil','23'),(96,'Карандаши для пластика 12 цветов',790.00,699.00,'pencil','23'),(97,'Карандаши для пластика перманентные 6 шт',590.00,499.00,'pencil','23'),(98,'Карандаши для пластика смываемые 6 шт',490.00,429.00,'pencil','23'),(99,'Карандаши для металла 6 цветов',550.00,499.00,'pencil','24'),(100,'Карандаши для металла 12 цветов',990.00,890.00,'pencil','24'),(101,'Карандаши для металла профессиональные 12 шт',1490.00,1090.00,'pencil','24'),(102,'Карандаши для металла маркерные 6 шт',690.00,590.00,'pencil','24');
/*!40000 ALTER TABLE `tovar` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (154,26,3945.00,'deposit','Пополнение баланса','2026-04-01 16:05:03'),(155,26,123.00,'deposit','Пополнение баланса','2026-04-01 16:05:07'),(156,26,2.00,'deposit','Пополнение баланса','2026-04-01 16:07:45'),(157,26,2180.00,'payment','Оплата заказа #61','2026-04-01 16:10:11'),(158,80,23567.00,'deposit','Пополнение баланса','2026-04-01 16:15:05'),(159,80,9600.00,'payment','Оплата заказа #62','2026-04-01 16:37:28'),(160,74,12344.00,'deposit','Пополнение баланса','2026-04-01 17:36:31'),(161,74,729.00,'payment','Оплата заказа #63','2026-04-01 17:37:31'),(162,56,234578.00,'deposit','Пополнение баланса','2026-04-01 17:41:30'),(163,56,1399.00,'payment','Оплата заказа #64','2026-04-01 17:42:23'),(164,26,396.00,'payment','Оплата заказа #65','2026-04-01 17:44:17');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tokens`
--

DROP TABLE IF EXISTS `user_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tokens`
--

LOCK TABLES `user_tokens` WRITE;
/*!40000 ALTER TABLE `user_tokens` DISABLE KEYS */;
INSERT INTO `user_tokens` VALUES (110,26,'6fb2fb6ec9b21a976ea8cb6d1053004c7c7c6ae9c255e1a21ba696196b01c47c','2026-05-01 20:53:17','2026-04-01 17:42:38');
/*!40000 ALTER TABLE `user_tokens` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (18,'Арина','ar@yandex.ru','$2y$10$.qa32RYOK6Qx.gUmF5c6DugJ8CbVnIrbmI0rkmP.5QnVZSoZvZ1/2',0),(26,'Иван','ivan@yandex.ru','$2y$10$Vxz4e4cvB2bebnK1GMrEcOZljk7D1h24asBlh34nsP5G9gsJFeCRu',1),(27,'Максим','max@yandex.ru','$2y$10$kvfH3q0hnsLKMlyVnU3b.u.UfkbGbrqvS2qrN7wgX1.P8ujCwMxEa',0),(29,'Зоя','zoya@yandex.ru','$2y$10$tUZ2i5OKR9elAfmel9C5PemiV/b1FbUQdR0/sUi5maFPb2isaGUjC',0),(30,'Олег','oleg@yandex.ru','$2y$10$tpuhCrHsQJzE5CsT3JUbDeHB8qPeI2ERvnyt7VX8xZFv5X7GsGikG',0),(31,'Олеся','olesya@yandex.ru','$2y$10$pLvxBy6Nep9JqV9H92TcouyN4nOZ3WCPat.nLq.tT6TTLzmwcFQBm',0),(32,'Иван Иванов','ivan.ivanov@example.com','$2y$10$USTJSeQafWOCBRCdxUd5qOi8.pwJFDldvWkiDpVdv9Tn27uLyYEJC',0),(33,'Петр Сидоров','petr.sidorov@test.com','$2y$10$huFeziNcpef6h6RkUOMaouqjRv1gGh3TI1uTx2sv/qUkjHBBjM7n2',0),(34,'Анна Кузнецова','anna.kuznetsova@mail.ru','$2y$10$nyCOGMhi8p0qT.CdttrKGOR8e1GQg53IGcVidGIH6voepuaVZ5.SC',0),(35,'John Doe','john.doe@gmail.com','$2y$10$ERPtAoSSVzXH0Bt7wZSRzucOvk14dYlCWLZ6hu75Zdok7ClamJaG.',0),(36,'Jane Smith','jane.smith@yahoo.com','$2y$10$Y4OsVy2YuXJQToa53ueKNekWDCJIC1yjt/TGnbZtMnFO8ekSJmUUC',0),(37,'Mike Brown','mike.brown@outlook.com','$2y$10$CKcUECsJXDfe6QBciDF40O4OdLA1KwxAAo99FTOjKD8jDaDQwaJU6',0),(38,'Emily Wilson','emily.wilson@hotmail.com','$2y$10$09sIVwrETkCSQ99Fk3115O2ApNFZxdhO7pWVC4csE.7rD3a7.0SDG',0),(39,'David Jones','david.jones@aol.com','$2y$10$3F/8gZXarFC9ruImhVY42uDcChtPGS5BWj8f3EesaOKZEv8fi46vO',0),(40,'Sarah Johnson','sarah.johnson@icloud.com','$2y$10$I/wbVH8IIEuvcppaMtGYseQ7XBdS4haQEiRT1z13Nicc12E0HQyWe',0),(41,'Chris Lee','chris.lee@protonmail.com','$2y$10$nlEFLrCrtWg75LDqeVdLg.ms7pPOXFVLG5JwPx02XmnT5anE0lspG',0),(42,'Ольга Смирнова','olga.smirnova@yandex.ru','$2y$10$gk6jPhO49lBt9Drnl1yOzuSOh7JtmSCQtoAGc1PDKxA5kXzBWVuKa',0),(43,'Дмитрий Волков','dmitry.volkov@bk.ru','$2y$10$vPIZeioXekQmTNntuF85uekdgYfSX0c0nKLFoWK8VwyJoE8WO70Em',0),(44,'Елена Морозова','elena.morozova@list.ru','$2y$10$VulJdDJsg9XzAd2b/5g9t.pEsrfVQdy0hlb/XJe9mXnVPXmLx6uZq',0),(45,'Алексей Попов','alexey.popov@inbox.ru','$2y$10$gedojXy0EIMjgv8uc5yGhuUvW9VPJCF7whgmvIZTX/JBFKmzg0vVi',0),(46,'Мария Васильева','maria.vasilyeva@rambler.ru','$2y$10$0Lv9fbjI6dAKusDCgzcbG.wA3sNsGG1s3wFb/0PZUP33Pilhko1cu',0),(47,'Максим Соколов','maksim.sokolov@example.org','$2y$10$u5Ft/2jrJ0Lk4CojK3WP6urfuSgnRRJ7VBg6zX.CUu1FlrncI33dm',1),(48,'Анастасия Михайлова','anastasia.mikhailova@test.net','$2y$10$J/FwLiHDTBsGFc5uSizISeP2D80Q.U8xR/V1Aqqm.GoqdzsMbc.Vq',0),(49,'Артем Новиков','artem.novikov@domain.com','$2y$10$LaU6hYtS/8VuhBeQ3UahIuzav7RINKUR.VtFMGGWh.p0xxOAAgp3u',0),(50,'Виктория Федорова','viktoria.fedorova@website.com','$2y$10$B3NZwG0M1ROQC06RghCS0OQIjcI9mtF1hC2oxcl/0lbipoLw3Xhmu',0),(51,'Сергей Козлов','sergey.kozlov@company.com','$2y$10$lcex9V8Z5xagI7JSizxFS.ES5B2/s.lFPhRNTy61I.mNnW8HvT0Pe',0),(52,'Bob Smith','bob.smith@reggae.com','$2y$10$TnGbc5Yx5UwXfq/geps1sOg.CJEm43kktVZv5UchnXxNBUd9mKu8C',0),(53,'Carol White','carol.white@example.net','$2y$10$AlTRmEiqQFPh5VDrIyVjWOGu4JwRRF.PLq4R6GOcYE5DqfVhHvIeS',0),(54,'Daniel Clark','daniel.clark@domain.net','$2y$10$HpvcmjekLuNc99jyWZoYqOMDpVVkssFWgGyHQRZDqT27iKXC5TCVy',0),(55,'Emma Jones','emma.jones@domain.org','$2y$10$MX2tueJ418n62ZNvxPXlk.nNE9SG6rWt4m1xZqBvRakOULsjlCac6',0),(56,'Frank Miller','frank.miller@website.org','$2y$10$jwpyhGviYv5arElT.6f5IeqBVVyN.jGEbPNf5xsfMoDLG4DktZ9ny',0),(57,'Grace Lee','grace.lee@company.org','$2y$10$mnSCEhYdapWmZoKqpLcak.dcIrxZS1FaxcntPz9UIVYEwJOHtM25a',1),(58,'Henry Green','henry.green@business.com','$2y$10$NP8OBhqkP062EtKgILbu4uqqkSGN9HCteYpNX.MDQenOttUaDPKPO',0),(59,'Isabel Martin','isabel.martin@organisation.com','$2y$10$0LNB.6ZIfNdZR.0Y0v1ySugTDDSaTawVUfaSa6QCBPtc.pin5.52i',0),(60,'Jack Thompson','jack.thompson@service.com','$2y$10$a19yQvNjRsVY49GucEW6eOn.9Ijznj0v6Qn6rMLgZpD.4Gdp0eSNu',0),(61,'Karen Robinson','karen.robinson@consulting.com','$2y$10$ucr6qsRe1JMYKr3dko0vvehK.VTu4MFBjWaNvaN4U3GmVHvPZCLwK',0),(62,'Larry Lewis','larry.lewis@tech.com','$2y$10$VWE9QS92x0DAX7aQUjRQ0O7ZpPBJ5..pXmsfDhR/nvLXUfREhIioi',0),(63,'Monica Walker','monica.walker@startup.com','$2y$10$VtJcH.18nqghH8GrlpySwuqIZZ8aaDoY6/CnDD67qKWdEn7SfUa7m',0),(64,'Nancy Hall','nancy.hall@web.com','$2y$10$Vaad84pliCOUPLFdEEAryeWx7vQUZslpJDV97RKkkAMalFvrDQXOe',1),(65,'Oscar Young','oscar.young@online.com','$2y$10$PVcstqRanim7OLDA3JQJH.tOoF9sXYo/rf3I89k6oXUIxyJecw3f.',0),(66,'Patricia King','patricia.king@system.com','$2y$10$6uqfzpkhOYxdOuQD/wvLc.njx7F223DQjQ2VtsfZmEISlYEo6aBai',0),(67,'Quentin Adams','quentin.adams@network.com','$2y$10$sU0CNpmcDGEfgyrKnw1zs.cO4QzlJgOZF6GjqfGvn2Y5JaZOdHgku',0),(68,'Rachel Baker','rachel.baker@cloud.com','$2y$10$hw88moDMv9r5l5A4a.Ea.OEJRuZ5KX/HsX7omC7eDB0EEmLmh5Fz6',0),(69,'Steve Nelson','steve.nelson@data.com','$2y$10$9MAhzz4shHdsxLvc8xaKj.kQ4lGeYfRvdGIbrJHpPbYlLStqzzcvO',0),(70,'Tina Carter','tina.carter@mail.net','$2y$10$4yUkSqGMIrg/joXOoltRzu1o7nbWtsm/fcj/CqJHAUS2TXyhd.0EC',0),(71,'Ульяна Громова','ulyana.gromova@planet.com','$2y$10$LVoC2.p3C4xTcB5JMyzcZO719nq1HonSw6U69SmVJy6YFHylcT6tK',0),(72,'Вадим Орлов','vadim.orlov@galaxy.com','$2y$10$AmXF6gZSpNUHXxYrhIKHauUBm8aF1aFCGwWKkUcDA3dYgjCnZIL.u',1),(73,'Яна Соколова','yana.sokolova@universe.com','$2y$10$UrITAmi8LKtU2VJnNIjwbO7mCme.s8fMYM8FQIo.NAt3qa3oKH/um',0),(74,'Федор Емельянов','fedor.emelyanov@cosmos.com','$2y$10$LOmW0NwHPpugfmelMRBIG.FYiK4/Tabk05OAwAVEru8lEijJHyDQC',0),(75,'Евгения Романова','evgeniya.romanova@space.com','$2y$10$smTJ0Uh1lTpP8fSlzkEBouyaNeSlQs66oAy/32sxzW1/8Ry11quU2',0),(76,'Константин Белов','konstantin.belov@earth.com','$2y$10$SQXthAtV/ysSwG7b4qK9Tey1.sh2fE78FbC391Usyt0X0nv2tvAJW',0),(77,'Лариса Медведева','larisa.medvedeva@air.com','$2y$10$sZp8DaF/FSRXaEy1mSFSkuWeRnuP6nTytEIqWq9F.ymXtkx40ogYK',0),(78,'Никита Егоров','nikita.egorov@fire.com','$2y$10$qI21uBfptGeyp.PexmYKOu7BCiVYwOOc/7XCg4UiosUsqJEMbX1h6',0),(79,'Полина Павлова','polina.pavlova@water.com','$2y$10$eey9w2UYjJ0VNIDL/1Ynee7HRD11dOwwKOEvzLcm8RCSqMa3O0e1m',0),(80,'Роман Зиновьев','roman.zinoviev@tree.com','$2y$10$bAKIopxtErgFPV8wBesd1O6UDB.PRQma2l2uh6mK7Nnt8j4Kn6/bi',1),(81,'Светлана Андреева','svetlana.andreeva@flower.com','$2y$10$hMUEWLUnjR2/fYoeq9VeH.HDeH5GKwK8PjciYiurAluT9lsLFEoEy',0);
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
  CONSTRAINT `wallets_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallets`
--

LOCK TABLES `wallets` WRITE;
/*!40000 ALTER TABLE `wallets` DISABLE KEYS */;
INSERT INTO `wallets` VALUES (51,26,1494.00),(52,80,13967.00),(53,74,11615.00),(54,56,233179.00);
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

-- Dump completed on 2026-04-01 20:55:23
