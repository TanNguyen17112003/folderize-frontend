import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import type { Page as PageType } from 'src/types/page';
import { DocumentComment } from 'src/types/document';
import { useAuth } from 'src/hooks/use-auth';
import { formatDate, formatUnixTimestamp } from 'src/utils/format-time-currency';

const CommentItem: FC<DocumentComment> = (props) => {
  const { user } = useAuth();
  const isCurrentUser = props.userFullName === user?.fullName;

  return (
    <Box className={`flex mb-4 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar alt={props?.userFullName} className='w-10 h-10 mr-3 ml-3'>
        {props?.userFullName.slice(0, 1).toUpperCase()}
      </Avatar>

      <Stack
        direction='column'
        className={`max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}
      >
        <Stack
          direction='row'
          spacing={1}
          className={`${isCurrentUser ? 'flex-row-reverse' : ''} items-center`}
        >
          <Typography variant='body2' className='font-semibold text-sm'>
            {isCurrentUser ? 'You' : props.userFullName}
          </Typography>
          <Typography variant='caption' className='text-xs text-gray-500'>
            {formatDate(new Date(props.createdAt))}
          </Typography>
        </Stack>

        <Box
          className={`
        p-2 rounded-lg mt-1
        ${isCurrentUser ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-gray-200 text-black rounded-tl-none'}
      `}
        >
          <Typography variant='body2'>{props.comment}</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

(CommentItem as PageType).getLayout = (page) => page;
export default CommentItem;
