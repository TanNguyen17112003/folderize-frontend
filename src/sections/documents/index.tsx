import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Stack } from '@mui/system';
import Link from 'next/link';
import ContentHeader from 'src/components/content-header';
import { paths } from 'src/paths';
import DocumentList from 'src/sections/documents/documents-list';
import { useAuth } from 'src/hooks/use-auth';
const DocumentListIndex = () => {
  const { user } = useAuth();
  return (
    <Stack
      sx={{
        maxHeight: '100vh',
        overflow: 'auto',
        bgcolor: 'white'
      }}
      className='min-h-screen'
    >
      <ContentHeader
        title='Danh sách tài liệu'
        description='Danh sách tài liệu của bạn'
        rightSection={
          user &&
          user.role !== 'USER' && (
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center'
              }}
            >
              <Button
                variant='contained'
                color='success'
                startIcon={<Add />}
                LinkComponent={Link}
                href={paths.documents['documents-upload-page']}
              >
                Tải lên tài liệu
              </Button>
            </Box>
          )
        }
      />
      <DocumentList />
    </Stack>
  );
};

export default DocumentListIndex;
