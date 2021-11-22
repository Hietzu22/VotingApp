-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema hietanen.veeti.db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hietanen.veeti.db
-- -----------------------------------------------------
## CREATE SCHEMA IF NOT EXISTS `hietanen.veeti.db` DEFAULT CHARACTER SET utf8 ;
USE `hietanen.veeti.db` ;

-- -----------------------------------------------------
-- Table `hietanen.veeti.db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hietanen.veeti.db`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `pwd` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hietanen.veeti.db`.`poll`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hietanen.veeti.db`.`poll` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `topic` MEDIUMTEXT NOT NULL,
  `start` DATETIME NULL,
  `end` DATETIME NULL,
  `User_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Poll_User_idx` (`User_id` ASC),
  CONSTRAINT `fk_Poll_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `hietanen.veeti.db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hietanen.veeti.db`.`option`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hietanen.veeti.db`.`option` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `votes` INT NOT NULL DEFAULT 0,
  `Poll_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Option_Poll1_idx` (`Poll_id` ASC),
  CONSTRAINT `fk_Option_Poll1`
    FOREIGN KEY (`Poll_id`)
    REFERENCES `hietanen.veeti.db`.`poll` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
