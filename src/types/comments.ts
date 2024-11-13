export interface IComment {
  id: string;
  user: string;
  avatar: string;
  time: string;
  content: string;
}
export const CommentsList: IComment[] = [
  {
    id: '1',
    user: 'RealNameOfUser',
    avatar: 'https://ibb.co/RBWmSVF',
    time: '2 hours ago',
    content: 'This is an awesome feature! I really love how intuitive it is.'
  },
  {
    id: '2',
    user: 'John',
    avatar: 'https://ibb.co/RBWmSVF',
    time: '1 day ago',
    content: 'Great work on implementing this comments section.'
  },
  {
    id: '3',
    user: 'Sarah',
    avatar: 'https://ibb.co/RBWmSVF',
    time: '3 days ago',
    content: 'The design looks clean and modern. Nice job!'
  }
];
