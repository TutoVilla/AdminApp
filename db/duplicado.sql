-- MySQL dump 10.13  Distrib 8.0.32, for Linux (aarch64)
--
-- Host: localhost    Database: admindb
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--
USE db;
DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `idaccount` int unsigned NOT NULL AUTO_INCREMENT,
  `loginid` int unsigned NOT NULL,
  `currency` varchar(3) NOT NULL,
  `amount` float NOT NULL,
  `datecreated` date NOT NULL,
  `datemodified` datetime NOT NULL,
  PRIMARY KEY (`idaccount`,`loginid`),
  UNIQUE KEY `idaccount_UNIQUE` (`idaccount`),
  KEY `login_account_idx` (`loginid`),
  CONSTRAINT `login_account` FOREIGN KEY (`loginid`) REFERENCES `login` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `descriptions`
--

DROP TABLE IF EXISTS `descriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `descriptions` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `distribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distribution` (
  `iddistribution` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `accountid` int unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `amount` decimal(10,3) NOT NULL,
  `datecreated` datetime NOT NULL,
  `datemodified` datetime NOT NULL,
  `type` tinyint(3) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`iddistribution`,`accountid`),
  UNIQUE KEY `iddistribution_UNIQUE` (`iddistribution`),
  KEY `distribution_accounts_idx` (`accountid`),
  CONSTRAINT `distribution_accounts` FOREIGN KEY (`accountid`) REFERENCES `account` (`idaccount`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `iddistribution` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `accountid` int unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  `amount` decimal(10,3) NOT NULL,
  `datecreated` datetime NOT NULL,
  `datemodified` datetime NOT NULL,
  `type` tinyint unsigned DEFAULT NULL,
  PRIMARY KEY (`iddistribution`,`accountid`),
  UNIQUE KEY `iddistribution_UNIQUE` (`iddistribution`),
  KEY `location_account_idx` (`accountid`),
  CONSTRAINT `location_account` FOREIGN KEY (`accountid`) REFERENCES `account` (`idaccount`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` char(102) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(80) NOT NULL,
  `country` varchar(3) DEFAULT NULL,
  `datecreated` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idlogin_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `registers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registers` (
  `idregisters` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `distributionid` int unsigned NOT NULL,
  `register` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `datecreated` datetime NOT NULL,
  `description` int(10) unsigned zerofill NOT NULL,
  `comment` text,
  PRIMARY KEY (`idregisters`,`distributionid`),
  UNIQUE KEY `idregisters_UNIQUE` (`idregisters`),
  KEY `registers_distribution_idx` (`distributionid`),
  CONSTRAINT `registers_distribution` FOREIGN KEY (`distributionid`) REFERENCES `distribution` (`iddistribution`)
) ENGINE=InnoDB AUTO_INCREMENT=331 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-05 18:11:35
