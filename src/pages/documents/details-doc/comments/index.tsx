import { Avatar } from '@mui/material';
import { Send as SendIcon } from 'lucide-react';
import React, { memo, useState } from 'react';
import { Button } from 'src/components/shadcn/ui/button';
import { Textarea } from 'src/components/shadcn/ui/textarea';
import type { Page as PageType } from 'src/types/page';
import CommentItem, { Comment } from './commentItem';

const Comments: PageType = memo(() => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: 'RealNameOfUser',
      avatar: 'https://ibb.co/RBWmSVF',
      time: '2 hours ago',
      content: 'This is an awesome feature! I really love how intuitive it is.'
    },
    {
      id: 2,
      user: 'John',
      avatar: 'https://ibb.co/RBWmSVF',
      time: '1 day ago',
      content: 'Great work on implementing this comments section.'
    },
    {
      id: 3,
      user: 'Sarah',
      avatar: 'https://ibb.co/RBWmSVF',
      time: '3 days ago',
      content: 'The design looks clean and modern. Nice job!'
    }
  ]);

  const [value, setValue] = useState<string>('');

  const currentUser = {
    name: 'RealNameOfUser',
    avatar: './avt.jpg'
  };

  const handleSubmitComment = (value: string) => {
    console.log(value);
  };

  return (
    <div className='container mx-auto px-4 py-6 max-w-2xl'>
      {/* Comment Input Section */}
      <div className='border rounded-lg mb-6 p-4 bg-white shadow-sm'>
        {/* Commenting as Section */}
        <div className='flex items-center mb-4'>
          <Avatar src={currentUser.avatar} alt={currentUser.name} className='w-8 h-8 mr-3' />
          <span className='text-sm text-gray-700'>
            Commenting as{' '}
            <span className='font-semibold'>
              {currentUser.name === 'RealNameOfUser' ? 'You' : currentUser.name}
            </span>
          </span>
        </div>

        {/* Comment Input */}
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Write a comment...'
          defaultValue=''
        ></Textarea>

        {/* Submit Button */}
        <div className='flex justify-end mt-2'>
          <Button onClick={() => handleSubmitComment(value)} disabled={!value.trim()}>
            <SendIcon className='mr-2' size={20} />
            Send
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <h2 className='text-xl font-bold mb-4'>Comments</h2>
      <div className='space-y-4'>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
});
Comments.getLayout = (page) => page;
export default Comments;
