ALTER TABLE `TrainingGroups` ADD `CreatorLearnerId` text REFERENCES `Learners`(`LearnerId`);
