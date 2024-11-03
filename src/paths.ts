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
  dashboard: {
    index: '/dashboard'
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
  documents: {
    index: '/documents',
    // 'upload-page': '/documents/documents-upload-page',
    'details-doc': '/documents/details-doc',
    'documents-upload-page': '/documents/documents-upload-page'
  },
  401: '/401',
  404: '/404',
  500: '/500'
};
