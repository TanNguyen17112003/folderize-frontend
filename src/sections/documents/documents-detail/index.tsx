import { Box, Typography } from '@mui/material';
import React, { memo, useCallback } from 'react';
import { Button } from 'src/components/shadcn/ui/button';
import DisplayRowsConfig from './details-doc-table-config';
import { DocumentDetail } from 'src/types/document';
import CustomFileViewer from 'src/components/FileViewer';
import AdvancedViewer from 'src/components/AdvancedViewer';
import { DownloadIcon } from 'lucide-react';

const DetailsTable: React.FC<{ document: DocumentDetail }> = ({ document }) => {
  const fileType = document?.documentUrl.split('.').pop();

  const handleDownload = useCallback(() => {
    window.open(document.documentUrl, '_target');
  }, [document]);

  return (
    <Box className='flex gap-2 h-screen'>
      <Box className='w-[70%] h-full overflow-auto'>
        {fileType === 'pdf' || fileType === 'docx' || fileType === 'doc' ? (
          <CustomFileViewer documentUrl={document.documentUrl} fileType={fileType} />
        ) : (
          <AdvancedViewer documentUrl={document?.documentUrl} fileType={fileType as string} />
        )}
      </Box>
      <Box className='w-[30%] h-full overflow-auto flex flex-col px-6'>
        <DisplayRowsConfig rowData={document} />
        <Button
          variant='default'
          className='self-end flex items-center gap-1'
          onClick={handleDownload}
        >
          <DownloadIcon size={24} />
          Tải về
        </Button>
      </Box>
    </Box>
  );
};

export default DetailsTable;
