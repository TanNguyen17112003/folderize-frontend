import { Typography, Stack, Chip } from '@mui/material';
import { CustomTableConfig } from 'src/components/custom-table';
import { Edit, DocumentText, Trash, Bank } from 'iconsax-react';
import { formatDate, formatUnixTimestamp, formatVNDcurrency } from 'src/utils/format-time-currency';
import { FileWithId } from 'src/types/file-data';
import { FILE_TYPES } from 'src/utils/file-types';

const getUploadDOcumentConfig = ({
  onClickReport,
  onClickDelete,
  onClickEdit
}: {
  onClickReport?: (data: FileWithId) => void;
  onClickDelete?: (data: FileWithId) => void;
  onClickEdit?: (data: FileWithId) => void;
}): CustomTableConfig<FileWithId['id'], FileWithId>[] => {
  const configs: CustomTableConfig<FileWithId['id'], FileWithId>[] = [
    {
      key: 'id',
      headerLabel: 'Số thứ tự',
      type: 'string',
      renderCell: (data) => <Typography>{data.id}</Typography>
    },
    {
      key: 'name',
      headerLabel: 'Tên tài liệu',
      type: 'string',
      renderCell: (data) =>
        data.name ? <Typography>{data.name}</Typography> : <Typography>Không có tên</Typography>
    },
    {
      key: 'size',
      headerLabel: 'Kích thước',
      type: 'string',
      renderCell: (data) => {
        return <Typography>{data.size}</Typography>;
      }
    },
    {
      key: 'type',
      headerLabel: 'Loại tài liệu',
      type: 'string',
      renderCell: (data) => {
        return (
          <Stack direction='row' spacing={1}>
            <Chip
              label={data.type}
              sx={{
                backgroundColor: FILE_TYPES.find((type) => type.type === data.type.toUpperCase())
                  ?.color,
                color: 'white'
              }}
            />
          </Stack>
        );
      }
    },
    {
      key: 'lastModified',
      headerLabel: 'Ngày tải lên',
      type: 'string',
      renderCell: (data) => {
        return <Typography>{formatDate(data.date)}</Typography>;
      }
    },
    {
      key: 'action',
      headerLabel: 'Hành động',
      type: 'string',
      renderCell: (data) => {
        return (
          <Stack direction='row' spacing={1}>
            <Edit
              size={24}
              onClick={() => {
                if (onClickEdit) {
                  onClickEdit(data);
                }
              }}
              className='cursor-pointer text-primary'
            />
            <DocumentText
              size={24}
              onClick={() => {
                if (onClickReport) {
                  onClickReport(data);
                }
              }}
              className='cursor-pointer'
            />
            <Trash
              size={24}
              onClick={() => {
                if (onClickDelete) {
                  onClickDelete(data);
                }
              }}
              className='cursor-pointer text-red-500'
            />
          </Stack>
        );
      }
    }
  ];
  return configs;
};

export default getUploadDOcumentConfig;
