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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (21,'garden-furniture'),(22,'garden-solutions'),(23,'solar'),(24,'fixtures-and-ornaments'),(25,'cabins'),(26,'garden'),(27,'Fountains and Birdbaths'),(28,'Architectural and Miscellany'),(29,'Antiques');
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
INSERT INTO `categoryhierarchy` VALUES (23,NULL),(24,NULL),(25,NULL),(26,NULL),(29,NULL),(21,26),(22,26),(27,29),(28,29);
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
INSERT INTO `discountitems` VALUES (181,'2017-01-01',20.00),(183,'2017-01-01',9.00),(191,'2017-01-01',14.00),(214,'2017-01-01',7.00),(229,'2017-01-01',7.00),(254,'2017-01-01',20.00),(259,'2017-01-01',19.00),(278,'2017-01-01',8.00),(281,'2017-01-01',8.00),(297,'2017-01-01',16.00);
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
INSERT INTO `itemproperties` VALUES (147,5,'2m'),(149,1,'wood'),(149,4,'1.2m'),(150,1,'green'),(153,1,'green'),(154,1,'green'),(154,5,'2m'),(155,4,'2m'),(156,3,'0.6m'),(156,4,'0.6m'),(156,5,'0.8m'),(157,5,'1,34m'),(158,1,'wood'),(158,4,'80cm'),(159,5,'2.2m'),(160,1,'green'),(162,1,'white'),(162,3,'6m'),(162,4,'3m'),(162,5,'2.4m'),(165,1,'wood'),(167,1,'wood'),(169,1,'white'),(169,4,'1.7m'),(180,11,'glass'),(183,5,'2m'),(190,1,'green'),(191,1,'white'),(194,5,'1.8m'),(198,1,'green'),(198,11,'metal'),(203,11,'glass'),(217,5,'2m'),(221,1,'brown'),(224,1,'green'),(224,11,'metal'),(225,1,'green'),(225,11,'metal'),(229,11,'wood'),(231,11,'glass'),(239,11,'stainless_still'),(243,11,'glass'),(249,5,'15cm'),(251,1,'black'),(251,5,'37cm'),(252,1,'red-white'),(252,5,'50cm'),(258,5,'50cm'),(262,4,'25cm'),(263,3,'3m'),(265,1,'pink'),(265,5,'70cm'),(269,5,'25cm'),(271,5,'50cm'),(275,5,'30cm'),(276,2,'20kg'),(276,5,'40cm'),(283,1,'white'),(284,1,'rainbow'),(284,5,'170cm'),(290,7,'30cm'),(293,7,'45cm'),(295,5,'80cm'),(296,7,'50cm'),(297,5,'50cm'),(298,1,'grey'),(299,1,'black-orange'),(303,5,'150cm'),(309,5,'80cm'),(309,7,'50cm'),(311,5,'83cm'),(312,1,'wood'),(312,3,'3'),(312,4,'3'),(313,1,'wood'),(313,3,'3'),(313,4,'5'),(314,1,'wood'),(315,1,'wood'),(315,3,'4'),(315,4,'4'),(316,1,'wood'),(316,3,'3'),(316,4,'5'),(317,1,'green'),(318,1,'white'),(319,1,'grey'),(319,7,'50cm'),(320,1,'grey'),(320,5,'1m'),(321,1,'white'),(321,5,'1m'),(321,7,'1.5m'),(322,1,'grey'),(323,1,'white'),(323,7,'80cm'),(324,1,'white'),(325,1,'grey'),(325,5,'1m'),(326,1,'green'),(326,7,'1.2m'),(326,11,'copper'),(327,4,'70cm'),(327,5,'2m'),(328,5,'73cm'),(328,11,'bronze'),(330,1,'old-orange'),(330,7,'75cm'),(331,1,'white'),(331,5,'90cm'),(331,11,'clay'),(332,3,'50cm'),(332,4,'50cm'),(333,5,'40cm'),(333,7,'18cm'),(339,3,'1.5m'),(339,4,'1m'),(339,11,'stone'),(340,5,'80cm'),(340,11,'clay'),(343,1,'black'),(343,5,'2.5m');
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
) ENGINE=InnoDB AUTO_INCREMENT=344 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (147,'st-lucia-rattan-garden-lounge-set','shop-D9471-G0048.jpg',21),(148,'the-ultimate-zero-gravity-chair','shop-ZERO-D597-2.jpg',21),(149,'lutyens-style-garden-bench','shop-D9658-D9659-feature.jpg',21),(150,'three-piece-rose-armchair-bistro-set','shop-D7280-2-1000x600.jpg',21),(151,'seville-three-piece-rattan-set','shop-G0531%202%201000x600.jpg',21),(152,'cantilever-parasol','shop-D8251-G0048.jpg',21),(153,'xl-zero-gravity-chairs','shop-ZERO-D703-1000x600.jpg',21),(154,'2-2m-aluminium-parasol-with-protective-bag','shop-D9361-2-1000x600.jpg',21),(155,'rattan-day-bed','shop-G0524%202%201000x600.jpg',21),(156,'zero-gravity-side-table','shop-D830-1-1000x600.jpg',21),(157,'outdoor-pizza-oven-smoker-bbq','shop-D9398.jpg',21),(158,'natural-coffee-table-','shop-D9659-cutout.jpg',21),(159,'hexagon-gazebo','shop-D9509.jpg',21),(160,'garden-lounger','shop-D7430-1-1000x600.jpg',21),(161,'santorini-rattan-dining-set','shop-D9479-NEW.jpg',21),(162,'gazebo-party-tent-6-x-3','shop-D8326-new.jpg',21),(163,'zero-gravity-chair','shop-G0880%20G0881%20G0882%20G0883%20G0884%201000x600.jpg',21),(164,'antigua-rattan-garden-lounge-set','shop-RATTAN-D86-1000x600.jpg',21),(165,'wooden-adirondack-chair','shop-D8637.jpg',21),(166,'premium-garden-hammock','shop-D752-1000x600.jpg',21),(167,'tete-a-tete-seat','shop-D7603.jpg',21),(168,'6ft-fold-away-banquet-table','shop-D8807-2-1000x600.jpg',21),(169,'havana-rattan-lounge-set','shop-G0527-G0816%201000x600.jpg',21),(170,'electric-barbecue-grill','shop-D9667-feature.jpg',21),(171,'outback-excel-310-gas-bbq','shop-G1267%201000x600.jpg',21),(172,'sorrento-cubic-rattan-dining-set-black','shop-D9484-G0048.jpg',21),(173,'work-expert-wall-and-fence-paint-sprayer','shop-D9973%20Spray%20gun%20ls%201%201000x600.jpg',22),(174,'expanding-easy-hose','shop-D8433---1000.jpg',22),(175,'water-jet-adaptor','shop-D9384-cutout.jpg',22),(176,'garden-gear-garden-kneeler','shop-D7428-1.jpg',22),(177,'garden-gear-3-6v-cordless-lithium-ion-trimming-shears','shop-D2939%20%20Cordless%20trimming%20shears%201000x600.jpg',22),(178,'the-ultimate-zero-gravity-chair','shop-ZERO-D597-2.jpg',22),(179,'cantilever-parasol','shop-D8251-G0048.jpg',22),(180,'waltons-6-2-x-4-3ft-greenhouse','shop-D9399%20G0467%20G0468-2.jpg',22),(181,'waltons-7ft-x-4ft-metal-apex-garden-storage-shed','shop-D9404%20D9490%20G0487%201000x600.jpg',22),(182,'garden-gear-3-in-1-telescopic-patio-brush-set','shop-D7255-6.jpg',22),(183,'2-2m-aluminium-parasol-with-protective-bag','shop-D9361-2-1000x600.jpg',22),(184,'waltons-pent-metal-shed-9-x4-2ft','shop-G0537.jpg',22),(185,'5-litre-pressure-sprayer','shop-D8700-new.jpg',22),(186,'cat-scarers','shop-D6828.jpg',22),(187,'twin-pack-outdoor-solar-downlights','shop-D6934.jpg',22),(188,'work-expert-650w-paint-sprayer','shop-G0633%202%201000x600.jpg',22),(189,'waltons-pent-metal-shed-6-6-x-3-9ft','shop-G0164%20G0167%201000x600.jpg',22),(190,'garden-gear-tiller-and-cultivator','shop-GF741-1000x600.jpg',22),(191,'carry-bag-for-zero-gravity-chair','shop-D8404-bag-1.jpg',22),(192,'waltons-6-9ft-x-6-2ft-metal-apex-garden-storage-shed','shop-D9404%20D9490%20G0487%201000x600.jpg',22),(193,'garden-gear-stone-decking-and-patio-cleaner','shop-D7265.jpg',22),(194,'waltons-4-7ft-x-2-9ft-pent-metal-storage-shed','shop-G0475%201000x600.jpg',22),(195,'waltons-6-9-x-4-8ft-pent-metal-storage-shed','shop-G0506%201000x600.jpg',22),(196,'waltons-pent-metal-shed-8-5-x-3-9ft','shop-G0164%20G0167%201000x600.jpg',22),(197,'waltons-6-2-x-8-3ft-greenhouse','shop-D9399%20G0467%20G0468-2.jpg',22),(198,'waltons-pent-metal-shed-6-9-x-4-2ft','shop-G0536.jpg',22),(199,'garden-gear-two-wheeled-wheelbarrow','shop-D5963-4.jpg',22),(200,'2-in-1-six-wheeled-trolley-and-cart','shop-D6611-main.jpg',22),(201,'dual-retractable-clothes-line','shop-D8861-main.jpg',22),(202,'waltons-9-x-6-2ft-metal-apex-garden-storage-shed','shop-G0486.jpg',22),(203,'waltons-6-2-x-6-2ft-greenhouse','shop-G0509%20G0510%20G0511-1.jpg',22),(204,'wipe-clean-tablecloth','shop-Cloth-D86-main.jpg',22),(205,'coil-garden-hose-30m','shop-D7802-1-1000x600.jpg',22),(206,'waltons-6ft-x-3ft-metal-log-store','shop-G0170-cutout.jpg',22),(207,'high-utility-cabinet','shop-D9671-open-temp.jpg',22),(208,'thermal-tap-jacket-twin-pack-','shop-D9146-main.jpg',22),(209,'garden-storage-box','shop-G0433UK-G17-MIDI-STORAGE-BOX-ls-1.jpg',22),(210,'square-parasol-base','shop-D7247-cutout.jpg',22),(211,'utility-cabinet','shop-D9670-temp.jpg',22),(212,'solar-led-cantilever-parasol','shop-D9389A-new.jpg',22),(213,'garden-gear-3-pack-premium-garden-work-gloves','shop-D9732-feature.jpg',22),(214,'4-shelf-utility-cabinet','shop-G0436-UK-G17-4-SHELF-TALL-UTILITY-CABINET-ls-1.jpg',22),(215,'two-pack-of-metal-gutter-filters','shop-D9850-feature.jpg',22),(216,'garden-lounger','shop-D7430-1-1000x600.jpg',22),(217,'waltons-9-1-x-8-4ft-metal-apex-garden-storage-shed','shop-G0490.jpg',22),(218,'gutter-brushes','shop-D50282.jpg',22),(219,'gazebo-party-tent-6-x-3','shop-D8326-new.jpg',22),(220,'stainless-steel-clothes-pegs','shop-D8860-main.jpg',22),(221,'jumbo-garden-storage-box','shop-G0434UK-G17-JUMBO-STORAGE-BOX-ls-1.jpg',22),(222,'zero-gravity-chair','shop-G0880%20G0881%20G0882%20G0883%20G0884%201000x600.jpg',22),(223,'canada-green-grass-seed','shop-D855-1.jpg',22),(224,'waltons-11-1-x-10-4ft-metal-apex-garden-storage-shed','shop-G0490-NEW.jpg',22),(225,'waltons-11-2-x-6-2ft-metal-storage-shed-and-log-store','shop-G0471%20G0473%201000x600.jpg',22),(226,'storage-chests','shop-D9669-temp.jpg',22),(227,'fire-pit','shop-D8851-1000x600.jpg',22),(228,'garden-storage-shed-','shop-D9672%20garden%20storage%20shed%201000x600.jpg',22),(229,'2-shelf-utility-cabinet','shop-G0435UK-G17-2-SHELF-SMALL-UTILITY-CABINET-ls-1.jpg',22),(230,'waltons-7-2-x-4-2ft-skylight-metal-storage-shed','shop-G0478%20G0480%201000x600.jpg',22),(231,'waltons-6-2-x-10-2ft-greenhouse','shop-1%20G0469%20G0513%20G0515%207%201000x600.jpg',22),(232,'waltons-9-1-x-4-1ft-metal-storage-shed-and-log-store','shop-G0470%20G0472%201000x600.jpg',22),(233,'logmaster-log-splitter','shop-D19171-1.jpg',22),(234,'space-saving-slimline-water-butt','shop-D7686-1-1000x600.jpg',22),(235,'57cm-kettle-charcoal-barbecue','shop-D8407-2-1000x600.jpg',22),(236,'cast-iron-chimenea','shop-D8573-feature.jpg',22),(237,'6ft-fold-away-banquet-table','shop-D8807-2-1000x600.jpg',22),(238,'utility-cabinet-small','shop-D8831%201000x600.jpg',22),(239,'electric-charcoal-quick-lighter','shop-D9852-feature.jpg',22),(240,'garden-storage-shed-and-bin-store','shop-G0437-UK-G17-TWO-DOOR-GARDEN-STORAGE-ls-1.jpg',22),(241,'waltons-9-x-10-4ft-metal-apex-garden-storage-shed','shop-G0492.jpg',22),(242,'waltons-7-2-x-6-3ft-skylight-metal-storage-shed','shop-G0477%20G0479%201000x600.jpg',22),(243,'waltons-8-1-x-12ft-greenhouse','shop-1%20G0469%20G0513%20G0515%207%201000x600.jpg',22),(244,'waltons-8-1-x-10-1ft-greenhouse','shop-1%20G0469%20G0513%20G0515%207%201000x600.jpg',22),(245,'waltons-11-1-x-10-4ft-metal-apex-garden-storage-shed','shop-G0490-.jpg',22),(246,'garden-gear-1050w-electric-tiller-cultivator','shop-D5929-2.jpg',22),(247,'deluxe-barrel-effect-water-butt-kit','shop-D7687-1000x600.jpg',22),(248,'bird-feeder-and-water-bath-cleaner-with-sanitiser','shop-G0313.jpg',22),(249,'solar-powered-pest-repeller','shop-D5892-COUNTER.jpg',23),(250,'led-security-wall-light-with-motion-sensor','shop-D8589-feature.jpg',23),(251,'solar-cherub','shop-D3949%20solar%20cherub%20new%20shot%201000x600.jpg',23),(252,'solar-led-garden-lighthouses','shop-3-lighthouse-ls.jpg',23),(253,'200-solar-powered-led-eco-string-lights','shop-D5644-rattan-new.jpg',23),(254,'twin-pack-outdoor-solar-downlights','shop-D6934.jpg',23),(255,'solar-led-hanging-coach-lanterns-set-of-2-','shop-G0887%201000x600.jpg',23),(256,'motion-sensor-wall-light','shop-D9777.jpg',23),(257,'led-security-wall-light','shop-D8590%201000x600.jpg',23),(258,'solar-windmill','shop-G0826%20Windmill%20Is%20_Grupon%201000x600.jpg',23),(259,'garden-gear-super-bright-8-led-solar-powered-motion-sensor-light','shop-D9676A-Pir-light-ls.jpg',23),(260,'solar-sensor-spotlight','shop-D4001-1.jpg',23),(261,'solar-powered-twin-spotlight-with-pir-sensor','shop-D9831-feature.jpg',23),(262,'zennox-solar-shed-light','shop-G0082%20Solar%20Shed%20Light_6%201000x600.jpg',23),(263,'solar-cage-lantern-string-lights','shop-D9826.jpg',23),(264,'pack-of-four-solar-lights-with-crackle-glass-globe','shop-D9833-feature.jpg',23),(265,'set-of-three-flamingo-solar-lights','shop-D9845-Flamingos-ls%201000x600.jpg',23),(266,'zennox-solar-shed-light-with-remote-control','shop-G0083%20Solar%20Shed%20Light%20with%20Remote_7%201000x600.jpg',23),(267,'solar-lights','shop-D9616-feature.jpg',23),(268,'solar-pir-spot-light','shop-D9779.jpg',23),(269,'silhouette-solar-cockerel','shop-D8540-day.jpg',23),(270,'wireless-led-motion-sensor-light','shop-D8994_main.jpg',23),(271,'pack-of-2-solar-powered-shepherds-crook-coach-lanterns','shop-D8537-day.jpg',23),(272,'set-of-four-solar-diamond-stake-lights','shop-D9500_2%201000x600.jpg',23),(273,'solar-led-hanging-lightbulb-cage-lantern','shop-d9830-ls%201000x600.jpg',23),(274,'solar-fence-light','shop-G0886%201000x600.jpg',23),(275,'metal-silhouette-elephant-light','shop-Metal-Silhouette-Elephant-1.jpg',23),(276,'pair-of-bright-eye-cats','shop-Bright-Eyed-Cat-2pk-1.jpg',23),(277,'garden-gear-battery-powered-led-spot-light-with-motion-sensor','shop-D9677A.jpg',23),(278,'stainless-steel-solar-spotlights','shop-D9836-1-feature.jpg',23),(279,'hanging-bulb-solar-lights','shop-D9837.jpg',23),(280,'set-of-two-solar-led-deck-lights','shop-D9844-Deck-lights-4-ls-1000x600.jpg',23),(281,'solar-security-spot-light','shop-D9847%201000x600.jpg',23),(282,'set-of-two-colour-changing-spotlights','shop-D9849-Coloured-spotlight-4-ls-1000x600.jpg',23),(283,'garden-clock-and-weather-station','shop-D9460.jpg',24),(284,'scarecrow-twin-pack','shop-D4454-pair-new.jpg',24),(285,'set-of-3-beehive-planter','shop-D6372-1000x600.jpg',24),(286,'pack-of-four-antique-effect-planters','shop-D6146-1000x600.jpg',24),(287,'solar-cherub','shop-D3949%20solar%20cherub%20new%20shot%201000x600.jpg',24),(288,'200-solar-powered-led-eco-string-lights','shop-D5644-rattan-new.jpg',24),(289,'pack-of-2-half-barrel-trough-planters','shop-D7659-Trough-Planters.jpg',24),(290,'pack-of-4-regency-style-urn-planters','shop-D7656.jpg',24),(291,'pack-of-4-half-barrel-planters','shop-D7654-1000x600.jpg',24),(292,'willow-fence-screening-rolls','shop-G0268%20G0269%20G0270%20G0271%20G0272%201000x600.jpg',24),(293,'fire-pit','shop-D8851-1000x600.jpg',24),(294,'ornamental-water-feature-bird-bath','shop-D9381-main.jpg',24),(295,'turtle-and-frog-water-feature','shop-D9663.jpg',24),(296,'lily-floating-fountain','shop-G1471-Lily-Floating-Fountain.jpg',24),(297,'barrel-water-feature-planter','shop-D7649-1000x600.jpg',24),(298,'metal-silhouette-elephant-light','shop-Metal-Silhouette-Elephant-1.jpg',24),(299,'pair-of-bright-eye-cats','shop-Bright-Eyed-Cat-2pk-1.jpg',24),(300,'57cm-kettle-charcoal-barbecue','shop-D8407-2-1000x600.jpg',24),(301,'saxon-14-inch-welcome-planter','shop-D8549-1000x600.jpg',24),(302,'cast-iron-chimenea','shop-D8573-feature.jpg',24),(303,'outdoor-illuminated-warm-white-blossom-tree','shop-D8065-LEAD-NEW.jpg',24),(304,'ornamental-wheelbarrow-planter','shop-D8546.jpg',24),(305,'artificial-hanging-basket','shop-D854-1000x600.jpg',24),(306,'fairy-water-feature','shop-G1469%201000x600.jpg',24),(307,'water-mill-fountain','shop-G1472_Water-Mill-Fountain_Day.jpg',24),(308,'liliana-cascade','shop-G1473_Liliana-Cascade-Insitu-01_1000x600.jpg',24),(309,'tipping-pail-fountain','shop-G1474_IS%201000x600.jpg',24),(310,'rock-fall-fountain','shop-G1475_Rock-Fall-Fountain-Day.jpg',24),(311,'kingsbury-fountain','shop-G1476_Kingsbury-Fountain_Insitu-01_1000x600.jpg',24),(312,'3m-x-3m-waltons-corner-log-cabin','Log-Cabin-127-3x3-Corner-Cabin-72dpi-(2)_1000x1000.jpg',25),(313,'5m-x-3m-waltons-left-sided-lodge-plus-corner-log-cabin','Log-Cabin-118L-5x3-Corner-Lodge-Plus--left-72dpi_0000_Log-118L_camera3_no_gb_1000x1000.jpg',25),(314,'greenacre-corner-lodge-grande-left-sided-log-cabin','4744-635169330746037500.jpg',25),(315,'4mx4m-greenacre-corner-lodge','4x4corner-1.jpg',25),(316,'5mx3m-greenacre-corner-lodge-plus-right-sided','cornerlodgeright-1.jpg',25),(317,'greenacre-corner-lodge-grande-right-sided-log-cabin','587-633821221184912500.jpg',25),(318,'Carved Marble Wall Fountain','05931sm.jpg',27),(319,'Rustic Birdbath','05941sm.jpg',27),(320,'Bird Bath with Kneeling Dwarf','05802sm.jpg',27),(321,'Fiske-owned Fountain','05433sm.jpg',27),(322,'Fountain Figure with Horn','05731sm.jpg',27),(323,'Above Ground Carved Stone Basin','05421sm.jpg',27),(324,'Fountain Cherub in Leafy Bowl','05736sm.jpg',27),(325,'Carved Stone Fountainheads','05557a.jpg',27),(326,'Copper Roofed Garden Pavilion','05677sm.jpg',28),(327,'Neoclassical Terra-cotta Plaques','05924sm.jpg',28),(328,'Antique Andirons','05945sm.jpg',28),(329,'French Water Barrel','05598sm.jpg',28),(330,'Large Oil Jar and Stand','05528SMALL4128.jpg',28),(331,'Carved Wood French Appliqu?s','05832sm.jpg',28),(332,'Fiske Boot Scraper','05929sm.jpg',28),(333,'English Staddle Stone','05741sm.jpg',28),(334,'Carved and Gilded Plaque','04999SMALL0283.jpg',28),(335,'Garden Accents','05648sm.jpg',28),(336,'Miniature Stone Bridge','05765sm.jpg',28),(337,'American Folk Carving','05277sm.jpg',28),(338,'Indian Plaque','05621sm.jpg',28),(339,'Spirit Cooler Trough','05545SMALL4006.jpg',28),(340,'Four-Handle Vessel','05887sm.jpg',28),(341,'Topiary Support for Vines','05787sm.jpg',28),(342,'Horse and Sulky Weathervane','05432sm.jpg',28),(343,'Zinc Finial','04610sm.jpg',28);
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
INSERT INTO `prices` VALUES (147,'2017-01-01',42.0000),(148,'2017-01-01',344.0000),(149,'2017-01-01',488.0000),(150,'2017-01-01',180.0000),(151,'2017-01-01',339.0000),(152,'2017-01-01',227.0000),(153,'2017-01-01',353.0000),(154,'2017-01-01',88.0000),(155,'2017-01-01',435.0000),(156,'2017-01-01',163.0000),(157,'2017-01-01',345.0000),(158,'2017-01-01',394.0000),(159,'2017-01-01',168.0000),(160,'2017-01-01',484.0000),(161,'2017-01-01',483.0000),(162,'2017-01-01',210.0000),(163,'2017-01-01',209.0000),(164,'2017-01-01',161.0000),(165,'2017-01-01',64.0000),(166,'2017-01-01',305.0000),(167,'2017-01-01',155.0000),(168,'2017-01-01',410.0000),(169,'2017-01-01',144.0000),(170,'2017-01-01',29.0000),(171,'2017-01-01',410.0000),(172,'2017-01-01',391.0000),(173,'2017-01-01',95.0000),(174,'2017-01-01',296.0000),(175,'2017-01-01',153.0000),(176,'2017-01-01',363.0000),(177,'2017-01-01',358.0000),(178,'2017-01-01',286.0000),(179,'2017-01-01',365.0000),(180,'2017-01-01',391.0000),(181,'2017-01-01',300.0000),(182,'2017-01-01',279.0000),(183,'2017-01-01',183.0000),(184,'2017-01-01',306.0000),(185,'2017-01-01',426.0000),(186,'2017-01-01',396.0000),(187,'2017-01-01',25.0000),(188,'2017-01-01',217.0000),(189,'2017-01-01',270.0000),(190,'2017-01-01',259.0000),(191,'2017-01-01',496.0000),(192,'2017-01-01',119.0000),(193,'2017-01-01',128.0000),(194,'2017-01-01',318.0000),(195,'2017-01-01',151.0000),(196,'2017-01-01',299.0000),(197,'2017-01-01',283.0000),(198,'2017-01-01',72.0000),(199,'2017-01-01',428.0000),(200,'2017-01-01',424.0000),(201,'2017-01-01',415.0000),(202,'2017-01-01',86.0000),(203,'2017-01-01',97.0000),(204,'2017-01-01',364.0000),(205,'2017-01-01',28.0000),(206,'2017-01-01',29.0000),(207,'2017-01-01',182.0000),(208,'2017-01-01',335.0000),(209,'2017-01-01',155.0000),(210,'2017-01-01',69.0000),(211,'2017-01-01',166.0000),(212,'2017-01-01',237.0000),(213,'2017-01-01',56.0000),(214,'2017-01-01',142.0000),(215,'2017-01-01',349.0000),(216,'2017-01-01',105.0000),(217,'2017-01-01',192.0000),(218,'2017-01-01',233.0000),(219,'2017-01-01',54.0000),(220,'2017-01-01',449.0000),(221,'2017-01-01',67.0000),(222,'2017-01-01',232.0000),(223,'2017-01-01',38.0000),(224,'2017-01-01',40.0000),(225,'2017-01-01',125.0000),(226,'2017-01-01',180.0000),(227,'2017-01-01',203.0000),(228,'2017-01-01',305.0000),(229,'2017-01-01',205.0000),(230,'2017-01-01',296.0000),(231,'2017-01-01',122.0000),(232,'2017-01-01',482.0000),(233,'2017-01-01',8.0000),(234,'2017-01-01',120.0000),(235,'2017-01-01',414.0000),(236,'2017-01-01',413.0000),(237,'2017-01-01',68.0000),(238,'2017-01-01',303.0000),(239,'2017-01-01',311.0000),(240,'2017-01-01',446.0000),(241,'2017-01-01',388.0000),(242,'2017-01-01',221.0000),(243,'2017-01-01',439.0000),(244,'2017-01-01',421.0000),(245,'2017-01-01',438.0000),(246,'2017-01-01',486.0000),(247,'2017-01-01',319.0000),(248,'2017-01-01',1.0000),(249,'2017-01-01',472.0000),(250,'2017-01-01',491.0000),(251,'2017-01-01',79.0000),(252,'2017-01-01',400.0000),(253,'2017-01-01',104.0000),(254,'2017-01-01',341.0000),(255,'2017-01-01',398.0000),(256,'2017-01-01',440.0000),(257,'2017-01-01',498.0000),(258,'2017-01-01',432.0000),(259,'2017-01-01',255.0000),(260,'2017-01-01',337.0000),(261,'2017-01-01',297.0000),(262,'2017-01-01',86.0000),(263,'2017-01-01',219.0000),(264,'2017-01-01',136.0000),(265,'2017-01-01',217.0000),(266,'2017-01-01',341.0000),(267,'2017-01-01',367.0000),(268,'2017-01-01',434.0000),(269,'2017-01-01',95.0000),(270,'2017-01-01',416.0000),(271,'2017-01-01',479.0000),(272,'2017-01-01',39.0000),(273,'2017-01-01',57.0000),(274,'2017-01-01',121.0000),(275,'2017-01-01',344.0000),(276,'2017-01-01',427.0000),(277,'2017-01-01',154.0000),(278,'2017-01-01',262.0000),(279,'2017-01-01',286.0000),(280,'2017-01-01',17.0000),(281,'2017-01-01',122.0000),(282,'2017-01-01',325.0000),(283,'2017-01-01',47.0000),(284,'2017-01-01',229.0000),(285,'2017-01-01',240.0000),(286,'2017-01-01',397.0000),(287,'2017-01-01',202.0000),(288,'2017-01-01',95.0000),(289,'2017-01-01',95.0000),(290,'2017-01-01',280.0000),(291,'2017-01-01',106.0000),(292,'2017-01-01',82.0000),(293,'2017-01-01',14.0000),(294,'2017-01-01',283.0000),(295,'2017-01-01',1.0000),(296,'2017-01-01',286.0000),(297,'2017-01-01',186.0000),(298,'2017-01-01',6.0000),(299,'2017-01-01',8.0000),(300,'2017-01-01',317.0000),(301,'2017-01-01',442.0000),(302,'2017-01-01',74.0000),(303,'2017-01-01',63.0000),(304,'2017-01-01',360.0000),(305,'2017-01-01',399.0000),(306,'2017-01-01',440.0000),(307,'2017-01-01',173.0000),(308,'2017-01-01',216.0000),(309,'2017-01-01',72.0000),(310,'2017-01-01',460.0000),(311,'2017-01-01',229.0000),(312,'2017-01-01',361.0000),(313,'2017-01-01',152.0000),(314,'2017-01-01',29.0000),(315,'2017-01-01',301.0000),(316,'2017-01-01',458.0000),(317,'2017-01-01',448.0000),(318,'2017-01-01',842.0000),(319,'2017-01-01',922.0000),(320,'2017-01-01',700.0000),(321,'2017-01-01',688.0000),(322,'2017-01-01',831.0000),(323,'2017-01-01',981.0000),(324,'2017-01-01',663.0000),(325,'2017-01-01',709.0000),(326,'2017-01-01',962.0000),(327,'2017-01-01',893.0000),(328,'2017-01-01',917.0000),(329,'2017-01-01',889.0000),(330,'2017-01-01',689.0000),(331,'2017-01-01',828.0000),(332,'2017-01-01',874.0000),(333,'2017-01-01',614.0000),(334,'2017-01-01',846.0000),(335,'2017-01-01',609.0000),(336,'2017-01-01',880.0000),(337,'2017-01-01',771.0000),(338,'2017-01-01',887.0000),(339,'2017-01-01',797.0000),(340,'2017-01-01',778.0000),(341,'2017-01-01',813.0000),(342,'2017-01-01',797.0000),(343,'2017-01-01',747.0000);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,'color',0),(2,'weight',0),(3,'length',0),(4,'width',0),(5,'height',0),(6,'type',0),(7,'diameter',0),(8,'generation',0),(9,'country',5),(10,'producer',10),(11,'material',0);
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

-- Dump completed on 2017-04-23 13:52:25
