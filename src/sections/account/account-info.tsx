import { Typography, Grid, Card, CardContent } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useCallback, useMemo } from 'react';
import AccountInfoEditField from './account-info-edit-field';
import { useAuth } from 'src/hooks/use-auth';

function ProfileSection() {
  const { user, updateProfile } = useAuth();

  const userRole = useMemo(() => {
    return user?.role === 'ADMIN'
      ? 'Quản trị viên'
      : user?.role === 'USER'
        ? 'Người dùng'
        : 'Nhân viên';
  }, [user]);

  const handleSave = useCallback(
    async (field: 'fullName' | 'phone', value: string) => {
      try {
        if (field) {
          await updateProfile({ [field]: value });
        }
      } catch (error) {
        throw error;
      }
    },
    [user]
  );

  return (
    <Card className='bg-white border border-1'>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant='h6'>Thông tin cá nhân</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack
              spacing={3}
              sx={{
                flex: 1
              }}
            >
              <AccountInfoEditField
                label='Họ và tên'
                type='text'
                value={user?.fullName}
                onSave={async (value) => await handleSave('fullName', value)}
              />
              <AccountInfoEditField
                label='Số điện thoại'
                type='text'
                value={user?.phone}
                onSave={async (value) => await handleSave('phone', value)}
              />
              <AccountInfoEditField label='Emaili' type='text' value={user?.email} disabled />
              <AccountInfoEditField label='Chức vụ' value={userRole} disabled />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ProfileSection;
