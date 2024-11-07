import type { Page as PageType } from 'src/types/page';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { paths } from 'src/paths';
import { useDialog } from 'src/hooks/use-dialog';
import InvitationDialog from 'src/sections/invitation/invitation-dialog';

const Page: PageType = () => {
  const router = useRouter();
  return (
    <Stack>
      <InvitationDialog
        open={true}
        message={router.query.message as string}
        organizationName={router.query.organizationName as string}
        onDeny={() => router.push(paths.auth.login)}
        onApprove={() => router.push(paths.auth.login)}
      />
    </Stack>
  );
};

Page.getLayout = (page) => <>{page}</>;

export default Page;
