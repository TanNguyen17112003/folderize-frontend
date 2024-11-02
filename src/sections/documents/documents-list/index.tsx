import React from 'react';
import { Box, Stack, TextField, Button, InputAdornment, Typography } from '@mui/material';
import { SearchIcon } from 'lucide-react';
import { CustomTable } from 'src/components/custom-table';
import CustomTabs from 'src/components/CustomTabs';
import usePagination from 'src/hooks/use-pagination';
import DownloadIcon from '@mui/icons-material/Download';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import data from './data.json';
import { useRouter } from 'next/router';

function DocListIndex() {
  const [searchInput, setSearchInput] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState('all');
  const router = useRouter();
  const tabOptions = [
    { value: 'all', label: 'Tất cả' },
    // { value: 'organization', label: 'Tổ chức' },
    { value: 'favorites', label: 'Đánh dấu' }
  ];
  const pagination = usePagination({
    count: data.length,
    initialRowsPerPage: 10
  });
  const configAll = [
    { key: 'title', headerLabel: 'Tiêu đề' },
    { key: 'description', headerLabel: 'Mô tả' },
    { key: 'category', headerLabel: 'Loại' },
    { key: 'lastModified', headerLabel: 'Lần chỉnh sửa' },
    { key: 'views', headerLabel: 'Lượt xem' },
    { key: 'fileSize', headerLabel: 'Kích thước' },
    { key: 'format', headerLabel: 'Loại File' },
    { key: 'uploader', headerLabel: 'Người đăng' },
    { key: 'access', headerLabel: 'Quyền' },
    {
      key: 'bookmarked',
      headerLabel: 'Đánh dấu',
      renderCell: (row: any) =>
        row.bookmarked ? <CheckBoxIcon color='primary' className='h-5 w-5 fill-secondary' /> : null
    }
  ];
  const configBookmark = [
    { key: 'title', headerLabel: 'Tiêu đề' },
    { key: 'lastModified', headerLabel: 'Lần chỉnh sửa' },
    { key: 'format', headerLabel: 'Loại File' },
    { key: 'uploader', headerLabel: 'Người đăng' },
    { key: 'access', headerLabel: 'Quyền' }
  ];

  const handleDetail = (row: any) => {
    console.log('Chi tiết hàng:', row);
    router.push('/documents/Details_doc');
  };

  const actionList = (row: any) => (
    <>
      <Button className='hover:bg-secondary/15'>
        <DownloadIcon className='h-5 w-5 fill-secondary' />
      </Button>
      <Button className='hover:bg-secondary/15'>
        <BookmarkIcon className='h-5 w-5 fill-secondary' />
      </Button>
    </>
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
            rows={data}
            configs={configAll}
            onClickDetail={handleDetail}
            renderRowActions={actionList}
            pagination={pagination}
          />
        )}
        {/* {selectedTab === 'organization' && <Typography>Tổ chức</Typography>} */}
        {selectedTab === 'favorites' && (
          <CustomTable
            rows={data}
            configs={configBookmark}
            onClickDetail={handleDetail}
            renderRowActions={actionList}
            pagination={pagination}
          />
        )}
      </Box>
    </Box>
  );
}

export default DocListIndex;
