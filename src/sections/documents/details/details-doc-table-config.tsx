import { Box, Chip, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { DocumentDetail1 } from 'src/types/document';

type DisplayRowsConfigProps = {
  rowData: DocumentDetail1;
};

const DisplayRowsConfig: FC<DisplayRowsConfigProps> = ({ rowData }) => {
  const displayrowData = useMemo(() => {
    return [
      { label: 'Author', value: rowData.author },
      { label: 'Label', value: <Chip label={rowData.label} color='success' /> },
      { label: 'Category', value: rowData.category },
      { label: 'Keywords', value: rowData.keyword },
      { label: 'Type', value: rowData.type },
      { label: 'File Size', value: rowData.fileSize }
    ];
  }, [rowData]);

  return (
    <Box className='w-full max-w-3xl mx-auto'>
      {displayrowData.map((item, index) => (
        <Stack key={index} direction='row' className='flex px-6 py-4 hover:bg-gray-50'>
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
