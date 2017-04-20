-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: trial_shop_db
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carriers`
--

DROP TABLE IF EXISTS `carriers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carriers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  `cost` decimal(20,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carriers`
--

LOCK TABLES `carriers` WRITE;
/*!40000 ALTER TABLE `carriers` DISABLE KEYS */;
INSERT INTO `carriers` VALUES (1,'Courier in the city',2.00),(2,'Nova poshta',4.00),(3,'Meest express',3.20);
/*!40000 ALTER TABLE `carriers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'general'),(2,'category1'),(3,'category2'),(4,'category3'),(5,'category4'),(6,'category5'),(7,'sub_category1'),(8,'sub_category2'),(9,'sub_category3'),(10,'sub_category4'),(11,'sub_category5'),(12,'sub_category6'),(14,'low_category1'),(15,'low_category2'),(16,'low_category3'),(17,'low_category4'),(18,'low_category5'),(19,'low_category6'),(20,'low_category7');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoryhierarchy`
--

DROP TABLE IF EXISTS `categoryhierarchy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoryhierarchy` (
  `categoryId` int(11) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`categoryId`),
  KEY `parentId` (`parentId`),
  CONSTRAINT `categoryhierarchy_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  CONSTRAINT `categoryhierarchy_ibfk_2` FOREIGN KEY (`parentId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoryhierarchy`
--

LOCK TABLES `categoryhierarchy` WRITE;
/*!40000 ALTER TABLE `categoryhierarchy` DISABLE KEYS */;
INSERT INTO `categoryhierarchy` VALUES (1,NULL),(2,NULL),(3,NULL),(4,NULL),(5,NULL),(6,NULL),(7,2),(8,2),(9,2),(10,2),(11,7),(12,7),(14,11),(15,11),(16,11),(18,12),(19,12),(20,12);
/*!40000 ALTER TABLE `categoryhierarchy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discountitems`
--

DROP TABLE IF EXISTS `discountitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discountitems` (
  `itemId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `discount` decimal(20,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`itemId`,`startDate`),
  CONSTRAINT `discountitems_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discountitems`
--

LOCK TABLES `discountitems` WRITE;
/*!40000 ALTER TABLE `discountitems` DISABLE KEYS */;
INSERT INTO `discountitems` VALUES (1,'2017-01-01',10.00),(8,'2017-01-01',10.00),(9,'2017-01-01',10.00),(10,'2017-01-01',8.00),(11,'2017-01-01',25.00),(12,'2017-01-01',8.00),(13,'2017-01-01',25.00),(14,'2017-01-01',5.00),(33,'2017-01-01',7.00),(44,'2017-01-01',8.30);
/*!40000 ALTER TABLE `discountitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `itemId` int(11) NOT NULL,
  `imageSrc` varchar(255) NOT NULL,
  PRIMARY KEY (`itemId`,`imageSrc`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (13,'bag.jpg'),(13,'ball1.jpg'),(13,'ball2.jpg'),(13,'notepad.jpg'),(13,'pc.jpg'),(13,'rod.jpg'),(13,'table.jpg');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemproperties`
--

DROP TABLE IF EXISTS `itemproperties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `itemproperties` (
  `itemId` int(11) NOT NULL,
  `propertyId` int(11) NOT NULL,
  `value` char(255) NOT NULL,
  PRIMARY KEY (`itemId`,`propertyId`),
  KEY `propertyId` (`propertyId`),
  CONSTRAINT `itemproperties_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`),
  CONSTRAINT `itemproperties_ibfk_2` FOREIGN KEY (`propertyId`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemproperties`
--

LOCK TABLES `itemproperties` WRITE;
/*!40000 ALTER TABLE `itemproperties` DISABLE KEYS */;
INSERT INTO `itemproperties` VALUES (1,1,'green'),(1,9,''),(1,10,''),(8,1,'orange'),(8,9,''),(8,10,''),(9,9,''),(9,10,''),(10,9,''),(10,10,''),(11,1,'green'),(11,3,'16cm'),(11,4,'10cm'),(11,9,''),(11,10,''),(12,1,'green'),(12,8,'coreX7'),(12,9,''),(12,10,''),(13,1,'green'),(13,2,'550g'),(13,7,'12cm'),(13,9,''),(13,10,''),(14,1,'gold'),(14,2,'7g'),(14,9,''),(14,10,''),(15,9,''),(15,10,''),(16,9,''),(16,10,''),(17,9,''),(17,10,''),(18,9,''),(18,10,''),(19,9,''),(19,10,''),(20,9,''),(20,10,''),(21,9,''),(21,10,''),(22,9,''),(22,10,''),(23,9,''),(23,10,''),(24,9,''),(24,10,''),(25,9,''),(25,10,''),(26,9,''),(26,10,''),(27,9,''),(27,10,''),(28,9,''),(28,10,''),(29,9,''),(29,10,''),(30,9,''),(30,10,''),(31,9,''),(31,10,''),(32,9,''),(32,10,''),(33,9,''),(33,10,''),(34,9,''),(34,10,''),(35,9,''),(35,10,''),(36,9,''),(36,10,''),(37,9,''),(37,10,''),(38,9,''),(38,10,''),(39,9,''),(39,10,''),(40,9,''),(40,10,''),(41,9,''),(41,10,''),(42,9,''),(42,10,''),(43,9,''),(43,10,''),(44,9,''),(44,10,''),(45,9,''),(45,10,''),(46,9,''),(46,10,''),(47,9,''),(47,10,''),(48,9,''),(48,10,''),(49,9,''),(49,10,''),(50,9,''),(50,10,''),(51,9,''),(51,10,''),(52,9,''),(52,10,''),(53,9,''),(53,10,''),(54,9,''),(54,10,''),(55,9,''),(55,10,''),(56,9,''),(56,10,''),(57,9,''),(57,10,''),(58,9,''),(58,10,''),(59,9,''),(59,10,''),(60,9,''),(60,10,''),(61,9,''),(61,10,''),(62,9,''),(62,10,''),(63,9,''),(63,10,''),(64,9,''),(64,10,''),(65,9,''),(65,10,''),(66,9,''),(66,10,''),(67,9,''),(67,10,''),(68,9,''),(68,10,''),(69,9,''),(69,10,''),(70,9,''),(70,10,''),(71,9,''),(71,10,''),(72,9,''),(72,10,''),(73,9,''),(73,10,''),(74,9,''),(74,10,''),(75,9,''),(75,10,''),(76,9,''),(76,10,''),(77,9,''),(77,10,''),(78,9,''),(78,10,''),(79,9,''),(79,10,''),(80,9,''),(80,10,''),(81,9,''),(81,10,''),(82,9,''),(82,10,''),(83,9,''),(83,10,''),(84,9,''),(84,10,''),(85,9,''),(85,10,''),(86,9,''),(86,10,''),(87,9,''),(87,10,''),(88,9,''),(88,10,''),(89,9,''),(89,10,''),(90,9,''),(90,10,''),(91,9,''),(91,10,''),(92,9,''),(92,10,''),(93,9,''),(93,10,''),(94,9,''),(94,10,''),(95,9,''),(95,10,''),(96,9,''),(96,10,''),(97,9,''),(97,10,''),(98,9,''),(98,10,''),(99,9,''),(99,10,''),(100,9,''),(100,10,''),(101,9,''),(101,10,''),(102,9,''),(102,10,''),(103,9,''),(103,10,''),(104,9,''),(104,10,''),(105,9,''),(105,10,''),(106,9,''),(106,10,''),(107,9,''),(107,10,''),(108,9,''),(108,10,''),(109,9,''),(109,10,''),(110,9,''),(110,10,''),(111,9,''),(111,10,''),(112,9,''),(112,10,''),(113,9,''),(113,10,''),(114,9,''),(114,10,''),(115,9,''),(115,10,''),(116,9,''),(116,10,''),(117,9,''),(117,10,''),(118,9,''),(118,10,''),(119,9,''),(119,10,''),(120,9,''),(120,10,''),(121,9,''),(121,10,''),(122,9,''),(122,10,''),(123,9,''),(123,10,''),(124,9,''),(124,10,''),(125,9,''),(125,10,''),(126,9,''),(126,10,''),(127,9,''),(127,10,''),(128,9,''),(128,10,''),(129,9,''),(129,10,''),(130,9,''),(130,10,''),(131,9,''),(131,10,''),(132,9,''),(132,10,''),(133,9,''),(133,10,''),(134,9,''),(134,10,''),(135,9,''),(135,10,''),(136,9,''),(136,10,''),(137,9,''),(137,10,''),(138,9,''),(138,10,''),(139,9,''),(139,10,''),(140,9,''),(140,10,''),(141,9,''),(141,10,''),(142,9,''),(142,10,''),(143,9,''),(143,10,''),(144,9,''),(144,10,''),(145,9,''),(145,10,''),(146,9,''),(146,10,'');
/*!40000 ALTER TABLE `itemproperties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `mainImage` varchar(255) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'item1','item.jpg',1),(8,'bag','bag.jpg',1),(9,'table','table.jpg',1),(10,'rod','rod.jpg',1),(11,'notepad','notepad.jpg',1),(12,'PC','pc.jpg',1),(13,'ball','ball.jpg',1),(14,'gold chain','gold-chain.jpg',1),(15,'item+++1','ball.jpg',1),(16,'item+++2','ball.jpg',1),(17,'item+++3','ball.jpg',1),(18,'item+++4','ball.jpg',1),(19,'item+++5','ball.jpg',1),(20,'item+++6','ball.jpg',1),(21,'item+++7','ball.jpg',1),(22,'item+++8','ball.jpg',1),(23,'item+++9','ball.jpg',1),(24,'item+++10','ball.jpg',1),(25,'item+++11','ball.jpg',1),(26,'item+++12','ball.jpg',1),(27,'item+++13','ball.jpg',1),(28,'item+++14','ball.jpg',1),(29,'item+++15','ball.jpg',1),(30,'item+++16','ball.jpg',1),(31,'item+++17','ball.jpg',1),(32,'item+++18','ball.jpg',1),(33,'item+++19','ball.jpg',1),(34,'item+++20','ball.jpg',1),(35,'item+++21','ball.jpg',1),(36,'item+++22','ball.jpg',1),(37,'item+++23','ball.jpg',1),(38,'item+++24','ball.jpg',1),(39,'item+++25','ball.jpg',1),(40,'item+++26','ball.jpg',1),(41,'item+++27','ball.jpg',1),(42,'item+++28','ball.jpg',1),(43,'item+++29','ball.jpg',1),(44,'item+++30','ball.jpg',1),(45,'item+++31','ball.jpg',1),(46,'item+++32','ball.jpg',1),(47,'item+++33','ball.jpg',1),(48,'item+++34','ball.jpg',1),(49,'item+++35','ball.jpg',1),(50,'item+++36','ball.jpg',1),(51,'item+++37','ball.jpg',1),(52,'item+++38','ball.jpg',1),(53,'item+++39','ball.jpg',1),(54,'item+++40','ball.jpg',1),(55,'item+++41','ball.jpg',1),(56,'item+++42','ball.jpg',1),(57,'item+++43','ball.jpg',1),(58,'item+++44','ball.jpg',1),(59,'item+++45','ball.jpg',1),(60,'item+++46','ball.jpg',1),(61,'item+++47','ball.jpg',1),(62,'item+++48','ball.jpg',1),(63,'item+++49','ball.jpg',1),(64,'item+++50','ball.jpg',1),(65,'item+++51','ball.jpg',1),(66,'item+++52','ball.jpg',1),(67,'item+++53','ball.jpg',1),(68,'item+++54','ball.jpg',1),(69,'item+++55','ball.jpg',1),(70,'item+++56','ball.jpg',1),(71,'item+++57','ball.jpg',1),(72,'item+++58','ball.jpg',1),(73,'item+++59','ball.jpg',1),(74,'item+++60','ball.jpg',1),(75,'item+++61','ball.jpg',1),(76,'item+++62','ball.jpg',1),(77,'item+++63','ball.jpg',1),(78,'item+++64','ball.jpg',1),(79,'item+++65','ball.jpg',1),(80,'item+++66','ball.jpg',1),(81,'item+++67','ball.jpg',1),(82,'item+++68','ball.jpg',1),(83,'item+++69','ball.jpg',1),(84,'item+++70','ball.jpg',1),(85,'item+++71','ball.jpg',1),(86,'item+++72','ball.jpg',1),(87,'item+++73','ball.jpg',1),(88,'item+++74','ball.jpg',1),(89,'item+++75','ball.jpg',1),(90,'item+++76','ball.jpg',1),(91,'item+++77','ball.jpg',1),(92,'item+++78','ball.jpg',1),(93,'item+++79','ball.jpg',1),(94,'item+++80','ball.jpg',1),(95,'item+++81','ball.jpg',1),(96,'item+++82','ball.jpg',1),(97,'item+++83','ball.jpg',1),(98,'item+++84','ball.jpg',1),(99,'item+++85','ball.jpg',1),(100,'item+++86','ball.jpg',1),(101,'item+++87','ball.jpg',1),(102,'item+++88','ball.jpg',1),(103,'item+++89','ball.jpg',1),(104,'item+++90','ball.jpg',1),(105,'item+++91','ball.jpg',1),(106,'item+++92','ball.jpg',1),(107,'item+++93','ball.jpg',1),(108,'item+++94','ball.jpg',1),(109,'item+++95','ball.jpg',1),(110,'item+++96','ball.jpg',1),(111,'item+++97','ball.jpg',1),(112,'item+++98','ball.jpg',1),(113,'item+++99','ball.jpg',1),(114,'item+++100','ball.jpg',1),(115,'item+++101','ball.jpg',1),(116,'item+++102','ball.jpg',1),(117,'item+++103','ball.jpg',1),(118,'item+++104','ball.jpg',1),(119,'item+++105','ball.jpg',1),(120,'item+++106','ball.jpg',1),(121,'item+++107','ball.jpg',1),(122,'item+++108','ball.jpg',1),(123,'item+++109','ball.jpg',1),(124,'item+++110','ball.jpg',1),(125,'item+++111','ball.jpg',1),(126,'item+++112','ball.jpg',1),(127,'item+++113','ball.jpg',1),(128,'item+++114','ball.jpg',1),(129,'item+++115','ball.jpg',1),(130,'item+++116','ball.jpg',1),(131,'item+++117','ball.jpg',1),(132,'item+++118','ball.jpg',1),(133,'item+++119','ball.jpg',1),(134,'item+++120','ball.jpg',1),(135,'item+++121','ball.jpg',1),(136,'item+++122','ball.jpg',1),(137,'item+++123','ball.jpg',1),(138,'item+++124','ball.jpg',1),(139,'item+++125','ball.jpg',1),(140,'item+++126','ball.jpg',1),(141,'item+++127','ball.jpg',1),(142,'item+++128','ball.jpg',1),(143,'item+++129','ball.jpg',1),(144,'item+++130','ball.jpg',1),(145,'item+++131','ball.jpg',1),(146,'item+++132','ball.jpg',1);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderitems` (
  `orderId` int(11) DEFAULT NULL,
  `itemId` int(11) DEFAULT NULL,
  `sum` decimal(20,2) DEFAULT NULL,
  KEY `orderId` (`orderId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` VALUES (33,14,950.00),(33,8,90.00),(34,14,950.00),(34,8,90.00),(35,14,950.00),(35,8,90.00),(36,14,950.00),(36,8,90.00),(37,14,950.00),(37,8,90.00),(38,14,950.00),(38,8,90.00),(39,14,950.00),(39,8,90.00),(40,14,950.00),(40,8,90.00),(41,14,950.00),(41,8,90.00),(42,14,950.00),(42,8,90.00),(43,14,950.00),(43,8,90.00),(44,14,950.00),(44,8,90.00),(45,14,950.00),(45,8,90.00),(46,14,950.00),(46,8,90.00),(47,14,950.00),(47,8,90.00),(48,14,950.00),(48,8,90.00),(49,14,950.00),(49,8,90.00),(50,14,950.00),(50,8,90.00),(51,14,950.00),(51,8,90.00),(51,1,1.35),(51,9,108.00),(51,10,165.60),(51,11,17.08),(52,14,950.00),(52,8,90.00),(52,1,1.35),(52,9,108.00),(52,10,165.60),(52,11,17.08),(53,14,950.00),(53,8,90.00),(53,1,1.35),(53,9,108.00),(53,10,165.60),(53,11,17.08),(54,14,950.00),(54,8,90.00),(54,1,1.35),(54,9,108.00),(54,10,165.60),(54,11,17.08),(55,14,950.00),(55,8,90.00),(55,1,1.35),(55,9,108.00),(55,10,165.60),(55,11,17.08),(56,14,950.00),(56,8,90.00),(56,1,1.35),(56,9,108.00),(56,10,165.60),(56,11,17.08),(57,14,950.00),(57,8,90.00),(57,1,1.35),(57,9,108.00),(57,10,165.60),(57,11,17.08),(58,14,950.00),(58,8,90.00),(58,1,1.35),(58,9,108.00),(58,10,165.60),(58,11,17.08),(59,14,950.00),(59,8,90.00),(59,1,1.35),(59,9,108.00),(59,10,165.60),(59,11,17.08),(60,14,950.00),(60,8,90.00),(60,1,1.35),(60,9,108.00),(60,10,165.60),(60,11,17.08),(61,14,950.00),(61,8,90.00),(61,1,1.35),(61,9,108.00),(61,10,165.60),(61,11,17.08),(62,14,950.00),(62,8,90.00),(62,1,1.35),(62,9,108.00),(62,10,165.60),(62,11,17.08),(63,14,950.00),(63,8,90.00),(63,1,1.35),(63,9,108.00),(63,10,165.60),(63,11,17.08),(64,14,950.00),(64,8,90.00),(64,1,1.35),(64,9,108.00),(64,10,165.60),(64,11,17.08),(65,14,950.00),(65,8,90.00),(65,1,1.35),(65,9,108.00),(65,10,165.60),(65,11,17.08),(66,14,950.00),(66,8,360.00),(66,1,2.70),(66,9,324.00),(66,10,165.60),(66,11,17.08),(67,14,950.00),(67,8,450.00),(67,1,2.70),(67,9,432.00),(67,10,165.60),(67,11,17.08),(68,8,450.00),(68,9,432.00),(68,11,17.08),(69,8,450.00),(69,9,432.00),(69,11,17.08),(70,8,450.00),(70,9,432.00),(70,11,17.08),(71,8,450.00),(71,9,432.00),(71,11,17.08),(72,8,90.00),(72,9,216.00),(72,1,1.35),(72,12,625.60),(73,8,90.00),(73,9,216.00),(73,1,1.35),(73,12,625.60),(74,8,90.00),(74,9,216.00),(74,1,1.35),(74,12,625.60),(75,8,90.00),(75,9,216.00),(75,1,1.35),(75,12,625.60),(76,8,90.00),(76,9,216.00),(76,1,1.35),(76,12,625.60),(77,8,90.00),(77,9,216.00),(77,1,1.35),(77,12,625.60),(78,1,2.70),(78,23,2690.00),(79,1,2.70),(79,23,2690.00),(80,1,2.70),(80,23,2690.00),(81,1,2.70),(81,23,2690.00),(82,1,2.70),(82,23,2690.00),(83,1,2.70),(83,23,2690.00),(84,1,1.35),(84,8,90.00),(85,1,1.35),(85,8,90.00),(86,1,1.35),(86,8,90.00),(87,13,55.20),(88,12,625.60),(88,8,90.00),(88,13,13.80),(88,14,950.00),(89,12,625.60),(90,12,625.60),(90,8,90.00);
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderDate` date NOT NULL,
  `user` char(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (33,'2017-04-04','----'),(34,'2017-04-05','23'),(35,'2017-04-05','345'),(36,'2017-04-05','777'),(37,'2017-04-05','1'),(38,'2017-04-05','123'),(39,'2017-04-05',''),(40,'2017-04-05','12'),(41,'2017-04-05','56'),(42,'2017-04-05','12'),(43,'2017-04-05','12'),(44,'2017-04-05','567'),(45,'2017-04-05',''),(46,'2017-04-05',''),(47,'2017-04-05',''),(48,'2017-04-05',''),(49,'2017-04-05',''),(50,'2017-04-05',''),(51,'2017-04-05',''),(52,'2017-04-05',''),(53,'2017-04-05',''),(54,'2017-04-05',';alsdfj'),(55,'2017-04-05',''),(56,'2017-04-05',''),(57,'2017-04-05',''),(58,'2017-04-05',''),(59,'2017-04-05',''),(60,'2017-04-05','prg82@ukr.net'),(61,'2017-04-05','prg82@ukr.net'),(62,'2017-04-05','prg82@ukr.net1'),(63,'2017-04-05','prg82@ukr.net'),(64,'2017-04-05','prg82@ukr.net'),(65,'2017-04-05','prg82@ukr.net'),(66,'2017-04-05','prg82@ukr.net'),(67,'2017-04-05','prg82@ukr.net'),(68,'2017-04-06','123'),(69,'2017-04-06','as'),(70,'2017-04-06','q'),(71,'2017-04-06','prg82@ukr.net'),(72,'2017-04-06','prg82@ukr.net'),(73,'2017-04-06','prg82@ukr.net'),(74,'2017-04-06','1@1'),(75,'2017-04-06','2@2'),(76,'2017-04-06','2@2'),(77,'2017-04-06','3@3'),(78,'2017-04-08','2@2'),(79,'2017-04-08','2@2'),(80,'2017-04-08','2@2'),(81,'2017-04-08','2@2'),(82,'2017-04-08','2@2'),(83,'2017-04-08','2@2'),(84,'2017-04-08','2@2'),(85,'2017-04-08','2@2'),(86,'2017-04-08','2@2'),(87,'2017-04-08','prg82@ukr.net'),(88,'2017-04-08','prg82@ukr.net'),(89,'2017-04-09','2@22'),(90,'2017-04-19','prg82@ukr.net');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prices` (
  `itemId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `value` decimal(20,4) DEFAULT NULL,
  PRIMARY KEY (`itemId`,`startDate`),
  CONSTRAINT `prices_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
INSERT INTO `prices` VALUES (1,'2015-01-01',0.7000),(1,'2016-01-01',1.0000),(1,'2017-01-01',1.5000),(1,'2018-01-01',3.0000),(8,'2017-01-01',100.0000),(9,'2017-01-01',120.0000),(10,'2017-01-01',180.0000),(11,'2017-01-01',22.7700),(12,'2017-01-01',680.0000),(13,'2017-01-01',18.4000),(14,'2015-01-01',600.0000),(14,'2017-01-01',1000.0000),(15,'2017-01-01',1354.0000),(16,'2017-01-01',2969.0000),(17,'2017-01-01',2815.0000),(18,'2017-01-01',1078.0000),(19,'2017-01-01',919.0000),(20,'2017-01-01',3452.0000),(21,'2017-01-01',1148.0000),(22,'2017-01-01',4724.0000),(23,'2017-01-01',2690.0000),(24,'2017-01-01',594.0000),(25,'2017-01-01',1016.0000),(26,'2017-01-01',4853.0000),(27,'2017-01-01',4519.0000),(28,'2017-01-01',3034.0000),(29,'2017-01-01',4939.0000),(30,'2017-01-01',4189.0000),(31,'2017-01-01',879.0000),(32,'2017-01-01',4391.0000),(33,'2017-01-01',4814.0000),(34,'2017-01-01',1487.0000),(35,'2017-01-01',429.0000),(36,'2017-01-01',2445.0000),(37,'2017-01-01',3394.0000),(38,'2017-01-01',3982.0000),(39,'2017-01-01',3531.0000),(40,'2017-01-01',3159.0000),(41,'2017-01-01',1468.0000),(42,'2017-01-01',4674.0000),(43,'2017-01-01',1958.0000),(44,'2017-01-01',1846.0000),(45,'2017-01-01',2714.0000),(46,'2017-01-01',3099.0000),(47,'2017-01-01',2637.0000),(48,'2017-01-01',3818.0000),(49,'2017-01-01',4824.0000),(50,'2017-01-01',4545.0000),(51,'2017-01-01',3578.0000),(52,'2017-01-01',445.0000),(53,'2017-01-01',743.0000),(54,'2017-01-01',1934.0000),(55,'2017-01-01',616.0000),(56,'2017-01-01',1878.0000),(57,'2017-01-01',464.0000),(58,'2017-01-01',2997.0000),(59,'2017-01-01',1991.0000),(60,'2017-01-01',4944.0000),(61,'2017-01-01',3651.0000),(62,'2017-01-01',670.0000),(63,'2017-01-01',651.0000),(64,'2017-01-01',903.0000),(65,'2017-01-01',4316.0000),(66,'2017-01-01',442.0000),(67,'2017-01-01',4412.0000),(68,'2017-01-01',4614.0000),(69,'2017-01-01',3428.0000),(70,'2017-01-01',160.0000),(71,'2017-01-01',394.0000),(72,'2017-01-01',187.0000),(73,'2017-01-01',1454.0000),(74,'2017-01-01',3127.0000),(75,'2017-01-01',310.0000),(76,'2017-01-01',883.0000),(77,'2017-01-01',4892.0000),(78,'2017-01-01',770.0000),(79,'2017-01-01',3751.0000),(80,'2017-01-01',2401.0000),(81,'2017-01-01',1692.0000),(82,'2017-01-01',1255.0000),(83,'2017-01-01',2035.0000),(84,'2017-01-01',884.0000),(85,'2017-01-01',3490.0000),(86,'2017-01-01',2303.0000),(87,'2017-01-01',2762.0000),(88,'2017-01-01',1511.0000),(89,'2017-01-01',3940.0000),(90,'2017-01-01',4508.0000),(91,'2017-01-01',3691.0000),(92,'2017-01-01',1416.0000),(93,'2017-01-01',3675.0000),(94,'2017-01-01',475.0000),(95,'2017-01-01',3080.0000),(96,'2017-01-01',3668.0000),(97,'2017-01-01',760.0000),(98,'2017-01-01',3178.0000),(99,'2017-01-01',3299.0000),(100,'2017-01-01',1050.0000),(101,'2017-01-01',2395.0000),(102,'2017-01-01',1509.0000),(103,'2017-01-01',1904.0000),(104,'2017-01-01',2307.0000),(105,'2017-01-01',3567.0000),(106,'2017-01-01',1957.0000),(107,'2017-01-01',3130.0000),(108,'2017-01-01',1922.0000),(109,'2017-01-01',401.0000),(110,'2017-01-01',4187.0000),(111,'2017-01-01',4618.0000),(112,'2017-01-01',2284.0000),(113,'2017-01-01',1818.0000),(114,'2017-01-01',2505.0000),(115,'2017-01-01',3798.0000),(116,'2017-01-01',3968.0000),(117,'2017-01-01',4992.0000),(118,'2017-01-01',3951.0000),(119,'2017-01-01',817.0000),(120,'2017-01-01',3560.0000),(121,'2017-01-01',4322.0000),(122,'2017-01-01',1271.0000),(123,'2017-01-01',1388.0000),(124,'2017-01-01',1152.0000),(125,'2017-01-01',4197.0000),(126,'2017-01-01',1777.0000),(127,'2017-01-01',3828.0000),(128,'2017-01-01',1242.0000),(129,'2017-01-01',2910.0000),(130,'2017-01-01',3304.0000),(131,'2017-01-01',895.0000),(132,'2017-01-01',4425.0000),(133,'2017-01-01',973.0000),(134,'2017-01-01',1505.0000),(135,'2017-01-01',2238.0000),(136,'2017-01-01',3550.0000),(137,'2017-01-01',134.0000),(138,'2017-01-01',875.0000),(139,'2017-01-01',4782.0000),(140,'2017-01-01',622.0000),(141,'2017-01-01',1220.0000),(142,'2017-01-01',394.0000),(143,'2017-01-01',3268.0000),(144,'2017-01-01',4830.0000),(145,'2017-01-01',3650.0000),(146,'2017-01-01',4132.0000);
/*!40000 ALTER TABLE `prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  `viewPriority` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,'color',0),(2,'weight',0),(3,'length',0),(4,'width',0),(5,'height',0),(6,'type',0),(7,'radius',0),(8,'generation',0),(9,'country',5),(10,'producer',10);
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-20 22:27:28
