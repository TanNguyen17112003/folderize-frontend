import { Avatar } from '@mui/material';
import React, { FC, memo } from 'react';
import type { Page as PageType } from 'src/types/page';
export interface Comment {
  id: number;
  user: string;
  avatar: string;
  time: string;
  content: string;
}

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  const isCurrentUser = comment.user === 'RealNameOfUser';

  return (
    <div className={`flex mb-4 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <Avatar src={comment.avatar} alt={comment.user} className='w-10 h-10 mr-3 ml-3' />

      {/* Comment Content Container */}
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
        {/* User Name and Time */}
        <div className={`flex items-center space-x-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
          <span className='font-semibold text-sm'>{isCurrentUser ? 'You' : comment.user}</span>
          <span className='text-xs text-gray-500'>{comment.time}</span>
        </div>

        {/* Comment Content */}
        <div
          className={`
            p-2 rounded-lg mt-1
            ${
              isCurrentUser
                ? 'bg-blue-500 text-white rounded-tr-none'
                : 'bg-gray-200 text-black rounded-tl-none'
            }
          `}
        >
          {comment.content}
        </div>
      </div>
    </div>
  );
};

(CommentItem as PageType).getLayout = (page) => page;
export default CommentItem;
