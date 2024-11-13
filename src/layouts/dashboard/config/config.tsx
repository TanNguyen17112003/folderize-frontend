import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import { getDashboardAdminConfigs } from './dashboard-admin-configs';
import { getDashboardUserConfigs } from './dashboard-user-configs';
import { getDashboardEmployeeConfigs } from './dashboard-employee-configs';

export interface DashboardItem {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: DashboardItem[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: DashboardItem[];
  subheader?: string;
}

export const useSections = () => {
  const { user } = useAuth();

  return useMemo(() => {
    if (user?.role == 'ADMIN') {
      return getDashboardAdminConfigs();
    } else if (user?.role === 'USER') {
      return getDashboardUserConfigs();
    } else if (user?.role === 'EMPLOYEE') {
      return getDashboardEmployeeConfigs();
    } else {
      return getDashboardUserConfigs();
    }
  }, [user?.role]);
};
