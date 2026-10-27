-- CreateTable
CREATE TABLE `buildings` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `service_status` ENUM('측정 중', '준비 중') NOT NULL,
    `base_floor` TINYINT NULL,
    `top_floor` TINYINT NULL,
    `sort_order` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL,
    `building_id` INTEGER NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `floor` TINYINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `building_exits` (
    `id` INTEGER NOT NULL,
    `building_id` INTEGER NOT NULL,
    `floor` TINYINT NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `lat` DECIMAL(9, 6) NULL,
    `lng` DECIMAL(9, 6) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exit_walk_times` (
    `from_exit_id` INTEGER NOT NULL,
    `to_exit_id` INTEGER NOT NULL,
    `seconds` SMALLINT NOT NULL,
    `is_measured` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`from_exit_id`, `to_exit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `elevator_groups` (
    `id` INTEGER NOT NULL,
    `building_id` INTEGER NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `elevator_count` TINYINT NOT NULL,
    `round_trip_sec` SMALLINT NOT NULL,
    `round_trip_quiet_sec` SMALLINT NULL,
    `rssi_min` SMALLINT NOT NULL,
    `paired_stair_id` INTEGER NOT NULL,
    `sort_order` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `measurements` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `elevator_group_id` INTEGER NOT NULL,
    `device_id` INTEGER NOT NULL,
    `measured_at` DATETIME(3) NOT NULL,
    `received_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `window_sec` SMALLINT NOT NULL,
    `device_count` SMALLINT NOT NULL,
    `estimated_people` DECIMAL(6, 1) NOT NULL,
    `level_id` TINYINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sensor_devices` (
    `id` INTEGER NOT NULL,
    `elevator_group_id` INTEGER NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `api_key_hash` CHAR(64) NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `is_simulated` BOOLEAN NOT NULL DEFAULT false,
    `installed_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `congestion_levels` (
    `id` TINYINT NOT NULL,
    `name` VARCHAR(10) NOT NULL,
    `send_cars` TINYINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `level_thresholds` (
    `level_id` TINYINT NOT NULL,
    `elevator_group_id` INTEGER NOT NULL,
    `min_people` SMALLINT NOT NULL,

    PRIMARY KEY (`level_id`, `elevator_group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stairs` (
    `id` INTEGER NOT NULL,
    `building_id` INTEGER NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `sort_order` TINYINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stair_climb_times` (
    `to_floor` TINYINT NOT NULL,
    `stair_id` INTEGER NOT NULL,
    `seconds` SMALLINT NOT NULL,

    PRIMARY KEY (`to_floor`, `stair_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_settings` (
    `id` TINYINT NOT NULL DEFAULT 1,
    `measurement_interval_sec` SMALLINT NOT NULL DEFAULT 10,
    `sensor_timeout_sec` SMALLINT NOT NULL DEFAULT 30,
    `correction_factor` DECIMAL(4, 2) NOT NULL DEFAULT 2.40,
    `recommend_hold_sec` SMALLINT NOT NULL DEFAULT 30,
    `recommend_diff_sec` SMALLINT NOT NULL DEFAULT 10,
    `walk_speed_mps` DECIMAL(3, 2) NOT NULL DEFAULT 1.20,
    `walk_detour_factor` DECIMAL(3, 2) NOT NULL DEFAULT 1.30,
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `buildings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `building_exits` ADD CONSTRAINT `building_exits_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `buildings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exit_walk_times` ADD CONSTRAINT `exit_walk_times_from_exit_id_fkey` FOREIGN KEY (`from_exit_id`) REFERENCES `building_exits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exit_walk_times` ADD CONSTRAINT `exit_walk_times_to_exit_id_fkey` FOREIGN KEY (`to_exit_id`) REFERENCES `building_exits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `elevator_groups` ADD CONSTRAINT `elevator_groups_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `buildings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `elevator_groups` ADD CONSTRAINT `elevator_groups_paired_stair_id_fkey` FOREIGN KEY (`paired_stair_id`) REFERENCES `stairs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `measurements` ADD CONSTRAINT `measurements_elevator_group_id_fkey` FOREIGN KEY (`elevator_group_id`) REFERENCES `elevator_groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `measurements` ADD CONSTRAINT `measurements_device_id_fkey` FOREIGN KEY (`device_id`) REFERENCES `sensor_devices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `measurements` ADD CONSTRAINT `measurements_level_id_fkey` FOREIGN KEY (`level_id`) REFERENCES `congestion_levels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sensor_devices` ADD CONSTRAINT `sensor_devices_elevator_group_id_fkey` FOREIGN KEY (`elevator_group_id`) REFERENCES `elevator_groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `level_thresholds` ADD CONSTRAINT `level_thresholds_level_id_fkey` FOREIGN KEY (`level_id`) REFERENCES `congestion_levels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `level_thresholds` ADD CONSTRAINT `level_thresholds_elevator_group_id_fkey` FOREIGN KEY (`elevator_group_id`) REFERENCES `elevator_groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stairs` ADD CONSTRAINT `stairs_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `buildings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stair_climb_times` ADD CONSTRAINT `stair_climb_times_stair_id_fkey` FOREIGN KEY (`stair_id`) REFERENCES `stairs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
