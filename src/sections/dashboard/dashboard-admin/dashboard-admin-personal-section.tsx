import React from 'react';
import ProfileSection from 'src/sections/account/account-info';
import AccountPassword from 'src/sections/account/account-password';
import { Stack } from '@mui/material';

function DashboardAminPersonalSection() {
  return (
    <Stack gap={1}>
      <ProfileSection />
      <AccountPassword />
    </Stack>
  );
}

export default DashboardAminPersonalSection;
