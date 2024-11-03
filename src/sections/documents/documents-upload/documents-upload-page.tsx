import { Button, Chip, List, ListItem, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { DocumentUpload } from 'iconsax-react';
import { size } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CustomTable } from 'src/components/custom-table';
import FileDropzone from 'src/components/FileDropzone';
import useAppSnackbar from 'src/hooks/use-app-snackbar';
import { useDialog } from 'src/hooks/use-dialog';
import { useDrawer } from 'src/hooks/use-drawer';
import { bytesToSize } from 'src/utils/bytes-to-size';
import { downloadUrl } from 'src/utils/url-handler';
import getUploadDOcumentConfig from './documents-upload-config';
import PreviewPdf from '../previewPdf';
import WordPreviewDialog from '../previewWord';
import DocumentsUploadDeleteDialog from './documetns-upload-delete-dialog';
import DocumentsUploadEditDrawer from './documents-upload-edit-drawer';
import { FileFormProps, FileWithId } from 'src/types/file-data';
import { FILE_TYPES } from 'src/utils/file-types';
import useFunction from 'src/hooks/use-function';
import { DocumentsApi, UploadDocumentRequest } from 'src/api/documents';

const DocumentUploadPage = () => {
  const [files, setFiles] = useState<FileWithId[]>([]);
  const [originalFiles, setOriginalFiles] = useState<File[]>([]);
  const [uploadFile, setUploadFile] = useState<UploadDocumentRequest>();
  const [finishUpload, setFinishUpload] = useState(false);
  const [completeFillDrawer, setCompleteFillDrawer] = useState(false);
  const pdfDialog = useDialog<FileWithId>();
  const wordDialog = useDialog<FileWithId>();
  const deleteDocumentDialog = useDialog<FileWithId>();
  const editDocumentDrawer = useDrawer<FileWithId>();
  const { showSnackbarError } = useAppSnackbar();
  const handleDeleteFile = useCallback(
    async (data: FileWithId) => {
      const newFiles = await files.filter((file) => file.id !== data.id);
      setFiles(newFiles);
    },
    [files, setFiles]
  );

  const formatFileType = (name: string) => {
    const token = name.split('.');
    return token[token.length - 1].toUpperCase();
  };
  const documentUpLoadTabelConfig = useMemo(() => {
    return getUploadDOcumentConfig({
      onClickDelete: (data) => {
        deleteDocumentDialog.handleOpen(data);
      },
      onClickReport(data) {
        if (data.type === 'PDF') {
          pdfDialog.handleOpen(data);
        } else if (data.type === 'DOCX' || data.type === 'DOC') {
          wordDialog.handleOpen(data);
        }
      },
      onClickEdit: (data) => {
        editDocumentDrawer.handleOpen(data);
      }
    });
  }, [deleteDocumentDialog, editDocumentDrawer, pdfDialog, wordDialog]);
  useEffect(() => {
    if (files.length > 0) {
      setFinishUpload(true);
    } else {
      setFinishUpload(false);
    }
  }, [files, showSnackbarError]);
  const uploadDocument = useCallback(async () => {
    try {
      console.log(uploadFile);
      if (!uploadFile) {
        showSnackbarError('Vui lòng nhập thông tin tài liệu');
        return;
      }
      const result = await DocumentsApi.uploadDocument(uploadFile);
      console.log(result);
    } catch (error) {
      throw error;
    }
  }, [showSnackbarError, uploadFile]);
  const uploadDocumentHelper = useFunction(uploadDocument, {
    successMessage: 'Tải tài liệu thành công!'
  });
  return (
    <Stack spacing={2}>
      <Stack flex={1} className='p-10 gap-16'>
        <FileDropzone
          title='Nhấn tải lên file tài liệu'
          accept={{
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-powerpoint': ['.ppt'],
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
            'text/plain': ['.txt']
          }}
          subtitle='Hỗ trợ tải các loại file như:'
          fileCount={files.length}
          onUpload={(files) => {
            const newFiles = files.map((file, index) => {
              return {
                id: (index + 1).toString(),
                name: file.name,
                size: bytesToSize(file.size, 2),
                type: formatFileType(file.name),
                date: new Date(),
                path: URL.createObjectURL(file)
              };
            });
            setFiles(newFiles);
            setOriginalFiles(files);
          }}
          renderSubtitle={
            <List className='flex items-center gap-4 max-md:flex-col'>
              {FILE_TYPES.map((fileType) => (
                <ListItem key={fileType.type} disablePadding={true}>
                  <Chip
                    label={fileType.type}
                    sx={{ backgroundColor: fileType.color, color: 'white' }}
                  />
                </ListItem>
              ))}
            </List>
          }
        />
        {finishUpload && <CustomTable configs={documentUpLoadTabelConfig} rows={files} />}
        {files.length > 0 && (
          <>
            <PreviewPdf open={pdfDialog.open} onClose={pdfDialog.handleClose} file={files[0]} />
            <WordPreviewDialog
              open={wordDialog.open}
              onClose={wordDialog.handleClose}
              file={files[0]}
            />
          </>
        )}
        <div id='container'></div>
        <Button
          variant='contained'
          startIcon={<DocumentUpload />}
          color='primary'
          className='w-[200px] self-end'
          disabled={size(files) === 0 || !completeFillDrawer}
          onClick={() => {
            if (size(files) === 0) {
              showSnackbarError('Vui lòng tải lên file trước khi tải xuống');
            } else {
              uploadDocumentHelper.call([]);
            }
          }}
        >
          Tải file lên
        </Button>
      </Stack>
      <DocumentsUploadDeleteDialog
        open={deleteDocumentDialog.open}
        onClose={deleteDocumentDialog.handleClose}
        onConfirm={() => handleDeleteFile(deleteDocumentDialog.data as FileWithId)}
        data={deleteDocumentDialog.data as FileWithId}
      />
      <DocumentsUploadEditDrawer
        open={editDocumentDrawer.open}
        onClose={editDocumentDrawer.handleClose}
        file={editDocumentDrawer.data as FileWithId}
        onSubmit={(data) => {
          const uploadFile = {
            file: originalFiles[0],
            data: JSON.stringify({
              title: data.title,
              description: data.description,
              category: data.category,
              keywords: data.keywords.join(', ')
            })
          };
          setUploadFile(uploadFile);
          setCompleteFillDrawer(true);
        }}
      />
    </Stack>
  );
};

export default DocumentUploadPage;
