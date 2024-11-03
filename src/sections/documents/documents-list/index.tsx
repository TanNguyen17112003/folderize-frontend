import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useMemo, useEffect, useCallback, useState } from 'react';
import { CustomTable } from 'src/components/custom-table';
import CustomTabs from 'src/components/CustomTabs';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
import usePagination from 'src/hooks/use-pagination';
import { paths } from 'src/paths';
import getDocumentManagementConfig from 'src/sections/documents/documents-list/documents-table-config';
import { Document } from 'src/types/document';
import DocumentsApi from 'src/api/documents';
import ResponseCache from 'next/dist/server/response-cache';

function DocListIndex() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const { showSnackbarSuccess, showSnackbarError } = useAppSnackbar();
  const router = useRouter();

  const tabOptions = [
    { value: 'all', label: 'Tất cả' },
    // { value: 'organization', label: 'Tổ chức' },
    { value: 'favorites', label: 'Đánh dấu' }
  ];

  const DocumentManagementConfig = useMemo(() => {
    return getDocumentManagementConfig({
      onClickDownload: (data: Document) => showSnackbarSuccess(`Đang tải tài liệu: ${data.title}`),
      onClickBookmark: (data: Document) =>
        showSnackbarSuccess(`Đã đánh dấu tài liệu: ${data.title}`)
    });
  }, [getDocumentManagementConfig]);

  const handleDetail = useCallback(
    (row: any) => {
      router.push(paths.documents.details(row.id));
    },
    [router]
  );

  const fetchDocuments = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await DocumentsApi.getDocuments({});
      if (response.statusCode === 200) {
        setDocuments(response);
        setTotalCount(response.length);
      }
    } catch (err) {
      setError('Không thể tải danh sách tài liệu');
      showSnackbarError('Đã có lỗi xảy ra khi tải danh sách tài liệu');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const pagination = usePagination({
    count: totalCount,
    initialRowsPerPage: 10
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

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
            onClickDetail={handleDetail}
            pagination={pagination}
          />
        )}
        {/* {selectedTab === 'organization' && <Typography>Tổ chức</Typography>} */}
        {selectedTab === 'favorites' && (
          <CustomTable
            rows={documents}
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
