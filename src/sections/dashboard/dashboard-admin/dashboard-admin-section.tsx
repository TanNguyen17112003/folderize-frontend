import React, { useMemo } from 'react';
import CustomTabs from 'src/components/CustomTabs';
import DashboardAminPersonalSection from './dashboard-admin-personal-section';
import DashboardAdminOrganizationSection from './dashboard-admin-organization-section';

function DashboardAdminSection() {
  const tabOptions = useMemo(() => {
    return [
      {
        value: 'organization',
        label: 'Tổ chức',
        content: <DashboardAdminOrganizationSection />
      },
      {
        value: 'personal',
        label: 'Cá nhân',
        content: <DashboardAminPersonalSection />
      }
    ];
  }, []);
  return <CustomTabs options={tabOptions} />;
}

export default DashboardAdminSection;
