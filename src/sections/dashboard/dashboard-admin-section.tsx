import { Avatar, Box, Divider, Stack, Typography, Button } from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react';
import { OrganizationDetail, mockOrganization } from 'src/types/organization';
import { Copy } from 'iconsax-react';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
import { FaFacebook, FaTwitter } from 'react-icons/fa6';
import { EditIcon, MailIcon, PlusIcon } from 'lucide-react';
import { DocumentsApi } from 'src/api/documents';
import useFunction from 'src/hooks/use-function';
import { Chart } from 'src/components/chart';
import {
  documentsByMonthChartOptions,
  employeesByMonthChartOptions
} from 'src/utils/config-charts';
import { generateEmployees } from 'src/types/user';

function DashboardAdminSection() {
  const { showSnackbarSuccess } = useAppSnackbar();

  const getDocumentsApi = useFunction(DocumentsApi.getDocuments);

  const documents = useMemo(() => {
    return getDocumentsApi.data || [];
  }, [getDocumentsApi.data]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(mockOrganization.adminEmail);
    showSnackbarSuccess('Đã sao chép email');
  }, [showSnackbarSuccess]);

  const documentsByMonth = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const documentsCountByMonth = months.map((month) => {
      return documents.filter(
        (doc) => doc.createdAt && new Date(doc.createdAt).getMonth() + 1 === month
      ).length;
    });
    return documentsCountByMonth;
  }, [documents]);

  const employees = generateEmployees(20);

  const employeesByMonth = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const employeesCountByMonth = months.map((month) => {
      return employees.filter((emp) => new Date(emp.created_at).getMonth() + 1 === month).length;
    });
    return employeesCountByMonth;
  }, [employees]);

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
  }, []);

  useEffect(() => {
    getDocumentsApi.call({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className='flex gap-10 w-full'>
      <Stack width={'60%'} direction={'column'} gap={2}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          paddingBottom={3}
        >
          <Stack direction={'row'} alignItems={'center'} gap={3}>
            <Avatar className='w-15 h-15' />
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
        <Divider className='border-blue-500 w-full my-3' />
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
      <Stack width={'40%'} borderLeft={0.5} paddingLeft={2}>
        <Chart
          title='Biểu đồ tài liệu'
          options={documentsByMonthChartOptions}
          series={[{ name: 'Số lượng tài liệu', data: documentsByMonth }]}
        />
        <Chart
          title='Biểu đồ nhân viên'
          options={employeesByMonthChartOptions}
          series={[{ name: 'Số lượng nhân viên', data: employeesByMonth }]}
          type='bar'
        />
      </Stack>
    </Box>
  );
}

export default DashboardAdminSection;
