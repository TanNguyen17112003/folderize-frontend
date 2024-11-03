import { Avatar, Box, Stack, Typography } from '@mui/material';
import { Send as SendIcon } from 'lucide-react';
import React, { memo, useState } from 'react';
import { Button } from 'src/components/shadcn/ui/button';
import { Textarea } from 'src/components/shadcn/ui/textarea';
import { CommentsList } from 'src/types/comments';
import type { Page as PageType } from 'src/types/page';
import CommentItem from './commentItem';

const Comments: PageType = memo(() => {
  const [commentInput, setCommentInput] = useState<string>('');

  const currentUser = {
    name: 'RealNameOfUser',
    avatar: './avt.jpg'
  };

  const handleSubmitComment = (value: string) => {
    //send comment to server
    console.log(value);
  };

  return (
    <Box className='container mx-auto px-4 py-6 max-w-2xl'>
      <Box className='border rounded-lg mb-6 p-4 bg-white shadow-sm'>
        <Stack direction='row' alignItems='center' className='mb-4'>
          <Avatar src={currentUser.avatar} alt={currentUser.name} className='w-8 h-8 mr-3' />
          <Typography variant='body2' className='text-sm text-gray-700'>
            Commenting as{' '}
            <Typography component='span' variant='body2' className='font-semibold'>
              {currentUser.name === 'RealNameOfUser' ? 'You' : currentUser.name}
            </Typography>
          </Typography>
        </Stack>

        {/* Comment Input */}
        <Textarea
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder='Write a comment...'
          defaultValue=''
          className='w-full p-2 border rounded-lg'
        />

        {/* Submit Button */}
        <Stack direction='row' justifyContent='flex-end' className='mt-2'>
          <Button onClick={() => handleSubmitComment(commentInput)} disabled={!commentInput.trim()}>
            <SendIcon className='mr-2' /> Send
          </Button>
        </Stack>
      </Box>

      {/* Comments List */}
      <Typography variant='h6' className='text-xl font-bold mb-4'>
        Comments
      </Typography>
      <Box className='space-y-4'>
        {CommentsList.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </Box>
    </Box>
  );
});
Comments.getLayout = (page) => page;
export default Comments;
