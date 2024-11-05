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
import { useAuth } from 'src/hooks/use-auth';
import { useDocumentsContext } from 'src/contexts/documents/documents-context';
function DocListIndex() {
  const { user } = useAuth();
  const [searchInput, setSearchInput] = React.useState('');

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
    { value: 'all', label: 'Tất cả', role: 'ALL' },
    { value: 'favorites', label: 'Đánh dấu', role: ['USER'] },
    { value: 'not approved', label: 'Đang chờ phê duyệt', role: ['ADMIN', 'EMPLOYEE'] }
  ];

  const filteredTabOptions = useMemo(() => {
    const freeTabs = tabOptions.filter((tab) => tab.role === 'ALL');
    const userTabs = tabOptions.filter((tab) => tab.role.includes(user?.role as string));
    return [...freeTabs, ...userTabs];
  }, [tabOptions, user]);
  const [selectedTab, setSelectedTab] = React.useState(filteredTabOptions[0].value);

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
      <Stack direction={'row'} gap={2} width={'100%'}>
        <TextField
          variant='outlined'
          placeholder='Tìm kiếm theo từ khóa...'
          className='w-[90%]'
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
        <CustomTabs
          options={filteredTabOptions}
          value={selectedTab}
          onValueChange={setSelectedTab}
        />
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
        {selectedTab === 'favorites' && (
          <CustomTable
            rows={documents}
            configs={DocumentManagementConfig}
            onClickRow={(data: Document) => handleGoDocument(data.id)}
            pagination={pagination}
          />
        )}
        {selectedTab === 'not approved' && (
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
