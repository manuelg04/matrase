/* eslint-disable @typescript-eslint/strict-boolean-expressions */

const roleMapping: Record<number, string> = {
  1: 'conductor',
  2: 'propietario',
  3: 'propietario-conductor'
};

/**
 * Map role_id to user type.
 * @param roleId User's role ID
 * @returns User type as string
 */
export const mapRoleIdToUserType = (roleId: number): string => {
  return roleMapping[roleId] || 'unknown';
};

const messageStatusMapping: Record<number, string> = {
  0: 'pending',
  1: 'readed'
};

/**
 * Map message status to readable status.
 * @param status Message's status value
 * @returns Readable status as string
 */
export const mapMessageStatus = (status: number): string => {
  return messageStatusMapping[status] || 'unknown';
};
