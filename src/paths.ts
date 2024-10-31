export const paths = {
  index: '/',
  auth: {
    login: '/auth',
    register: {
      index: '/auth/register',
      'complete-signup': '/auth/register/complete-signup'
    },
    'forgot-password': '/auth/forgot-password',
    'reset-password': '/auth/reset-password',
    logout: '/auth/logout'
  },
  admin: {
    index: '/admin',
    'access-control': '/admin/access-control',
    file: {
      'file-upload': '/admin/file/file-upload',
      'file-list': '/admin/file/file-list'
    },
    user: '/admin/user'
  },
  employee: {
    index: '/employee',
    file: {
      'file-upload': '/employee/file/file-upload',
      'file-list': '/employee/file/file-list'
    }
  },
  401: '/401',
  404: '/404',
  500: '/500'
};
