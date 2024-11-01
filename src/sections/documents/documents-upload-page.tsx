import { Button, Chip, List, ListItem, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { DocumentUpload } from 'iconsax-react';
import { size } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { CustomTable } from 'src/components/custom-table';
import FileDropzone from 'src/components/FileDropzone';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
import { bytesToSize } from 'src/utils/bytes-to-size';
import { downloadUrl } from 'src/utils/url-handler';
import getUploadDOcumentConfig from './documents-upload-config';
import PreviewPdf from './previewPdf';
import { useDialog } from 'src/hooks/use-dialog';

export interface FileWithId {
  id: string;
  name: string;
  size: string;
  type: string;
  date: Date;
  path: string;
}

export const FILE_TYPES = [
  { type: 'PDF', color: 'rgb(255,9,9)' },
  { type: 'DOC', color: 'rgb(0,123,255)' },
  { type: 'DOCX', color: 'rgb(23,162,184)' },
  { type: 'XLS', color: 'rgb(40,167,69)' },
  { type: 'XLSX', color: 'rgb(40,153,57)' },
  { type: 'PPT', color: 'rgb(255,193,7)' },
  { type: 'PPTX', color: 'rgb(255,163,7)' },
  { type: 'TXT', color: 'rgb(108,117,125)' }
];
const DocumentUploadPage = () => {
  const [files, setFiles] = useState<FileWithId[]>([]);
  const [finishUpload, setFinishUpload] = useState(false);
  const pdfDialog = useDialog<FileWithId>();
  const { showSnackbarError } = useAppSnackbar();

  const formatFileType = (type: string) => {
    return type.split('/')[1];
  };
  const documentUpLoadTabelConfig = useMemo(() => {
    return getUploadDOcumentConfig({
      onClickDelete: (data) => {
        const newFiles = files.filter((file) => file.id !== data.id);
        setFiles(newFiles);
      },
      onClickReport(data) {
        pdfDialog.handleOpen(data);
      }
    });
  }, [files, pdfDialog]);
  useEffect(() => {
    if (files.length > 0) {
      setFinishUpload(true);
    } else {
      setFinishUpload(false);
    }
  }, [files]);
  return (
    <Stack spacing={2}>
      <Stack flex={1} className='p-10 gap-16'>
        <FileDropzone
          title='Nhấn tải lên file tài liệu'
          accept={{ '*/*': [] }}
          subtitle='Hỗ trợ tải các loại file như:'
          fileCount={files.length}
          onUpload={(files) => {
            const newFiles = files.map((file, index) => {
              return {
                id: (index + 1).toString(),
                name: file.name,
                size: bytesToSize(file.size, 2),
                type: formatFileType(file.type),
                date: new Date(),
                path: URL.createObjectURL(file)
              };
            });
            setFiles(newFiles);
          }}
          renderSubtitle={
            <Box className='flex items-center'>
              <List className='flex items-center gap-4'>
                {FILE_TYPES.map((fileType) => (
                  <ListItem key={fileType.type} className='!p-0'>
                    <Chip
                      label={fileType.type}
                      sx={{ backgroundColor: fileType.color, color: 'white' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          }
        />
        {finishUpload && <CustomTable configs={documentUpLoadTabelConfig} rows={files} />}
        {files.length > 0 && (
          <PreviewPdf open={pdfDialog.open} onClose={pdfDialog.handleClose} file={files[0]} />
        )}

        <Button
          variant='contained'
          startIcon={<DocumentUpload />}
          color='primary'
          className='w-[200px] self-end'
          onClick={() => {
            if (size(files) === 0) {
              showSnackbarError('Vui lòng tải lên file trước khi tải xuống');
            } else {
              downloadUrl('file.txt');
            }
          }}
        >
          Tải file lên
        </Button>
      </Stack>
    </Stack>
  );
};

export default DocumentUploadPage;
