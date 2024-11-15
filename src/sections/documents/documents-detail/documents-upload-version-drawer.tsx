import React, { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import useFunction from 'src/hooks/use-function';
import { FileVersionFormProps, initialFileVersionForm } from 'src/types/file-data';
import { DocumentsFormTextField } from '../documents-upload/documents-text-field';
import { DocumentDetail } from 'src/types/document';
import { FileDropzone } from 'src/components/file-dropzone-v2';
import { File } from 'src/components/file-dropzone-v2';
import { DocumentsApi } from 'src/api/documents';

function DocumentsUploadVersionDrawer({
  open,
  onClose,
  file,
  onSubmit
}: {
  open: boolean;
  onClose: () => void;
  file: DocumentDetail;
  onSubmit: (data: FileVersionFormProps) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  const handleRemove = useCallback(async (file: File): Promise<void> => {
    await setFiles((prevFiles) => {
      return prevFiles.filter((_file) => _file.path !== file.path);
    });
  }, []);

  const handleRemoveAll = useCallback(async (): Promise<void> => {
    await setFiles([]);
  }, []);

  const handleDrop = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]]);
    }
  }, []);

  const handleDropHelper = useFunction(handleDrop);

  const handleUploadVersion = useCallback(
    async (values: FileVersionFormProps) => {
      try {
        await DocumentsApi.uploadDocumentVersion({
          ...values,
          file: files[0] as File,
          changeNote: values.changeNote || '',
          documentId: file.id
        });
      } catch (error) {
        throw error;
      }
    },
    [file, files]
  );

  const handleUploadVersionHelper = useFunction(handleUploadVersion, {
    successMessage: 'Tải phiên bản mới của tài liệu thành công'
  });

  const formik = useFormik<FileVersionFormProps>({
    initialValues: {
      ...initialFileVersionForm,
      title: file?.name
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await handleUploadVersionHelper.call(values);
        onClose();
      } catch {
        showSnackbarError('Có lỗi xảy ra');
      }
    }
  });

  const categoryOptions = useMemo(() => {
    return [
      {
        value: '1',
        label: 'Category 1'
      },
      {
        value: '2',
        label: 'Category 2'
      }
    ];
  }, []);

  return (
    <Drawer
      anchor='right'
      open={open}
      PaperProps={{
        sx: {
          width: 600
        }
      }}
      onClose={onClose}
    >
      <form onSubmit={formik.handleSubmit}>
        <Paper elevation={5} sx={{ p: 3, borderRadius: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <Box>
              <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  <ArrowBack
                    fontSize='small'
                    sx={{
                      verticalAlign: 'middle'
                    }}
                  />{' '}
                  Quay lại
                </Typography>
              </Box>
              <Typography variant='h6'>Điều chỉnh thông tin tài liệu {file?.name}</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center'
              }}
            >
              <Button color='inherit' variant='contained' onClick={onClose}>
                Hủy bỏ
              </Button>
              <Button variant='contained' color='primary' type='submit'>
                Cập nhật
              </Button>
            </Box>
          </Box>
        </Paper>
        <Stack spacing={3} padding={3}>
          <FileDropzone
            title='Tải lên phiên bản mới của tài liệu'
            accept={{
              'application/pdf': ['.pdf'],
              'application/msword': ['.doc'],
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
              'application/vnd.ms-excel': ['.xls'],
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
              'application/vnd.ms-powerpoint': ['.ppt'],
              'application/vnd.openxmlformats-officedocument.presentationml.presentation': [
                '.pptx'
              ],
              'text/plain': ['.txt']
            }}
            caption='Hỗ trợ tải các loại file như: pdf, doc, docx, xls, xlsx, ppt, pptx, txt'
            type='single'
            onUpload={() => {}}
            files={files}
            onDrop={handleDropHelper.call}
            onRemove={handleRemove}
            onRemoveAll={handleRemoveAll}
          />
          <TextField
            label='Tiêu đề'
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            fullWidth
          />
          <TextField
            label='Phiên bản'
            name='version'
            value={formik.values.version}
            onChange={formik.handleChange}
            fullWidth
            placeholder='Vui lòng nhập theo định dạng <số>.<số>'
          />
          <TextField
            label='Mô tả'
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label='Sự thay đổi'
            name='changeNote'
            value={formik.values.changeNote as string}
            onChange={formik.handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Danh mục</InputLabel>
            <Select
              label='Danh mục'
              name='category'
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DocumentsFormTextField
            type='autoComplete'
            title={'Từ khóa'}
            lg={6}
            xs={12}
            options={[]}
            onChange={(event) => formik.setFieldValue('keywords', event.target.value)}
            value={formik.values.keywords as string}
            name={'keywords'}
            placeholder='Nhập danh sách từ khóa'
          />
        </Stack>
      </form>
    </Drawer>
  );
}

export default DocumentsUploadVersionDrawer;

function showSnackbarError(arg0: string) {
  throw new Error('Function not implemented.');
}
