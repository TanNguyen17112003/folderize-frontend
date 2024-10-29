import { FC, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from 'src/hooks/use-auth'; // Import your auth hook
import { usePathname } from 'src/hooks/use-pathname';
import { Section } from '../config/config';
import SimpleBar from 'simplebar-react';
import { SideNavSection } from './side-nav-section';
import { NavColor } from 'src/types/settings';
import { SIDE_NAV_WIDTH } from 'src/config';
import { Button } from 'src/components/shadcn/ui/button';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import { Box, Typography } from '@mui/material';

interface SideNavProps {
  color?: NavColor;
  sections?: Section[];
}

export const SideNav: FC<SideNavProps> = (props) => {
  const { user } = useAuth();
  const router = useRouter();
  const { sections = [] } = props;
  const pathname = usePathname();

  const handleLogin = useCallback(() => {
    router.push(paths.auth.login);
  }, [router]);

  return (
    <Box>
      <Typography>Chovy</Typography>
    </Box>
  );
};
