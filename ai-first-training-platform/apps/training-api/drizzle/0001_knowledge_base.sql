CREATE TABLE `KnowledgeProjects` (
	`Id` text PRIMARY KEY NOT NULL,
	`Name` text NOT NULL,
	`Description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ProjectNotes` (
	`Id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ProjectId` text NOT NULL,
	`Title` text NOT NULL,
	`Content` text NOT NULL,
	`CreatedAtUtc` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`ProjectId`) REFERENCES `KnowledgeProjects`(`Id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `IX_ProjectNotes_ProjectId` ON `ProjectNotes` (`ProjectId`);
