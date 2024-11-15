import { Avatar, Box, Stack, Typography, Button } from '@mui/material';
import { Send as SendIcon } from 'lucide-react';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Textarea } from 'src/components/shadcn/ui/textarea';
import type { Page as PageType } from 'src/types/page';
import CommentItem from './documents-detail-comments-item';
import { useRouter } from 'next/router';
import { DocumentsApi } from 'src/api/documents';
import useFunction from 'src/hooks/use-function';
import { useAuth } from 'src/hooks/use-auth';
import { paths } from 'src/paths';
import { useFormik } from 'formik';
import { DocumentCommentRequest, DocumentComment } from 'src/types/document';

const Comments: PageType = memo(() => {
  const router = useRouter();
  const { user } = useAuth();

  const getDocumentCommentsApi = useFunction(DocumentsApi.getComments);

  const comments = useMemo(() => {
    return getDocumentCommentsApi.data || [];
  }, [getDocumentCommentsApi.data]);

  const handlePostComment = useCallback(
    async (values: DocumentCommentRequest) => {
      try {
        const response = await DocumentsApi.postComment(values, Number(router.query.documentId));
        if (response) {
          getDocumentCommentsApi.setData([...comments, response]);
        }
      } catch (error) {
        throw error;
      }
    },
    [DocumentsApi.postComment, router.query.documentId, getDocumentCommentsApi.setData, comments]
  );

  const handlePostCommentHelper = useFunction(handlePostComment, {
    successMessage: 'Gửi bình luận thành công!'
  });

  const formik = useFormik<DocumentCommentRequest>({
    initialValues: {
      comment: '',
      userId: user?.id as number
    },
    onSubmit: async (values, { resetForm }) => {
      await handlePostCommentHelper.call(values);
      resetForm();
    }
  });

  useEffect(() => {
    getDocumentCommentsApi.call(Number(router.query.documentId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.documentId]);

  return (
    <Box className='container mx-auto px-4 py-6 max-w-2xl'>
      {user && (
        <Box className='border rounded-lg mb-6 p-4 bg-white shadow-sm'>
          <Stack direction='row' alignItems='center' className='mb-4'>
            <Avatar alt={user?.fullName} className='w-8 h-8 mr-3'>
              {user?.fullName.slice(0, 1).toUpperCase()}
            </Avatar>
            <Typography variant='body2' className='text-sm text-gray-700'>
              Bình luận như{' '}
              <Typography component='span' variant='body2' className='font-semibold'>
                {user?.fullName === 'RealNameOfUser' ? 'You' : user?.fullName}
              </Typography>
            </Typography>
          </Stack>

          {/* Comment Input */}
          <form onSubmit={formik.handleSubmit}>
            <Textarea
              name='comment'
              value={formik.values.comment}
              onChange={formik.handleChange}
              placeholder='Viết bình luận của bạn...'
              className='w-full p-2 border rounded-lg'
            />

            <Stack direction='row' justifyContent='flex-end' className='mt-2'>
              <Button type='submit' disabled={!formik.values.comment.trim()} variant='contained'>
                <SendIcon className='mr-2' /> Gửi
              </Button>
            </Stack>
          </form>
        </Box>
      )}

      {!user && (
        <Box className='flex gap-2 items-center mb-3'>
          <Typography variant='h6' className='text-xl font-bold'>
            Đăng nhập để bình luận!
          </Typography>
          <Button variant={'contained'} color='primary' href={paths.auth.login}>
            Đăng nhập
          </Button>
        </Box>
      )}

      <Typography variant='h6' className='text-xl font-bold mb-4'>
        Bình luận
      </Typography>
      <Box className='space-y-4 h-[calc(100vh-<offset>px)] overflow-auto'>
        {comments.length === 0 && (
          <Typography
            variant='h5'
            textAlign={'center'}
            alignSelf={'center'}
            className='text-red-500'
          >
            Không có bình luận nào!
          </Typography>
        )}
        {comments.length > 0 &&
          comments.map((comment) => <CommentItem key={comment.id} {...comment} />)}
      </Box>
    </Box>
  );
});
Comments.getLayout = (page) => page;
export default Comments;
