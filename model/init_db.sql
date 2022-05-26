 CREATE TABLE `lawyers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`first_name` varchar(40),
	`last_name` varchar(40) NOT NULL,
	`email` varchar(40) NOT NULL,
	`phone` varchar(15) NOT NULL,
	`specialty` varchar(20) NOT NULL,
	`available` BOOLEAN NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `requests` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`description` TEXT NOT NULL,
	`accepted` BOOLEAN NOT NULL,
	`completed` BOOLEAN NOT NULL,
	`requester_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `requesters` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`first_name` varchar(40),
	`last_name` varchar(40) NOT NULL,
	`email` varchar(40) NOT NULL,
	`phone` varchar(15) NOT NULL,
	`needs` varchar(20) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `lawyers_requests` (
	`lawyer_id` INT NOT NULL,
	`request_id` INT NOT NULL
);

ALTER TABLE `requests` ADD CONSTRAINT `requests_fk0` FOREIGN KEY (`requester_id`) REFERENCES `requesters`(`id`);

ALTER TABLE `lawyers_requests` ADD CONSTRAINT `lawyers_requests_fk0` FOREIGN KEY (`lawyer_id`) REFERENCES `lawyers`(`id`);

ALTER TABLE `lawyers_requests` ADD CONSTRAINT `lawyers_requests_fk1` FOREIGN KEY (`request_id`) REFERENCES `requests`(`id`);