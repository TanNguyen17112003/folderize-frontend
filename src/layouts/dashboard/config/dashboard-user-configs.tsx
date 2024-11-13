import { paths } from 'src/paths';
import { LogoutCurve, User, Lock1, DocumentText, Activity } from 'iconsax-react';
export const getDashboardUserConfigs = () => {
  return [
    {
      // subheader: 'Tính năng',
      items: [
        // {
        //   title: 'Hoạt động gần đây',
        //   path: paths.dashboard.index,
        //   icon: <Activity className='h-5 w-5' />
        // },
        {
          title: 'Tài liệu',
          path: paths.documents.index,
          icon: <DocumentText className='h-5 w-5' />
        },
        {
          title: 'Thông tin cá nhân',
          path: paths.user.account,
          icon: <User className='h-5 w-5' />
        },
        {
          title: 'Đăng xuất',
          path: paths.auth.logout,
          icon: <LogoutCurve className='h-5 w-5' />
        }
      ]
    }
  ];
};
