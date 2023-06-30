CREATE TABLE `emails` (
	`id` integer PRIMARY KEY NOT NULL,
	`collection_id` integer NOT NULL,
	`email_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`origin` text NOT NULL,
	FOREIGN KEY (`collection_id`) REFERENCES `collections`(`id`) ON UPDATE no action ON DELETE no action
);
