import { paths } from 'src/paths';
import { LogoutCurve, User, PresentionChart, Lock1, DocumentText } from 'iconsax-react';
export const getDashboardAdminConfigs = () => {
  return [
    {
      subheader: 'Quản Lý',
      items: [
        {
          title: 'Tổng Quan Hệ Thống',
          path: paths.dashboard.index,
          icon: <PresentionChart className='h-5 w-5' />
        },
        {
          title: 'Quản Lý Nhân Viên',
          path: paths.admin['user-management'],
          icon: <User className='h-5 w-5' />
        },
        {
          title: 'Quản Lý Quyền Truy Cập',
          path: paths.admin['access-control'],
          icon: <Lock1 className='h-5 w-5' />
        },
        {
          title: 'Tài Liệu',
          path: paths.documents.index,
          icon: <DocumentText className='h-5 w-5' />
        }
      ]
    },
    {
      subheader: 'Hành Động',
      items: [
        {
          title: 'Đăng Xuất',
          path: paths.auth.logout,
          icon: <LogoutCurve className='h-5 w-5' />
        }
      ]
    }
  ];
};
