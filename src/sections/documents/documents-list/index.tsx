import React, { useMemo } from 'react';
import { Box, Stack, TextField, Button, InputAdornment, Typography } from '@mui/material';
import { SearchIcon } from 'lucide-react';
import { CustomTable } from 'src/components/custom-table';
import CustomTabs from 'src/components/CustomTabs';
import usePagination from 'src/hooks/use-pagination';
import { useRouter } from 'next/router';
import { docData } from 'src/types/document';
import getDocumentManagementConfig from 'src/sections/documents/documents-list/documents-table-config';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
import { Document } from 'src/types/document';
function DocListIndex() {
  const [searchInput, setSearchInput] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState('all');
  const { showSnackbarSuccess } = useAppSnackbar();
  const router = useRouter();
  const tabOptions = [
    { value: 'all', label: 'Tất cả' },
    // { value: 'organization', label: 'Tổ chức' },
    { value: 'favorites', label: 'Đánh dấu' }
  ];
  const pagination = usePagination({
    count: docData.length,
    initialRowsPerPage: 10
  });
  const DocumentManagementConfig = useMemo(() => {
    return getDocumentManagementConfig({
      onClickDownload: (data: Document) => showSnackbarSuccess(`Đang tải tài liệu: ${data.title}`),
      onClickBookmark: (data: Document) =>
        showSnackbarSuccess(`Đã đánh dấu tài liệu: ${data.title}`)
    });
  }, [getDocumentManagementConfig]);

  const handleDetail = (row: any) => {
    console.log('Chi tiết hàng:', row);
    router.push('/documents/Details_doc');
  };

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
            rows={docData}
            configs={DocumentManagementConfig}
            onClickDetail={handleDetail}
            pagination={pagination}
          />
        )}
        {/* {selectedTab === 'organization' && <Typography>Tổ chức</Typography>} */}
        {selectedTab === 'favorites' && (
          <CustomTable
            rows={docData}
            configs={DocumentManagementConfig}
            onClickDetail={handleDetail}
            pagination={pagination}
          />
        )}
      </Box>
    </Box>
  );
}

export default DocListIndex;
