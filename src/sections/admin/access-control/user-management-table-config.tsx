import { Typography, Stack, Chip } from '@mui/material';
import { CustomTableConfig } from 'src/components/custom-table';
import { TickCircle, Trash } from 'iconsax-react';
import { UserAccessDetail } from 'src/types/user-access';
import { formatDate, formatUnixTimestamp } from 'src/utils/format-time-currency';

const getUserManagementConfig = ({
  onClickDelete,
  onClickApprove
}: {
  onClickDelete: (data: UserAccessDetail) => void;
  onClickApprove: (data: UserAccessDetail) => void;
}): CustomTableConfig<UserAccessDetail['id'], UserAccessDetail>[] => [
  {
    key: 'documentName',
    headerLabel: 'Tài liệu',
    type: 'string',
    renderCell: (data) => <Typography>{data.documentName}</Typography>
  },
  {
    key: 'userName',
    headerLabel: 'Người yêu cầu',
    type: 'string',
    renderCell: (data) => <Typography>{data.userName}</Typography>
  },
  {
    key: 'createdAt',
    headerLabel: 'Ngày tạo',
    type: 'string',
    renderCell: (data) => <Typography>{formatDate(formatUnixTimestamp(data.createdAt))}</Typography>
  },
  {
    key: 'action',
    headerLabel: 'Hành động',
    type: 'string',
    renderCell: (data) => (
      <Stack direction='row' spacing={1}>
        <TickCircle
          className='cursor-pointer'
          variant='Bold'
          color='green'
          size={32}
          onClick={() => onClickApprove(data)}
        />
        <Trash
          className='cursor-pointer'
          variant='Bold'
          color='red'
          size={32}
          onClick={() => onClickDelete(data)}
        />
      </Stack>
    )
  }
];

export default getUserManagementConfig;
