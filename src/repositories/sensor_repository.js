import prisma from '../config/prisma_client.js';

const findByApiKeyHash = async (apiKeyHash) => {
  return prisma.sensorDevice.findUnique({
    where: {
      apiKeyHash,
    },
    select: {
      id: true,
      elevatorGroupId: true,
      isEnabled: true,
    },
  });
};

export { findByApiKeyHash };