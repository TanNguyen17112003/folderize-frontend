import React from 'react';
import { Box, Stack, Typography, Divider } from '@mui/material';
import { Location, Call, Copyright } from 'iconsax-react';
import { FaTiktok, FaFacebook, FaInstagram, FaX } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import logo from 'public/logo.png';

function DashboardFooter() {
  const contactList: { icon: React.ReactNode; content: string }[] = [
    {
      icon: <Location className='h-6 w-6' color='white' variant='Bold' />,
      content: 'Địa chỉ: Kí túc xá khu A, phường Linh Trung, quận Thủ Đức, TP.HCM'
    },
    {
      icon: <Call className='h-6 w-6' color='white' variant='Bold' />,
      content: 'SĐT: 0862898859'
    },
    {
      icon: <Mail className='h-6 w-6' color='white' />,
      content: 'Email: duytan17112003@gmail.com'
    }
  ];
  return (
    <Box className='mt-5 rounded-t-lg bg-blue-500 py-5 px-10'>
      <Stack mb={1.5}>
        <Stack gap={2}>
          <Typography fontSize={20} fontWeight={'bold'} color='white'>
            Thông tin liên hệ
          </Typography>
          <Stack gap={1.5}>
            {contactList.map((contact, index) => (
              <Stack key={index} direction='row' gap={1}>
                {contact.icon}
                <Typography color='white' fontSize={14}>
                  {contact.content}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction={'row'} justifyContent={'space-between'} mt={1.5}>
        <Stack direction={'row'} gap={0.5} alignItems={'center'}>
          <Copyright width={2} height={2} className='text-white opacity-60' />
          <Typography fontSize={12} color='white' className='opacity-60'>
            Folderize
          </Typography>
        </Stack>
        <Stack direction={'row'} gap={2}>
          <FaFacebook className='text-white opacity-80 cursor-pointer' size={20} />
          <FaInstagram className='text-white opacity-80 cursor-pointer' size={20} />
          <FaTiktok className='text-white opacity-80 cursor-pointer' size={20} />
          <FaX className='text-white opacity-80 cursor-pointer' size={20} />
        </Stack>
      </Stack>
    </Box>
  );
}

export default DashboardFooter;
