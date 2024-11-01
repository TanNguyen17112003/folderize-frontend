import React from 'react';
import { Box, Stack, TextField, Button, InputAdornment, Typography } from '@mui/material';
import { SearchIcon } from 'lucide-react';
import { ArrowRight, Book, User, Building } from 'iconsax-react';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import backgroundRectangle from 'public/ui/background-rectangle.jpg';

interface DashboardInfoProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
}

function DashboardIndex() {
  const [searchInput, setSearchInput] = React.useState('');
  const router = useRouter();

  const dashboardInfoList: DashboardInfoProps[] = [
    {
      title: 'Tài liệu',
      amount: 180,
      icon: <Book className='h-10 w-10' color='black' variant='Bold' />
    },
    {
      title: 'Số nhân viên',
      amount: 20,
      icon: <User className='h-10 w-10' color='black' variant='Bold' />
    },
    {
      title: 'Số tổ chức',
      amount: 5,
      icon: <Building className='h-10 w-10' color='black' variant='Bold' />
    }
  ];

  return (
    <Box className='px-6 py-5'>
      <Stack direction={'row'} gap={2} width={'100%'}>
        <TextField
          variant='outlined'
          placeholder='Tìm kiếm theo từ khóa...'
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
            onClick={() => router.push(paths.admin['user-management'])}
          >
            Khám phá
          </Button>
        </Stack>
      </Box>
      <Stack direction={'row'} gap={3} className='mt-5 w-full'>
        {dashboardInfoList.map((info, index) => (
          <Stack
            direction={'row'}
            className='gap-3 px-5 py-7 rounded-lg w-[33.33%] shadow-md cursor-pointer'
            key={index}
          >
            {info.icon}
            <Box>
              <Typography>{info.title}</Typography>
              <Typography fontWeight={'bold'} fontSize={18}>
                {info.amount}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default DashboardIndex;
