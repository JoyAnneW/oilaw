DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`first_name` varchar(40) NOT NULL,
	`last_name` varchar(40) NOT NULL,
	`email` varchar(40) NOT NULL,
	`phone` varchar(15) NOT NULL,
	`role` varchar(11) NOT NULL,
	`password` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `requests`;

CREATE TABLE `requests` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`requester_id` INT NOT NULL,
	`description` TEXT NOT NULL,
	`accepted` BOOLEAN NOT NULL DEFAULT '0',
	`assigned` BOOLEAN NOT NULL DEFAULT '0',
	`completed` BOOLEAN NOT NULL DEFAULT '0',
	`created_at` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `requesters`;

CREATE TABLE `requesters` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`contact_pref` varchar(5) NOT NULL,
	PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `lawyer_assignments`;

CREATE TABLE `lawyer_assignments` (
	`lawyer_id` INT NOT NULL,
	`request_id` INT NOT NULL
);

DROP TABLE IF EXISTS `lawyers`;

CREATE TABLE `lawyers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`specialty` varchar(20) NOT NULL,
	`available` BOOLEAN NOT NULL DEFAULT '1',
	`user_id` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `requests` ADD CONSTRAINT `requests_fk0` FOREIGN KEY (`requester_id`) REFERENCES `requesters`(`id`);

ALTER TABLE `requesters` ADD CONSTRAINT `requesters_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `lawyer_assignments` ADD CONSTRAINT `lawyer_assignments_fk0` FOREIGN KEY (`lawyer_id`) REFERENCES `lawyers`(`id`);

ALTER TABLE `lawyer_assignments` ADD CONSTRAINT `lawyer_assignments_fk1` FOREIGN KEY (`request_id`) REFERENCES `requests`(`id`);

ALTER TABLE `lawyers` ADD CONSTRAINT `lawyers_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);







