import * as yup from 'yup';

type UserRole = 'ADMIN' | 'USER' | 'EMPLOYEE';

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: UserRole;
  created_at: string;
  updated_at?: string;
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
  email: '',
  full_name: '',
  phone: '',
  created_at: '',
  role: 'USER'
};
