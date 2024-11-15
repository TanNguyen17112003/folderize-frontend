import { Box, Stack, Typography, Button } from '@mui/material';
import React, { memo, useCallback, useMemo } from 'react';
import DisplayRowsConfig from './details-doc-table-config';
import { DocumentDetail } from 'src/types/document';
import CustomFileViewer from 'src/components/FileViewer';
import AdvancedViewer from 'src/components/AdvancedViewer';
import { DownloadIcon, UploadIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useDrawer } from 'src/hooks/use-drawer';
import DocumentsUploadVersionDrawer from './documents-upload-version-drawer';

const DetailsTable: React.FC<{ document: DocumentDetail }> = ({ document }) => {
  const router = useRouter();
  const uploadVersionDrawer = useDrawer<DocumentDetail>();
  const documentVersion = useMemo(() => {
    return document?.versions.find((version) => version.id === Number(router.query.versionId));
  }, [router.query.versionId]);

  const fileType = useMemo(() => {
    return documentVersion ? documentVersion.fileType : document?.versions[0].fileType;
  }, [documentVersion]);

  const handleDownload = useCallback(() => {
    window.open(document.versions[0].documentUrl, '_target');
  }, [document]);

  return (
    <Box className='flex gap-2 h-screen'>
      <Box className='w-[70%] h-full overflow-auto'>
        {fileType === 'pdf' || fileType === 'docx' || fileType === 'doc' ? (
          <CustomFileViewer
            documentUrl={documentVersion?.documentUrl || document?.versions[0].documentUrl}
            fileType={fileType}
          />
        ) : (
          <AdvancedViewer
            documentUrl={documentVersion?.documentUrl || document?.versions[0].documentUrl}
            fileType={fileType as string}
          />
        )}
      </Box>
      <Box className='w-[30%] h-full overflow-auto flex flex-col px-6'>
        <DisplayRowsConfig rowData={documentVersion || document?.versions[0]} />
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Button
            variant='contained'
            className='self-end flex items-center gap-1'
            onClick={() => uploadVersionDrawer.handleOpen(document)}
            color='primary'
          >
            <UploadIcon size={24} />
            Tải phiên bản mới
          </Button>
          <Button
            variant='contained'
            color='warning'
            className='self-end flex items-center gap-1'
            onClick={handleDownload}
          >
            <DownloadIcon size={24} />
            Tải về
          </Button>
        </Stack>
      </Box>
      <DocumentsUploadVersionDrawer
        file={document}
        open={uploadVersionDrawer.open}
        onClose={uploadVersionDrawer.handleClose}
        onSubmit={() => {}}
      />
    </Box>
  );
};

export default DetailsTable;
