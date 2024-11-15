import React, { useEffect, useMemo } from 'react';
import { Box, Stack, TextField, Button, InputAdornment, Typography, Avatar } from '@mui/material';
import { SearchIcon } from 'lucide-react';
import { ArrowRight, Book, Building } from 'iconsax-react';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import backgroundRectangle from 'public/ui/background-rectangle.jpg';
import DashboardFooter from './dashboard-footer';
import { useAuth } from 'src/hooks/use-auth';
import { DocumentsApi } from 'src/api/documents';
import { OrganizationsApi } from 'src/api/organizations';
import useFunction from 'src/hooks/use-function';
import DashboardAdminSection from './dashboard-admin/dashboard-admin-section';
import DashboardUserSection from './dashboard-user-section';
import DashboardEmployeeSection from './dashboard-employee-section';

interface DashboardInfoProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
}

function DashboardIndex() {
  const [searchInput, setSearchInput] = React.useState('');
  const router = useRouter();
  const { user } = useAuth();

  const getDocumentsApi = useFunction(DocumentsApi.getDocuments);
  const getOrganizationsApi = useFunction(OrganizationsApi.getNumberOfOrganizations);

  const documents = useMemo(() => {
    return getDocumentsApi.data || [];
  }, [getDocumentsApi.data]);
  const organizations = useMemo(() => {
    return getOrganizationsApi.data || [];
  }, [getOrganizationsApi.data]);

  const dashboardInfoList: DashboardInfoProps[] = useMemo(
    () => [
      {
        title: 'Tài liệu',
        amount: documents.length,
        icon: <Book className='h-10 w-10' color='black' variant='Bold' />
      },
      {
        title: 'Số tổ chức',
        amount: organizations || 0,
        icon: <Building className='h-10 w-10' color='black' variant='Bold' />
      }
    ],
    [documents, organizations]
  );

  useEffect(() => {
    getDocumentsApi.call({});
    getOrganizationsApi.call({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return (
      <Box className='px-6 py-5'>
        <Stack direction={'row'} gap={2} width={'100%'}>
          <TextField
            variant='outlined'
            placeholder='Tìm kiếm theo tên tài liệu...'
            className='w-[90%]'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <Button variant='contained' className='w-[10%]'>
            Tìm kiếm
          </Button>
        </Stack>
        <Box
          className='mt-5 h-90 w-[100%] bg-cover bg-center rounded-lg object-cover py-10'
          style={{ backgroundImage: `url(${backgroundRectangle.src})` }}
        >
          <Stack marginLeft={5} alignSelf={'center'} width={'20%'}>
            <Typography color='white' className='uppercase' fontSize={30} fontWeight={'bold'}>
              Hệ thống quản lý tài liệu chính phủ
            </Typography>
            <Button
              variant='contained'
              color='info'
              fullWidth={false}
              endIcon={<ArrowRight />}
              onClick={() => router.push(paths.documents.index)}
            >
              Khám phá
            </Button>
          </Stack>
        </Box>
        <Stack direction={'row'} gap={3} className='mt-5 w-full'>
          {dashboardInfoList.map((info, index) => (
            <Stack
              direction={'row'}
              className='gap-3 px-5 py-7 rounded-lg w-1/2 shadow-md cursor-pointer'
              key={index}
            >
              {info.icon}
              <Box>
                <Typography>{info.title}</Typography>
                <Typography fontWeight={'bold'} fontSize={18}>
                  {info.amount > 0 ? info.amount : '0'}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
        <DashboardFooter />
      </Box>
    );
  } else {
    return (
      <Stack paddingY={3} paddingX={4}>
        {user.role === 'ADMIN' && <DashboardAdminSection />}
        {user.role === 'USER' && <DashboardUserSection />}
        {user.role === 'EMPLOYEE' && <DashboardEmployeeSection />}
      </Stack>
    );
  }
}

export default DashboardIndex;
