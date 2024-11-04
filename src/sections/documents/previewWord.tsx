import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography
} from '@mui/material';
import { Close } from '@mui/icons-material';
import * as docx from 'docx-preview';
import { FileWithId } from 'src/types/file-data';

interface WordPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  file: FileWithId | null;
}

const WordPreviewDialog: React.FC<WordPreviewDialogProps> = ({ open, onClose, file }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && file && file.type === 'DOCX') {
      fetch(file.path)
        .then((response) => response.blob())
        .then((blob) => {
          if (containerRef.current) {
            docx
              .renderAsync(blob, containerRef.current)
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    }
  }, [open, file]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Typography variant='h6'>{file?.name}</Typography>
        <IconButton onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div ref={containerRef} style={{ minHeight: '400px' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WordPreviewDialog;
