import React, { useMemo } from 'react';
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
import { FileWithId } from 'src/types/file-data';
import { FileFormProps, initialFileForm } from 'src/types/file-data';
import AutocompleteTextFieldMultiple from 'src/components/Autocomplete/autocomplete-textfield-multiple';

function DocumentsUploadEditDrawer({
  open,
  onClose,
  file
}: {
  open: boolean;
  onClose: () => void;
  file: FileWithId;
}) {
  const handleSubmitFile = async (values: FileFormProps) => {
    console.log('values', values);
  };
  const handleSubmitFileHelper = useFunction(handleSubmitFile, {
    successMessage: 'Cập nhật thông tin tài liệu thành công!'
  });

  const formik = useFormik<FileFormProps>({
    initialValues: {
      ...initialFileForm,
      title: file?.name
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await handleSubmitFileHelper.call(values);
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
          <TextField
            label='Tiêu đề'
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            fullWidth
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
          <AutocompleteTextFieldMultiple
            value={formik.values.keywords}
            options={[]}
            onChange={(value) => formik.setFieldValue('keywords', value)}
            TextFieldProps={{
              variant: 'outlined',
              placeholder: 'Nhập từ khóa'
            }}
            freeSolo={true}
          />
        </Stack>
      </form>
    </Drawer>
  );
}

export default DocumentsUploadEditDrawer;

function showSnackbarError(arg0: string) {
  throw new Error('Function not implemented.');
}
