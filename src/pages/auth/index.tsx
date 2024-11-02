import { Stack } from '@mui/material';
import LoginForm from 'src/sections/auth';

const Page = () => {
  return (
    <Stack
      sx={{
        maxHeight: '100vh',
        overflow: 'auto',
        bgcolor: 'white'
      }}
      className='min-h-screen'
    >
      <LoginForm />
    </Stack>
  );
};

export default Page;
