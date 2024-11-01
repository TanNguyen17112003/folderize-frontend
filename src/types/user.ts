import * as yup from 'yup';

type UserRole = 'ADMIN' | 'USER' | 'EMPLOYEE';

export interface User {
  id: string;
  username: string;
  email: string;
  full_name: string;
  password: string;
  confirm_password: string;
  role: UserRole;
  deleted_at?: null | string | Date;
}

export interface UserDetail extends User {}

export const userSchema = yup.object().shape({
  username: yup.string().required('Vui lòng nhập username'),
  email: yup.string().email('Vui lòng nhập đúng định dạng email').required('Vui lòng nhập email'),
  full_name: yup.string().required('Vui lòng nhập name'),
  password: yup.string().required('Vui lòng nhập password')
});

export const initialUser: UserDetail = {
  id: '',
  username: '',
  email: '',
  full_name: '',
  password: '',
  confirm_password: '',
  role: 'USER'
};

export const users: UserDetail[] = [
  {
    id: '10',
    username: 'username 1',
    email: 'email 1',
    full_name: 'name 1',
    password: 'password 1',
    confirm_password: 'password 1',
    role: 'USER',
    deleted_at: null
  },
  {
    id: '20',
    username: 'username 2',
    email: 'email 2',
    full_name: 'name 2',
    password: 'password 2',
    confirm_password: 'password 2',
    role: 'USER',
    deleted_at: null
  }
];
