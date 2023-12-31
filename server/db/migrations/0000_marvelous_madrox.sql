CREATE TABLE IF NOT EXISTS `feedbacks` (
	`id` integer PRIMARY KEY NOT NULL,
	`project_id` integer NOT NULL,
	`message` text NOT NULL,
	`origin` text,
	`user` text,
	`country_name` text,
	`device_details` text,
	`custom_attributes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`category` text DEFAULT 'issue' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `projects` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'active' NOT NULL,
	`avatar` text,
	`website` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`github_id` integer NOT NULL,
	`login` text,
	`name` text,
	`email` text,
	`avatarUrl` text,
	`githubUrl` text,
	`githubUsername` text,
	`twitterUsername` text,
	`bio` text,
	`blog` text,
	`company` text,
	`location` text,
	`created_at` integer NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`onboarded` integer DEFAULT false NOT NULL
);
