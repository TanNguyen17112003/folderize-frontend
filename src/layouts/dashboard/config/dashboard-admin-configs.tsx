import { paths } from 'src/paths';
import { LogoutCurve, User, PresentionChart, Lock1, DocumentText } from 'iconsax-react';
export const getDashboardAdminConfigs = () => {
  return [
    {
      subheader: 'Quản lý',
      items: [
        {
          title: 'Thống kê',
          path: paths.admin.index,
          icon: <PresentionChart className='h-5 w-5' />
        },
        {
          title: 'Người dùng',
          path: paths.admin['user-management'],
          icon: <User className='h-5 w-5' />
        },
        {
          title: 'Quyền truy cập',
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
