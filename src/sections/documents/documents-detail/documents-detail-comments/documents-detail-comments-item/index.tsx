import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { IComment } from 'src/types/comments';
import type { Page as PageType } from 'src/types/page';

interface CommentItemProps {
  comment: IComment;
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  const isCurrentUser = comment.user === 'RealNameOfUser';

  return (
    <Box className={`flex mb-4 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <Avatar src={comment.avatar} alt={comment.user} className='w-10 h-10 mr-3 ml-3' />

      {/* Comment Content Container */}
      <Stack
        direction='column'
        className={`max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}
      >
        {/* User Name and Time */}
        <Stack
          direction='row'
          spacing={1}
          className={`${isCurrentUser ? 'flex-row-reverse' : ''} items-center`}
        >
          <Typography variant='body2' className='font-semibold text-sm'>
            {isCurrentUser ? 'You' : comment.user}
          </Typography>
          <Typography variant='caption' className='text-xs text-gray-500'>
            {comment.time}
          </Typography>
        </Stack>

        {/* Comment Content */}
        <Box
          className={`
        p-2 rounded-lg mt-1
        ${isCurrentUser ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-gray-200 text-black rounded-tl-none'}
      `}
        >
          <Typography variant='body2'>{comment.content}</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

(CommentItem as PageType).getLayout = (page) => page;
export default CommentItem;
