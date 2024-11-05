import { Avatar, Box, Divider, Stack, Typography, Button } from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react';
import { OrganizationDetail, mockOrganization } from 'src/types/organization';
import { Copy } from 'iconsax-react';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
import { FaFacebook, FaTwitter } from 'react-icons/fa6';
import { EditIcon, MailIcon, PlusIcon } from 'lucide-react';
import { DocumentsApi } from 'src/api/documents';
import useFunction from 'src/hooks/use-function';

function DashboardAdminSection() {
  const { showSnackbarSuccess } = useAppSnackbar();

  const getDocumentsApi = useFunction(DocumentsApi.getDocuments);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(mockOrganization.adminEmail);
    showSnackbarSuccess('Đã sao chép email');
  }, []);

  const contactList = useMemo(() => {
    return [
      {
        icon: <FaFacebook className='text-black opacity-80 cursor-pointer' size={20} />,
        content: 'Facebook'
      },
      {
        icon: <FaTwitter className='text-black opacity-80 cursor-pointer' size={20} />,
        content: 'Twitter'
      },
      {
        icon: <MailIcon className='h-5 w-5 cursor-pointer' color='black' />,
        content: 'Email'
      }
    ];
  }, []);

  const organizationInfoList = useMemo(() => {
    return [
      {
        title: 'Tên',
        content: mockOrganization.name
      },
      {
        title: 'Mã số',
        content: mockOrganization.code
      },
      {
        title: 'Số điện thoại',
        content: mockOrganization.organization_phone
      },
      {
        title: 'Phòng ban',
        content: mockOrganization.department_type
      },
      {
        title: 'Địa chỉ',
        content: mockOrganization.address
      }
    ];
  }, [mockOrganization]);

  useEffect(() => {
    getDocumentsApi.call({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box className='flex gap-5 w-full'>
      <Stack width={'60%'} direction={'column'} gap={2}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingBottom={3}
        >
          <Stack direction={'row'} alignItems={'center'} gap={3}>
            <Avatar sx={{ width: 60, height: 60 }} />
            <Box className='flex flex-col gap-3'>
              <Typography variant='h4'>{mockOrganization.adminName}</Typography>
              <Typography variant='body1' fontWeight={'semibold'}>
                {mockOrganization.adminPhone}
              </Typography>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Typography variant='body2' color='primary' className='underline'>
                  {mockOrganization.adminEmail}
                </Typography>
                <Copy size={16} color='blue' cursor={'pointer'} onClick={handleCopy} />
              </Stack>
            </Box>
          </Stack>
          <Button startIcon={<PlusIcon size={20} />} variant='contained' color='warning'>
            Thêm nhân viên
          </Button>
        </Stack>
        <Stack direction={'row'}>
          {contactList.map((contact, index) => (
            <Stack
              key={index}
              direction='column'
              alignItems={'center'}
              gap={1}
              width={'33.33%'}
              className='cursor-pointer'
            >
              {contact.icon}
              <Typography color='black' fontSize={14}>
                {contact.content}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Divider sx={{ borderColor: 'blue', width: '100%', marginY: 3 }} />
        <Stack gap={3}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant='h5' color='primary'>
              Thông tin về công ty
            </Typography>
            <Button variant='contained' color='primary' startIcon={<EditIcon size={20} />}>
              Chỉnh sửa thông tin
            </Button>
          </Stack>
          {organizationInfoList.map((info, index) => (
            <Stack key={index} direction={'row'} gap={1}>
              <Typography variant='body2' color='black' fontWeight={'bold'}>
                {info.title}:
              </Typography>
              <Typography variant='body2' color='black'>
                {info.content}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack width={'40%'} className='shadow-md'></Stack>
    </Box>
  );
}

export default DashboardAdminSection;
