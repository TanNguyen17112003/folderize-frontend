import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { Bookmark, Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  FormControl,
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Globe, SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { CustomTable } from 'src/components/custom-table';
import CustomTabs from 'src/components/CustomTabs';
import { useDocumentsContext } from 'src/contexts/documents/documents-context';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
import usePagination from 'src/hooks/use-pagination';
import getDocumentManagementConfig from 'src/sections/documents/documents-list/documents-table-config';
import { Document } from 'src/types/document';
import { FILE_TYPES } from 'src/utils/file-types';
import { formateDateWithLongMonth } from 'src/utils/format-time-currency';
import { useMenu } from 'src/hooks/use-menu';

function DocListIndex() {
  const [searchInput, setSearchInput] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState('all');
  const [layout, setLayout] = React.useState('card'); // State for layout selection
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
    { value: 'all', label: 'Tất cả', content: 'All Documents' },
    { value: 'favorites', label: 'Đánh dấu', content: 'Favorite Documents' }
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

  const renderImage = (type: string | null) => {
    return FILE_TYPES.find((file) => file.type === type?.toUpperCase())?.image || '/ui/pdfIcon.png';
  };

  const handleEdit = (doc: Document) => {
    console.log('Edit:', doc);
  };

  const handleDelete = (doc: Document) => {
    console.log('Delete:', doc);
  };

  const handleBookmark = (doc: Document) => {
    console.log('Bookmark:', doc);
  };

  const { anchorEl, open, handleOpen, handleClose, data: selectedDoc } = useMenu<Document>();

  const handleMenuItemClick = (action: string) => {
    handleClose();
    if (action === 'edit') {
      handleEdit(selectedDoc!);
    } else if (action === 'delete') {
      handleDelete(selectedDoc!);
    } else if (action === 'bookmark') {
      handleBookmark(selectedDoc!);
    }
  };

  const handleLayoutChange = (event: SelectChangeEvent) => {
    setLayout(event.target.value as string);
  };

  return (
    <Box className='px-6 py-5'>
      <Stack direction={'row'} gap={2} width={'90%'} alignItems={'center'}>
        <TextField
          variant='outlined'
          placeholder='Tìm kiếm theo từ khóa...'
          className='w-[70%]'
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
        <FormControl variant='outlined' className='w-[20%]'>
          <Select value={layout} onChange={handleLayoutChange}>
            <MenuItem value='card'>Danh sách dạng lưới</MenuItem>
            <MenuItem value='table'>Danh sách dạng bảng</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Box mt={3}>
        <CustomTabs options={tabOptions} value={selectedTab} onValueChange={setSelectedTab} />
      </Box>

      <Box mt={2}>
        {selectedTab === 'all' && layout === 'card' && (
          <Grid container spacing={4}>
            {documents.map((doc) => (
              <Grid key={doc.id}>
                <Card
                  elevation={2}
                  sx={{
                    width: 200,
                    height: 338,
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderWidth: 1,
                    '&:hover': {
                      border: '1px solid #2970FF'
                    }
                  }}
                  onClick={() => handleGoDocument(doc.id)}
                >
                  <Box
                    height={'70%'}
                    overflow='hidden'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Image src={renderImage(doc.fileType)} alt='pdf' width={100} height={100} />
                  </Box>
                  <Box
                    p={2}
                    display={'flex'}
                    flexDirection={'column'}
                    borderTop={1}
                    borderColor={'#E0E0E0'}
                    gap={0.5}
                  >
                    <Typography variant='subtitle2' className='truncate'>
                      {doc.title}
                    </Typography>
                    <Box display={'flex'} alignItems={'center'} gap={0.5}>
                      <Globe size={16} opacity={0.8} />
                      <Typography variant='subtitle2' className='truncate opacity-70'>
                        {formateDateWithLongMonth(doc.createdAt ?? new Date())}
                      </Typography>
                      <Box
                        padding={0.5}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderRadius={99}
                        sx={{
                          '&:hover': {
                            backgroundColor: '#F0F0F0'
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpen(e, doc);
                        }}
                      >
                        <EllipsisVerticalIcon height={32} opacity={0.8} />
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {selectedTab === 'all' && layout === 'table' && (
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
      </Box>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuItemClick('edit')}>
          <ListItemIcon>
            <Edit color='primary' />
          </ListItemIcon>
          Chỉnh sửa
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('delete')}>
          <ListItemIcon>
            <Delete color='error' />
          </ListItemIcon>
          Xoá
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('bookmark')}>
          <ListItemIcon>
            <Bookmark />
          </ListItemIcon>
          Đánh dấu
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default DocListIndex;
