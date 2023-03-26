-- MySQL Script generated by MySQL Workbench
-- Sun Mar 26 14:34:21 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema admindb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `admindb` ;

-- -----------------------------------------------------
-- Schema admindb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `admindb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
-- -----------------------------------------------------
-- Schema new_schema
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema user_id
-- -----------------------------------------------------
USE `admindb` ;

-- -----------------------------------------------------
-- Table `admindb`.`login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`login` ;

CREATE TABLE IF NOT EXISTS `admindb`.`login` (
  `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` CHAR(102) NOT NULL,
  `fullname` VARCHAR(50) NOT NULL,
  `userid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `userid_UNIQUE` (`userid` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`db_`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`db_` ;

CREATE TABLE IF NOT EXISTS `admindb`.`db_` (
  `iddb` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `iduser` INT UNSIGNED NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iddb`),
  UNIQUE INDEX `iddb_index_UNIQUE` (`iddb` ASC) VISIBLE,
  UNIQUE INDEX `id_login_UNIQUE` (`iduser` ASC) VISIBLE,
  CONSTRAINT `iduser`
    FOREIGN KEY (`iduser`)
    REFERENCES `admindb`.`login` (`userid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `admindb`.`j_dolars`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`j_dolars` ;

CREATE TABLE IF NOT EXISTS `admindb`.`j_dolars` (
  `id` INT UNSIGNED NOT NULL,
  `plus` REAL NULL DEFAULT NULL,
  `minus` REAL NULL DEFAULT NULL,
  `total` REAL NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `concept` INT UNSIGNED NULL DEFAULT NULL,
  `dbid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `dbid_UNIQUE` (`dbid` ASC) VISIBLE,
  CONSTRAINT `iddb`
    FOREIGN KEY (`dbid`)
    REFERENCES `admindb`.`db_` (`iddb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`j_pounds`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`j_pounds` ;

CREATE TABLE IF NOT EXISTS `admindb`.`j_pounds` (
  `id` INT UNSIGNED NOT NULL,
  `plus` REAL NULL DEFAULT NULL,
  `minus` REAL NULL DEFAULT NULL,
  `total` REAL NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `concept` INT UNSIGNED NULL DEFAULT NULL,
  `dbid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `dbid_UNIQUE` (`dbid` ASC) VISIBLE,
  CONSTRAINT `iddb0`
    FOREIGN KEY (`dbid`)
    REFERENCES `admindb`.`db_` (`iddb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`j_euros`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`j_euros` ;

CREATE TABLE IF NOT EXISTS `admindb`.`j_euros` (
  `id` INT UNSIGNED NOT NULL,
  `plus` REAL NULL DEFAULT NULL,
  `minus` REAL NULL DEFAULT NULL,
  `total` REAL NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `concept` INT UNSIGNED NULL DEFAULT NULL,
  `dbid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `dbid_UNIQUE` (`dbid` ASC) VISIBLE,
  CONSTRAINT `iddb00`
    FOREIGN KEY (`dbid`)
    REFERENCES `admindb`.`db_` (`iddb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`login_has_euros_main_jose`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`login_has_euros_main_jose` ;

CREATE TABLE IF NOT EXISTS `admindb`.`login_has_euros_main_jose` (
  `login_id` SMALLINT UNSIGNED NOT NULL,
  `euros_main_jose_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`login_id`, `euros_main_jose_id`),
  INDEX `fk_login_has_euros_main_jose_euros_main_jose1_idx` (`euros_main_jose_id` ASC) VISIBLE,
  INDEX `fk_login_has_euros_main_jose_login1_idx` (`login_id` ASC) VISIBLE,
  CONSTRAINT `fk_login_has_euros_main_jose_login1`
    FOREIGN KEY (`login_id`)
    REFERENCES `admindb`.`login` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_login_has_euros_main_jose_euros_main_jose1`
    FOREIGN KEY (`euros_main_jose_id`)
    REFERENCES `admindb`.`j_euros` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`dolar_main_ana`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`dolar_main_ana` ;

CREATE TABLE IF NOT EXISTS `admindb`.`dolar_main_ana` (
  `id` INT UNSIGNED NOT NULL,
  `plus` DOUBLE NULL DEFAULT NULL,
  `minus` DOUBLE NULL DEFAULT NULL,
  `total` DOUBLE NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `concept` INT UNSIGNED NULL DEFAULT NULL,
  `dbid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `dbid_UNIQUE` (`dbid` ASC) VISIBLE,
  CONSTRAINT `iddb1`
    FOREIGN KEY (`dbid`)
    REFERENCES `admindb`.`db_` (`iddb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`ana_pounds`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`ana_pounds` ;

CREATE TABLE IF NOT EXISTS `admindb`.`ana_pounds` (
  `id` INT UNSIGNED NOT NULL,
  `plus` REAL NULL DEFAULT NULL,
  `minus` REAL NULL DEFAULT NULL,
  `total` REAL NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `concept` INT UNSIGNED NULL DEFAULT NULL,
  `dbid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `dbid_UNIQUE` (`dbid` ASC) VISIBLE,
  CONSTRAINT `iddb01`
    FOREIGN KEY (`dbid`)
    REFERENCES `admindb`.`db_` (`iddb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`euros_main_ana`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`euros_main_ana` ;

CREATE TABLE IF NOT EXISTS `admindb`.`euros_main_ana` (
  `id` INT UNSIGNED NOT NULL,
  `plus` DOUBLE NULL DEFAULT NULL,
  `minus` DOUBLE NULL DEFAULT NULL,
  `total` DOUBLE NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `concept` INT UNSIGNED NULL DEFAULT NULL,
  `dbid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `dbid_UNIQUE` (`dbid` ASC) VISIBLE,
  CONSTRAINT `iddb000`
    FOREIGN KEY (`dbid`)
    REFERENCES `admindb`.`db_` (`iddb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`j_mng_1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`j_mng_1` ;

CREATE TABLE IF NOT EXISTS `admindb`.`j_mng_1` (
  `id` INT UNSIGNED NOT NULL,
  `plus` REAL NULL DEFAULT NULL,
  `minus` REAL NULL DEFAULT NULL,
  `total` REAL NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `concept` INT UNSIGNED NULL DEFAULT NULL,
  `dbid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `dbid_UNIQUE` (`dbid` ASC) VISIBLE,
  CONSTRAINT `iddb010`
    FOREIGN KEY (`dbid`)
    REFERENCES `admindb`.`db_` (`iddb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`j_mng_2`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`j_mng_2` ;

CREATE TABLE IF NOT EXISTS `admindb`.`j_mng_2` (
  `id` INT UNSIGNED NOT NULL,
  `plus` REAL NULL DEFAULT NULL,
  `minus` REAL NULL DEFAULT NULL,
  `total` REAL NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `concept` INT UNSIGNED NULL DEFAULT NULL,
  `dbid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `dbid_UNIQUE` (`dbid` ASC) VISIBLE,
  CONSTRAINT `iddb0100`
    FOREIGN KEY (`dbid`)
    REFERENCES `admindb`.`db_` (`iddb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`j_mng_3`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`j_mng_3` ;

CREATE TABLE IF NOT EXISTS `admindb`.`j_mng_3` (
  `id` INT UNSIGNED NOT NULL,
  `plus` REAL NULL DEFAULT NULL,
  `minus` REAL NULL DEFAULT NULL,
  `total` REAL NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `concept` INT UNSIGNED NULL DEFAULT NULL,
  `dbid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `dbid_UNIQUE` (`dbid` ASC) VISIBLE,
  CONSTRAINT `iddb0101`
    FOREIGN KEY (`dbid`)
    REFERENCES `admindb`.`db_` (`iddb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`j_pounds_dist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`j_pounds_dist` ;

CREATE TABLE IF NOT EXISTS `admindb`.`j_pounds_dist` (
  `id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `concept` INT UNSIGNED NULL DEFAULT NULL,
  `dbid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `dbid_UNIQUE` (`dbid` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `iddb0102`
    FOREIGN KEY (`dbid`)
    REFERENCES `admindb`.`db_` (`iddb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`j_dolars_dist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`j_dolars_dist` ;

CREATE TABLE IF NOT EXISTS `admindb`.`j_dolars_dist` (
  `id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `concept` INT UNSIGNED NULL DEFAULT NULL,
  `dbid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `dbid_UNIQUE` (`dbid` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `iddb01020`
    FOREIGN KEY (`dbid`)
    REFERENCES `admindb`.`db_` (`iddb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `admindb`.`j_euros_dist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`j_euros_dist` ;

CREATE TABLE IF NOT EXISTS `admindb`.`j_euros_dist` (
  `id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `concept` INT UNSIGNED NULL DEFAULT NULL,
  `dbid` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `dbid_UNIQUE` (`dbid` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  CONSTRAINT `iddb010200`
    FOREIGN KEY (`dbid`)
    REFERENCES `admindb`.`db_` (`iddb`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

USE `admindb` ;

-- -----------------------------------------------------
-- Placeholder table for view `admindb`.`view1`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admindb`.`view1` (`id` INT);

-- -----------------------------------------------------
-- View `admindb`.`view1`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `admindb`.`view1`;
DROP VIEW IF EXISTS `admindb`.`view1` ;
USE `admindb`;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;