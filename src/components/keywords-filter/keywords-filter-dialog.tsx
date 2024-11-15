import React, { useCallback, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  Box
} from '@mui/material';
import { PlusIcon, XIcon } from 'lucide-react';

interface KeywordsFilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: (filterString: string) => void;
}

interface KeywordProps {
  label: string;
  value: '&&' | '||';
}

const KeywordsFilterDialog: React.FC<KeywordsFilterDialogProps> = ({ open, onClose, onApply }) => {
  const [keywords, setKeywords] = useState<{ keyword: string; operator: KeywordProps['value'] }[]>([
    { keyword: '', operator: '&&' }
  ]);

  const handleAddKeyword = () => {
    setKeywords([...keywords, { keyword: '', operator: '&&' }]);
  };

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index].keyword = value;
    setKeywords(newKeywords);
  };

  const handleOperatorChange = (index: number, value: KeywordProps['value']) => {
    const newKeywords = [...keywords];
    newKeywords[index].operator = value;
    setKeywords(newKeywords);
  };

  const handleRemoveKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
  };

  const handleReset = useCallback(() => {
    setKeywords([{ keyword: '', operator: '&&' }]);
    onApply('');
    onClose();
  }, [setKeywords, onClose, onApply]);

  const handleApplyFilter = useCallback(() => {
    const filterString = keywords.reduce((acc, curr, index) => {
      if (index === 0) {
        return curr.keyword;
      }
      return `${acc} ${curr.operator} ${curr.keyword}`;
    }, '');
    onApply(filterString);
    onClose();
  }, [keywords, onApply, onClose]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Lọc theo từ khóa</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {keywords.map((keyword, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Box display='flex' gap={1} justifyContent={'center'}>
                  <Button
                    variant={keyword.operator === '&&' ? 'contained' : 'outlined'}
                    onClick={() => handleOperatorChange(index, '&&')}
                  >
                    AND
                  </Button>
                  <Button
                    variant={keyword.operator === '||' ? 'contained' : 'outlined'}
                    onClick={() => handleOperatorChange(index, '||')}
                  >
                    OR
                  </Button>
                </Box>
              )}
              <Box display='flex' alignItems='center' gap={2}>
                <TextField
                  variant='outlined'
                  placeholder='Nhập từ khóa'
                  value={keyword.keyword}
                  onChange={(e) => handleKeywordChange(index, e.target.value)}
                  fullWidth
                />
                {index > 0 && (
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => handleRemoveKeyword(index)}
                  >
                    Xóa
                  </Button>
                )}
              </Box>
            </React.Fragment>
          ))}
          <Button
            variant='contained'
            color='success'
            startIcon={<PlusIcon size={24} color='white' />}
            onClick={handleAddKeyword}
          >
            Thêm từ khóa
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} color='secondary'>
          Xóa lọc
        </Button>
        <Button onClick={handleApplyFilter} color='primary'>
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KeywordsFilterDialog;
