import { Typography, Stack, Chip, Button } from '@mui/material';
import { CustomTableConfig } from 'src/components/custom-table';
import { Bookmark, DocumentDownload } from 'iconsax-react';
import { UserDetail } from 'src/types/user';
import { formatDate, formatUnixTimestamp } from 'src/utils/format-time-currency';
import { Trash } from 'iconsax-react';
const getUserManangementTableConfig = ({
  onClickRemove
}: {
  onClickRemove: (data: UserDetail) => void;
}): CustomTableConfig<UserDetail['id'], UserDetail>[] => [
  {
    key: 'index',
    headerLabel: 'STT',
    type: 'string',
    renderCell: (data) => <Typography>{data.index}</Typography>
  },
  {
    key: 'fullName',
    headerLabel: 'Họ và tên',
    type: 'string',
    renderCell: (data) => <Typography>{data.fullName}</Typography>
  },
  {
    key: 'createdAt',
    headerLabel: 'Thời gian tham gia',
    type: 'string',
    renderCell: (data) => <Typography>{formatDate(formatUnixTimestamp(data.createdAt))}</Typography>
  },
  {
    key: 'email',
    headerLabel: 'Email',
    type: 'string',
    renderCell: (data) => <Typography>{data.email}</Typography>
  },
  {
    key: 'phone',
    headerLabel: 'Số điện thoại',
    type: 'string',
    renderCell: (data) => <Typography>{data.phone}</Typography>
  },
  {
    key: 'action',
    headerLabel: 'Hành động',
    type: 'string',
    renderCell: (data) => (
      <Stack direction='row' spacing={1}>
        <Trash
          variant='Bold'
          color='red'
          className='h-5 w-5 cursor-pointer'
          onClick={() => onClickRemove(data)}
        />
      </Stack>
    )
  }
];

export default getUserManangementTableConfig;
