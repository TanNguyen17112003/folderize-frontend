import React, { useCallback, useMemo } from 'react';
import { Box, Stack, TextField, Button, InputAdornment, Typography } from '@mui/material';
import { SearchIcon } from 'lucide-react';
import { CustomTable } from 'src/components/custom-table';
import CustomTabs from 'src/components/CustomTabs';
import usePagination from 'src/hooks/use-pagination';
import { useRouter } from 'next/router';
import getDocumentManagementConfig from 'src/sections/documents/documents-list/documents-table-config';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
import { Document } from 'src/types/document';
import { useDocumentsContext } from 'src/contexts/documents/documents-context';
function DocListIndex() {
  const [searchInput, setSearchInput] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState('all');
  const { showSnackbarSuccess } = useAppSnackbar();
  const { getDocumentsApi } = useDocumentsContext();
  const documents = useMemo(() => {
    return getDocumentsApi.data || [];
  }, [getDocumentsApi.data]);

  const pagination = usePagination({
    count: documents.length
  });
  const router = useRouter();
  const tabOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'favorites', label: 'Đánh dấu' }
  ];

  const DocumentManagementConfig = useMemo(() => {
    return getDocumentManagementConfig({
      onClickDownload: (data: Document) => showSnackbarSuccess(`Đang tải tài liệu: ${data.title}`),
      onClickBookmark: (data: Document) =>
        showSnackbarSuccess(`Đã đánh dấu tài liệu: ${data.title}`)
    });
  }, [getDocumentManagementConfig]);

  const handleGoDocument = useCallback(
    (documentId: string) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, documentId }
      });
    },
    [router]
  );

  return (
    <Box className='px-6 py-5'>
      <Stack direction={'row'} gap={2} width={'90%'}>
        <TextField
          variant='outlined'
          placeholder='Tìm kiếm theo từ khóa...'
          className='w-[80%]'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Button variant='contained' className='w-[10%]'>
          Tìm kiếm
        </Button>
      </Stack>
      <Box mt={3}>
        <CustomTabs options={tabOptions} value={selectedTab} onValueChange={setSelectedTab} />
      </Box>

      <Box mt={2}>
        {selectedTab === 'all' && (
          <CustomTable
            rows={documents}
            configs={DocumentManagementConfig}
            onClickRow={(data: Document) => handleGoDocument(data.id)}
            pagination={pagination}
          />
        )}
        {/* {selectedTab === 'organization' && <Typography>Tổ chức</Typography>} */}
        {selectedTab === 'favorites' && (
          <CustomTable
            rows={documents}
            configs={DocumentManagementConfig}
            onClickRow={(data: Document) => handleGoDocument(data.id)}
            pagination={pagination}
          />
        )}
      </Box>
    </Box>
  );
}

export default DocListIndex;
