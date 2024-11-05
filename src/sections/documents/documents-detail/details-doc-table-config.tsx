import { Box, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { DocumentDetail } from 'src/types/document';
import Excel from 'public/ui/excel.png';
import Pdf from 'public/ui/pdf.png';
import Word from 'public/ui/word.png';
import Ppt from 'public/ui/powerpoint.png';
import Image from 'next/image';
import { formatDate } from 'src/utils/format-time-currency';

type DisplayRowsConfigProps = {
  rowData: DocumentDetail;
};

const DisplayRowsConfig: FC<DisplayRowsConfigProps> = ({ rowData }) => {
  const rowDataType = useMemo(() => {
    const type = rowData?.documentUrl.split('.').pop();
    switch (type) {
      case 'xlsx':
      case 'xls':
        return { type, image: Excel };
      case 'pdf':
        return { type, image: Pdf };
      case 'docx':
      case 'doc':
        return { type, image: Word };
      case 'pptx':
      case 'ppt':
        return { type, image: Ppt };
      default:
        return { type, image: null };
    }
  }, [rowData]);

  const displayrowData = useMemo(() => {
    return [
      { label: 'Tiêu đề', value: rowData?.title },
      { label: 'Mô tả', value: rowData?.description },
      { label: 'Danh mục', value: rowData?.category },
      { label: 'Từ khóa', value: rowData?.keywords },
      {
        label: 'Kiểu',
        value: rowDataType.image ? (
          <Image src={rowDataType.image} alt={rowDataType.type} width={24} height={24} />
        ) : (
          'N/A'
        )
      },
      { label: 'Kích cỡ', value: rowData?.fileSize },
      {
        label: 'Ngày tạo',
        value: rowData?.createdAt ? formatDate(new Date(rowData.createdAt)) : 'N/A'
      },
      {
        label: 'Ngày cập nhật',
        value: rowData?.updatedAt ? formatDate(new Date(rowData.updatedAt)) : 'N/A'
      }
    ];
  }, [rowData, rowDataType]);

  return (
    <Box className='w-full max-w-3xl mx-auto'>
      {displayrowData.map((item, index) => (
        <Stack key={index} direction='row' className='flex py-4 hover:bg-gray-50'>
          <Typography variant='body2' className='w-1/3 font-medium text-gray-500'>
            {item.label}
          </Typography>
          <Typography variant='body2' className='w-2/3 text-gray-900'>
            {item.value}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default DisplayRowsConfig;
