import { Avatar, Box, Divider, Stack, Typography, Button } from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react';
import { OrganizationDetail } from 'src/types/organization';
import { Copy } from 'iconsax-react';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
import { FaFacebook, FaTwitter, FaX } from 'react-icons/fa6';
import { EditIcon, MailIcon, PlusIcon } from 'lucide-react';
import { DocumentsApi } from 'src/api/documents';
import { OrganizationsApi } from 'src/api/organizations';
import useFunction from 'src/hooks/use-function';
import { Chart } from 'src/components/chart';
import {
  documentsByMonthChartOptions,
  employeesByMonthChartOptions
} from 'src/utils/config-charts';
import { useDialog } from 'src/hooks/use-dialog';
import { useDrawer } from 'src/hooks/use-drawer';
import { useAuth } from 'src/hooks/use-auth';
import DashboardAddEmployeeDialog from './dashboard-admin-add-employee-dialog';
import DashboardAdminEditDrawer from './dashboard-admin-edit-drawer';
import { formatUnixTimestamp } from 'src/utils/format-time-currency';

function DashboardAdminOrganizationSection() {
  const { showSnackbarSuccess } = useAppSnackbar();
  const [organization, setOrganization] = React.useState<OrganizationDetail | null>(null);
  const { user } = useAuth();
  const addEmployeeDialog = useDialog<OrganizationDetail>();
  const editOrganizationDrawer = useDrawer<OrganizationDetail>();

  const getDocumentsApi = useFunction(DocumentsApi.getDocuments);
  const getOrganizationEmployeesApi = useFunction(OrganizationsApi.getOrganizationEmployees);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await OrganizationsApi.getUserOrganizationInfo();
        setOrganization(response);
      } catch (error) {
        throw error;
      }
    };
    fetchOrganization();
  }, [user]);

  const documents = useMemo(() => {
    return getDocumentsApi.data || [];
  }, [getDocumentsApi.data]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(user?.email as string);
    showSnackbarSuccess('Đã sao chép email');
  }, [showSnackbarSuccess, user]);

  const documentsByMonth = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const documentsCountByMonth = months.map((month) => {
      return documents.filter(
        (doc) =>
          doc.versions[0].createdAt && new Date(doc.versions[0].createdAt).getMonth() + 1 === month
      ).length;
    });
    return documentsCountByMonth;
  }, [documents]);

  const employees = useMemo(() => {
    return getOrganizationEmployeesApi.data?.employeeList || [];
  }, [getOrganizationEmployeesApi.data]);

  const employeesByMonth = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const employeesCountByMonth = months.map((month) => {
      return employees.filter(
        (emp) =>
          emp.role === 'EMPLOYEE' &&
          emp.createdAt &&
          new Date(formatUnixTimestamp(emp.createdAt)).getMonth() + 1 === month
      ).length;
    });
    return employeesCountByMonth;
  }, [employees]);

  const contactList = useMemo(() => {
    return [
      {
        icon: (
          <FaFacebook
            className='text-black opacity-80 cursor-pointer hover:text-blue-500'
            size={20}
          />
        ),
        content: 'Facebook',
        href: 'https://www.facebook.com'
      },
      {
        icon: (
          <FaX className='text-black opacity-80 cursor-pointer hover:text-blue-500' size={20} />
        ),
        content: 'X',
        href: 'https://www.x.com'
      },
      {
        icon: <MailIcon className='h-5 w-5 cursor-pointer hover:text-blue-500' />,
        content: 'Email',
        href: 'mailto:' + user?.email
      }
    ];
  }, []);

  const organizationInfoList = useMemo(() => {
    return [
      {
        title: 'Tên',
        content: organization?.name
      },
      {
        title: 'Mã số',
        content: organization?.code
      },
      {
        title: 'Số điện thoại',
        content: organization?.organizationPhone
      },
      {
        title: 'Phòng ban',
        content: organization?.departmentType
      },
      {
        title: 'Địa chỉ',
        content: organization?.address
      }
    ];
  }, [organization]);

  useEffect(() => {
    getDocumentsApi.call({});
    getOrganizationEmployeesApi.call({});
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
            <Box className='flex flex-col gap-1'>
              <Typography variant='h4'>{user?.fullName}</Typography>
              <Typography variant='body1' fontWeight={'semibold'}>
                {user?.phone}
              </Typography>
              <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Typography variant='body2' color='primary' className='underline'>
                  {user?.email}
                </Typography>
                <Copy size={16} color='blue' cursor={'pointer'} onClick={handleCopy} />
              </Stack>
            </Box>
          </Stack>
          <Button
            startIcon={<PlusIcon size={20} />}
            variant='contained'
            color='warning'
            onClick={() => addEmployeeDialog.handleOpen(organization as OrganizationDetail)}
          >
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
              onClick={() => window.open(contact.href, '_blank')}
            >
              {contact.icon}
              <Typography color='black' fontSize={14} className='hover:text-blue-400'>
                {contact.content}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Divider className='border-blue-500 w-full my-3' />
        <Stack gap={3}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant='h5' color='primary'>
              Thông tin về tổ chức
            </Typography>
            <Button
              variant='contained'
              color='warning'
              startIcon={<EditIcon size={20} />}
              onClick={() => editOrganizationDrawer.handleOpen(organization as OrganizationDetail)}
            >
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
      <Stack width={'40%'} borderLeft={0.5} paddingLeft={2} gap={2}>
        <Stack>
          <Typography textAlign={'center'} color='error' variant='h6'>
            Biểu đồ số lượng tài liệu hệ thống
          </Typography>
          <Chart
            options={documentsByMonthChartOptions}
            series={[{ name: 'Số lượng tài liệu', data: documentsByMonth }]}
            type='line'
          />
        </Stack>
        <Divider />
        <Stack>
          <Typography textAlign={'center'} color='primary' variant='h6'>
            Biểu đồ số lượng nhân viên hệ thống
          </Typography>
          <Chart
            options={employeesByMonthChartOptions}
            series={[{ name: 'Số lượng nhân viên', data: employeesByMonth }]}
            type='bar'
          />
        </Stack>
      </Stack>
      <DashboardAddEmployeeDialog
        open={addEmployeeDialog.open}
        onClose={addEmployeeDialog.handleClose}
        organization={addEmployeeDialog.data as OrganizationDetail}
      />
      <DashboardAdminEditDrawer
        open={editOrganizationDrawer.open}
        onClose={editOrganizationDrawer.handleClose}
        organization={editOrganizationDrawer.data as OrganizationDetail}
        setOrganization={setOrganization}
      />
    </Box>
  );
}

export default DashboardAdminOrganizationSection;
