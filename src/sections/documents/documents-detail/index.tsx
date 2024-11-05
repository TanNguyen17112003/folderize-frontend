import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
import React, { memo } from 'react';
import { Button } from 'src/components/shadcn/ui/button';
import DisplayRowsConfig from './details-doc-table-config';
import { DocumentDetail } from 'src/types/document';
import CustomFileViewer from 'src/components/FileViewer';
import AdvancedViewer from 'src/components/AdvancedViewer';

const DetailsTable: React.FC<{ document: DocumentDetail }> = ({ document }) => {
  const fileType = document.documentUrl.split('.').pop();
  return (
    <Box className='flex gap-2 h-screen'>
      <Box className='w-[70%] h-full overflow-auto'>
        {fileType === 'pdf' || fileType === 'docx' || fileType === 'doc' ? (
          <CustomFileViewer documentUrl={document.documentUrl} fileType={fileType} />
        ) : (
          <AdvancedViewer documentUrl={document.documentUrl} fileType={fileType as string} />
        )}
      </Box>
      <Box className='w-[30%] h-full overflow-auto flex flex-col px-6'>
        <DisplayRowsConfig rowData={document} />
        <Button variant='default' className='self-end'>
          <EditIcon />
          Chỉnh sửa
        </Button>
      </Box>
    </Box>
  );
};

export default DetailsTable;
