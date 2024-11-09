import { Typography, Stack, Chip, Button } from '@mui/material';
import { CustomTableConfig } from 'src/components/custom-table';
import DownloadIcon from '@mui/icons-material/Download';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Document } from 'src/types/document';
import { Bookmark, DocumentDownload } from 'iconsax-react';
import { bytesToSize } from 'src/utils/bytes-to-size';

const getDocumentManagementConfig = ({
  onClickDownload,
  onClickBookmark
}: {
  onClickDownload: (data: Document) => void;
  onClickBookmark: (data: Document) => void;
}): CustomTableConfig<Document['id'], Document>[] => [
  {
    key: 'title',
    headerLabel: 'Tài liệu',
    type: 'string',
    renderCell: (data) => <Typography>{data.name}</Typography>
  },
  {
    key: 'description',
    headerLabel: 'Mô tả',
    type: 'string',
    renderCell: (data) => <Typography>{data.versions[0].description}</Typography>
  },

  {
    key: 'size',
    headerLabel: 'Kích thước',
    type: 'string',
    renderCell: (data) => <Typography>{bytesToSize(data.versions[0].fileSize)}</Typography>
  },
  {
    key: 'action',
    headerLabel: 'Hành động',
    type: 'string',
    renderCell: (data) => (
      <Stack direction='row' spacing={1}>
        <DownloadIcon
          className='h-5 w-5 fill-secondary text-green-500'
          onClick={() => onClickDownload(data)}
        />
        <BookmarkIcon
          className='h-5 w-5 text-blue-500 fill-secondary'
          onClick={() => onClickBookmark(data)}
        />
      </Stack>
    )
  }
];

export default getDocumentManagementConfig;
