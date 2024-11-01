import { FC, useEffect, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from 'src/hooks/use-auth';
import { usePathname } from 'src/hooks/use-pathname';
import { Section } from '../config/config';
import { SideNavSection } from './side-nav-section';
import { NavColor } from 'src/types/settings';
import { SIDE_NAV_WIDTH } from 'src/config';
import { useRouter } from 'next/router';
import { Box, Stack, Typography, Button, Avatar, Tooltip, Badge, Card } from '@mui/material';
import { paths } from 'src/paths';
import { Add, Category, DocumentText } from 'iconsax-react';
import { Bell } from 'lucide-react';
import useFunction from 'src/hooks/use-function';
import logo from '../../../../public/logo.png';
import Image from 'next/image';
import clsx from 'clsx';

interface SideNavProps {
  color?: NavColor;
  sections?: Section[];
}

export const SideNav: FC<SideNavProps> = (props) => {
  const { user } = useAuth();
  const router = useRouter();
  const { sections = [] } = props;
  const pathname = usePathname();
  const [isNotificationListOpen, setIsNotificationListOpen] = useState(false);

  const guestSideNavItems = [
    {
      icon: (
        <Category
          className={clsx(
            'h-5 w-5',
            router.pathname === paths.dashboard.index ? 'text-white' : 'text-black'
          )}
          variant='Bold'
        />
      ),
      title: 'Trang chủ',
      pathname: paths.dashboard.index
    },
    {
      icon: (
        <DocumentText
          className={clsx(
            'h-5 w-5',
            router.pathname === paths.documents.index ? 'text-white' : 'text-black'
          )}
          variant='Bold'
        />
      ),
      title: 'Tài liệu',
      pathname: paths.documents.index
    }
  ];

  const toggleNotificationList = () => {
    setIsNotificationListOpen(!isNotificationListOpen);
  };

  return (
    <Box>
      {user && (
        <Box
          className='fixed inset-0 z-50 h-screen text-white bg-[#0d3e9f] overflow-hidden border-r border-solid border-background-other-Boxider shadow-lg'
          style={{ width: SIDE_NAV_WIDTH }}
        >
          <Box
            className='flex flex-col w-full bg-gray-900  h-full'
            style={{
              backgroundColor: 'var(--nav-bg)',
              color: 'var(--nav-color)'
            }}
          >
            <Stack className='flex-1'>
              <nav className='flex flex-col justify-between space-y-5 px-5 py-3 h-full'>
                <Box className='flex flex-col space-y-5'>
                  <Box className='flex justify-between items-center relative'>
                    <Stack direction={'row'} alignItems={'center'} gap={1} paddingY={2}>
                      <Image src={logo} alt='logo' width={40} height={40} />
                      <Stack>
                        <Typography fontWeight={'bold'}>FOLDERIZE</Typography>
                        <Typography fontSize='12px' className='opacity-60'>
                          Hệ thống quản lý tài liệu chính phủ
                        </Typography>
                      </Stack>
                    </Stack>
                    {user && (user.role === 'EMPLOYEE' || user.role === 'ADMIN') && (
                      <Stack>
                        <Button
                          variant='contained'
                          startIcon={<Add />}
                          className='!text-black !bg-white'
                          LinkComponent={Link}
                        >
                          Thêm tài liệu
                        </Button>
                      </Stack>
                    )}
                    {user?.role === 'USER' && (
                      <Tooltip title='Thông báo' className='cursor-pointer'>
                        <Badge
                          badgeContent={0}
                          color='error'
                          overlap='circular'
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                          }}
                          onClick={toggleNotificationList}
                        >
                          <Bell fontVariant={'bold'} />
                        </Badge>
                      </Tooltip>
                    )}
                  </Box>
                  {sections.map((section, index) => (
                    <SideNavSection
                      items={section.items}
                      key={index}
                      pathname={pathname}
                      subheader={section.subheader}
                    />
                  ))}
                </Box>
                {user && (
                  <Box className='flex gap-2 items-center'>
                    <Avatar />
                    <Stack>
                      {user && <Typography>{user.full_name}</Typography>}

                      {user && (
                        <Typography className='text-xs opacity-60'>
                          {user?.role === 'USER'
                            ? 'Người dung'
                            : user?.role === 'EMPLOYEE'
                              ? 'Nhân viên'
                              : 'Quản trị viên'}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                )}
              </nav>
            </Stack>
          </Box>
        </Box>
      )}
      {!user && (
        <Box
          className='py-10 px-4 fixed inset-0 z-50 h-screen text-white bg-[white] overflow-hidden border-r border-solid border-background-other-Boxider shadow-lg'
          style={{ width: SIDE_NAV_WIDTH - 20 }}
        >
          <Stack marginBottom={5}>
            <Typography
              fontWeight='bold'
              fontSize='30px'
              className='text-center uppercase text-blue-700'
            >
              Folderize
            </Typography>
            <Typography
              fontWeight='semibold'
              fontSize={'14px'}
              className='text-blue-500 text-center'
            >
              Hệ thống quản lý tài liệu chính phủ
            </Typography>
          </Stack>
          <Box className='flex flex-col gap-2 mb-10'>
            {guestSideNavItems.map((item, index) => (
              <Box
                key={index}
                className={clsx(
                  'flex gap-2 items-center py-2 px-2 rounded-lg cursor-pointer',
                  router.pathname === item.pathname && 'bg-blue-600'
                )}
                onClick={() => router.push(item.pathname)}
              >
                {item.icon}
                <Typography
                  fontWeight='semibold'
                  className={clsx(router.pathname === item.pathname ? 'text-white' : 'text-black')}
                >
                  {item.title}
                </Typography>
              </Box>
            ))}
          </Box>
          <Card className='p-5 flex flex-col items-center gap-3'>
            <Image src={logo} alt='logo' />
            <Typography fontSize={14} fontWeight={'bold'}>
              Khách
            </Typography>
            <Typography fontSize={12} fontWeight={'light'} textAlign={'center'}>
              Đăng nhập để trải nghiệm thêm các tính năng của hệ thống
            </Typography>
            <Button variant='contained' fullWidth href={paths.auth.login}>
              Đăng nhập
            </Button>
          </Card>
        </Box>
      )}
    </Box>
  );
};
