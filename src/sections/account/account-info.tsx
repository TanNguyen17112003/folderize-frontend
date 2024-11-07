import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useCallback, useMemo, useState } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import AccountInfoEditField from './account-info-edit-field';
import { formatDate, formatUnixTimestamp } from 'src/utils/format-time-currency';

function ProfileSection() {
  const { user } = useAuth();

  const userRole = useMemo(() => {
    return user?.role === 'ADMIN'
      ? 'Quản trị viên'
      : user?.role === 'USER'
        ? 'Người dùng'
        : 'Nhân viên';
  }, [user]);

  const handleSave = useCallback(
    async (field: 'fullName' | 'phone' | 'email' | 'created_at' | 'role', value: string) => {
      try {
        if (field) {
          await console.log('field', field, 'value', value);
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
            <Typography variant='h6'>Quản lý thông tin</Typography>
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
