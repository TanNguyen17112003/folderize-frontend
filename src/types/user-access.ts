import { v4 as uuidv4 } from 'uuid';

type UserAccessType = 'ACCESS' | 'EDIT';

export interface UserAccess {
  id: string;
  userId: string;
  userName: string;
  documentId: string;
  documentName: string;
  accessType: UserAccessType;
  createdAt: string;
}

export interface UserAccessDetail extends UserAccess {}

const generateUserAccessData = (): UserAccess[] => {
  const userAccessList: UserAccess[] = [];

  for (let i = 0; i < 10; i++) {
    userAccessList.push({
      id: uuidv4(),
      userId: uuidv4(),
      userName: 'Chovy',
      documentId: uuidv4(),
      documentName: `Document ${i + 1}`,
      accessType: 'ACCESS',
      createdAt: (Date.now() / 1000).toString() // Unix timestamp in seconds as string
    });
  }

  for (let i = 0; i < 10; i++) {
    userAccessList.push({
      id: uuidv4(),
      userId: uuidv4(),
      userName: 'Canyon',
      documentId: uuidv4(),
      documentName: `Document ${i + 11}`,
      accessType: 'EDIT',
      createdAt: (Date.now() / 1000).toString() // Unix timestamp in seconds as string
    });
  }

  return userAccessList;
};

export const userAccessData = generateUserAccessData();
