import React from 'react';
import { Button } from '@mui/material';
import { Key } from 'iconsax-react';
import { useDialog } from 'src/hooks/use-dialog';
import KeywordsFilterDialog from './keywords-filter-dialog';

const KeyWordsFilter = ({ onApplyFilter }: { onApplyFilter: (filterString: string) => void }) => {
  const KeyWordsFilterDialog = useDialog();

  return (
    <>
      <Button
        variant='outlined'
        startIcon={<Key size={24} />}
        sx={{ width: '250px' }}
        onClick={KeyWordsFilterDialog.handleOpen}
      >
        Bộ lọc từ khóa
      </Button>
      <KeywordsFilterDialog
        open={KeyWordsFilterDialog.open}
        onClose={KeyWordsFilterDialog.handleClose}
        onApply={onApplyFilter}
      />
    </>
  );
};

export default KeyWordsFilter;
