import * as yup from 'yup';

type UserRole = 'ADMIN' | 'USER' | 'EMPLOYEE';

export interface User {
  index?: number;
  id: number;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
}

export interface UserDetail extends User {}

export const userSchema = yup.object().shape({
  username: yup.string().required('Vui lòng nhập username'),
  email: yup.string().email('Vui lòng nhập đúng định dạng email').required('Vui lòng nhập email'),
  fullName: yup.string().required('Vui lòng nhập name'),
  password: yup.string().required('Vui lòng nhập password')
});

export const initialUser: UserDetail = {
  id: 0,
  email: '',
  fullName: '',
  phone: '',
  createdAt: '',
  role: 'USER'
};

const getRandomDateThisYear = (): string => {
  const start = new Date(new Date().getFullYear(), 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
};

export const generateEmployees = (count: number): UserDetail[] => {
  const employees: UserDetail[] = [];
  for (let i = 0; i < count; i++) {
    employees.push({
      id: i + 1,
      email: `employee${i + 1}@example.com`,
      fullName: `Employee ${i + 1}`,
      phone: `123-456-789${i}`,
      role: 'EMPLOYEE',
      createdAt: getRandomDateThisYear(),
      updatedAt: undefined
    });
  }
  return employees;
};

export const employees = generateEmployees(20);
