import { paths } from 'src/paths';
import { LogoutCurve, User, Lock1, DocumentText, Activity } from 'iconsax-react';
export const getDashboardEmployeeConfigs = () => {
  return [
    {
      subheader: 'Tính năng',
      items: [
        {
          title: 'Hoạt Động Gần Đây',
          path: paths.employee.index,
          icon: <Activity className='h-5 w-5' />
        },
        {
          title: 'Tài Liệu',
          path: paths.documents.index,
          icon: <DocumentText className='h-5 w-5' />
        }
      ]
    },
    {
      subheader: 'Hành động',
      items: [
        {
          title: 'Thông Tin Cá Nhân',
          path: paths.employee.account,
          icon: <User className='h-5 w-5' />
        },
        {
          title: 'Đăng Xuất',
          path: paths.auth.logout,
          icon: <LogoutCurve className='h-5 w-5' />
        }
      ]
    }
  ];
};
