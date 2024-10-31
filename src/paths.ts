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
    'user-management': '/admin/user-management'
  },
  employee: {
    index: '/employee'
  },
  user: {
    index: '/user'
  },
  401: '/401',
  404: '/404',
  500: '/500'
};
