import { paths } from 'src/paths';
import { LogoutCurve, User, PresentionChart, Lock1, DocumentText } from 'iconsax-react';
export const getDashboardAdminConfigs = () => {
  return [
    {
      subheader: 'Quản lý',
      items: [
        {
          title: 'Tổng quan tổ chức',
          path: paths.dashboard.index,
          icon: <PresentionChart className='h-5 w-5' />
        },
        {
          title: 'Quản lý Người dùng',
          path: paths.admin['user-management'],
          icon: <User className='h-5 w-5' />
        },
        {
          title: 'Quản lý quyền truy cập',
          path: paths.admin['access-control'],
          icon: <Lock1 className='h-5 w-5' />
        },
        {
          title: 'Tài liệu',
          path: paths.documents.index,
          icon: <DocumentText className='h-5 w-5' />
        }
      ]
    },
    {
      subheader: 'Hành động',
      items: [
        {
          title: 'Đăng xuất',
          path: paths.auth.logout,
          icon: <LogoutCurve className='h-5 w-5' />
        }
      ]
    }
  ];
};
