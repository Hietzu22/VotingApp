-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema votedb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema votedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `votedb` DEFAULT CHARACTER SET utf8 ;
USE `votedb` ;

-- -----------------------------------------------------
-- Table `votedb`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `votedb`.`User` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `pwd` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `votedb`.`Poll`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `votedb`.`Poll` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `topic` MEDIUMTEXT NOT NULL,
  `start` DATETIME NULL,
  `end` DATETIME NULL,
  `User_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Poll_User_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_Poll_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `votedb`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `votedb`.`Option`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `votedb`.`Option` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `votes` INT NOT NULL DEFAULT 0,
  `Poll_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Option_Poll1_idx` (`Poll_id` ASC) VISIBLE,
  CONSTRAINT `fk_Option_Poll1`
    FOREIGN KEY (`Poll_id`)
    REFERENCES `votedb`.`Poll` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
