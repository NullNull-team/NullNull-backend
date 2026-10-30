/*
  Warnings:

  - A unique constraint covering the columns `[api_key_hash]` on the table `sensor_devices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `sensor_devices_api_key_hash_key` ON `sensor_devices`(`api_key_hash`);
