CREATE TABLE `CourseModules` (
	`Id` text PRIMARY KEY NOT NULL,
	`Week` integer NOT NULL,
	`Title` text NOT NULL,
	`Tagline` text NOT NULL,
	`Summary` text NOT NULL,
	`Objective` text NOT NULL,
	`Minutes` integer NOT NULL,
	`SectionsJson` text NOT NULL,
	`ExampleTitle` text NOT NULL,
	`Example` text NOT NULL,
	`PracticeTitle` text NOT NULL,
	`Practice` text NOT NULL,
	`DeliverablesJson` text NOT NULL,
	`CheckpointQuestion` text NOT NULL,
	`CheckpointOptionsJson` text NOT NULL,
	`CorrectAnswerIndex` integer NOT NULL,
	`PromptCode` text NOT NULL,
	`SortOrder` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Learners` (
	`LearnerId` text PRIMARY KEY NOT NULL,
	`DisplayName` text NOT NULL,
	`CreatedAtUtc` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `StudentProgress` (
	`LearnerId` text NOT NULL,
	`ModuleId` text NOT NULL,
	`Reflection` text DEFAULT '' NOT NULL,
	`SelectedAnswer` integer,
	`CheckpointPassed` integer DEFAULT false NOT NULL,
	`Completed` integer DEFAULT false NOT NULL,
	`UpdatedAtUtc` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`CompletedAtUtc` text,
	PRIMARY KEY(`LearnerId`, `ModuleId`),
	FOREIGN KEY (`LearnerId`) REFERENCES `Learners`(`LearnerId`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`ModuleId`) REFERENCES `CourseModules`(`Id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `IX_StudentProgress_ModuleId` ON `StudentProgress` (`ModuleId`);--> statement-breakpoint
CREATE TABLE `TrainingGroupMembers` (
	`Id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`GroupId` integer NOT NULL,
	`Name` text NOT NULL,
	`Role` text NOT NULL,
	`AddedAtUtc` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`GroupId`) REFERENCES `TrainingGroups`(`Id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `IX_TrainingGroupMembers_GroupId_Name` ON `TrainingGroupMembers` (`GroupId`,`Name`);--> statement-breakpoint
CREATE INDEX `IX_TrainingGroupMembers_GroupId` ON `TrainingGroupMembers` (`GroupId`);--> statement-breakpoint
CREATE TABLE `TrainingGroups` (
	`Id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`Name` text NOT NULL,
	`ProjectCode` text,
	`CreatedAtUtc` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `IX_TrainingGroups_Name` ON `TrainingGroups` (`Name`);