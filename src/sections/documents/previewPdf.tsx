import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Button,
  IconButton,
  Typography,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { ArrowBack, ArrowForward, ZoomIn, ZoomOut, Close } from '@mui/icons-material';
import * as pdfjs from 'pdfjs-dist';
import { FileWithId } from 'src/types/file-data';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf/pdf.worker.min.mjs';

interface PreviewPdfDialogProps {
  file: FileWithId;
  open: boolean;
  onClose: () => void;
}

const PreviewPdfDialog: React.FC<PreviewPdfDialogProps> = ({ file, open, onClose }) => {
  const [pdf, setPDF] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageInput, setPageInput] = useState('1');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<pdfjs.RenderTask | null>(null);

  const renderPage = useCallback(
    async (pdfDoc: pdfjs.PDFDocumentProxy, pageNum: number, scale: number) => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      const page = await pdfDoc.getPage(pageNum);
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !canvasRef.current) return;

      const viewport = page.getViewport({ scale });
      canvasRef.current.width = viewport.width;
      canvasRef.current.height = viewport.height;

      renderTaskRef.current = page.render({
        canvasContext: ctx,
        viewport: viewport
      });

      try {
        await renderTaskRef.current.promise;
      } catch (error) {
        if ((error as any).name !== 'RenderingCancelledException') {
          setIsError(true);
        }
      }
    },
    []
  );

  const prevPage = () => {
    if (currentPage > 1 && pdf) {
      const newPage = currentPage - 1;
      renderPage(pdf, newPage, scale);
      setCurrentPage(newPage);
      setPageInput(newPage.toString());
    }
  };

  const nextPage = () => {
    if (currentPage < numPages && pdf) {
      const newPage = currentPage + 1;
      renderPage(pdf, newPage, scale);
      setCurrentPage(newPage);
      setPageInput(newPage.toString());
    }
  };

  const zoomOut = () => {
    const newScale = scale - 0.1;
    if (pdf) renderPage(pdf, currentPage, newScale);
    setScale(newScale);
  };

  const zoomIn = () => {
    const newScale = scale + 0.1;
    if (pdf) renderPage(pdf, currentPage, newScale);
    setScale(newScale);
  };

  const handlePageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(event.target.value);
  };

  const handlePageInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && pdf) {
      const pageNum = parseInt(pageInput, 10);
      if (pageNum > 0 && pageNum <= numPages) {
        renderPage(pdf, pageNum, scale);
        setCurrentPage(pageNum);
      }
    }
  };

  useEffect(() => {
    const fetchPdf = async () => {
      const loadingTask = pdfjs.getDocument(file.path);
      const pdfDoc = await loadingTask.promise;

      setPDF(pdfDoc);
      setNumPages(pdfDoc.numPages);
      setLoaded(true);
    };

    if (open) {
      fetchPdf();
    }

    return () => {
      renderTaskRef.current?.cancel();
    };
  }, [file.path, open]);

  useEffect(() => {
    if (pdf && numPages > 0) {
      renderPage(pdf, 1, scale);
      setCurrentPage(1);
      setPageInput('1');
    }
  }, [pdf, numPages, renderPage, scale]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>{file.name}</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        {isError ? (
          <Typography variant='h4' align='center'>
            Đã xảy ra lỗi khi tải tài liệu
          </Typography>
        ) : loaded ? (
          <Stack spacing={2} alignItems='center'>
            <Stack direction='row' spacing={1} alignItems='center'>
              <IconButton onClick={prevPage} disabled={currentPage === 1}>
                <ArrowBack />
              </IconButton>
              <Typography>Trang</Typography>
              <TextField
                value={pageInput}
                onChange={handlePageInputChange}
                onKeyDown={handlePageInputKeyPress}
                placeholder='1'
                variant='outlined'
                size='small'
                style={{ width: '50px' }}
              />
              <Typography>/ {numPages}</Typography>
              <IconButton onClick={nextPage} disabled={currentPage === numPages}>
                <ArrowForward />
              </IconButton>
              <IconButton onClick={zoomIn}>
                <ZoomIn />
              </IconButton>
              <IconButton onClick={zoomOut}>
                <ZoomOut />
              </IconButton>
            </Stack>
            <Box className='canvas-container'>
              <canvas ref={canvasRef} />
            </Box>
          </Stack>
        ) : (
          <Typography variant='h4' align='center'>
            Đang tải tài liệu...
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewPdfDialog;
