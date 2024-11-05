import { Box, Chip, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { DocumentDetail } from 'src/types/document';

type DisplayRowsConfigProps = {
  rowData: DocumentDetail;
};

const DisplayRowsConfig: FC<DisplayRowsConfigProps> = ({ rowData }) => {
  const displayrowData = useMemo(() => {
    return [
      { label: 'Danh mục', value: rowData?.category },
      { label: 'Từ khóa', value: rowData?.keywords },
      { label: 'Kiểu', value: rowData?.fileType },
      { label: 'Kích cỡ', value: rowData?.fileSize }
    ];
  }, [rowData]);

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
