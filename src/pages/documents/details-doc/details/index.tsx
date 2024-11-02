// import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Chip, Typography } from '@mui/material';
import React, { memo, useMemo } from 'react';
import { Button } from 'src/components/shadcn/ui/button';
import type { Page as PageType } from 'src/types/page';

const DetailsTable: PageType = memo(() => {
  // const docs = [
  //   {
  //     // uri: "url", // for remote file
  //     uri: '/demo.pdf' // for local file
  //   }
  // ];
  const rows = useMemo(() => {
    return [
      {
        id: '1',
        author: 'John Doe',
        description: 'A comprehensive guide to advanced JavaScript concepts.',
        label: 'Approval',
        category: 'Programming',
        keyword: 'JavaScript, Guide, Advanced',
        type: 'PDF',
        fileSize: '2.3 MB',
        title: 'Advanced JavaScript Concepts'
      }
    ];
  }, []);

  const displayRows = useMemo(() => {
    return [
      { label: 'Author', value: rows[0].author },
      { label: 'Description', value: rows[0].description },
      { label: 'Label', value: <Chip label={rows[0].label} color='success' /> },
      { label: 'Category', value: rows[0].category },
      { label: 'Keywords', value: rows[0].keyword },
      { label: 'Type', value: rows[0].type },
      { label: 'File Size', value: rows[0].fileSize }
    ];
  }, [rows]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', py: 4 }}>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ height: 200, backgroundColor: 'lightgrey', mb: 2 }}>
          Document Viewer
          {/* <DocViewer
            prefetchMethod='GET'
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            style={{width: 500, height: 500}}
            className='w-3 h-3'
            config={{
              pdfZoom: {
                defaultZoom: 1, // 1 as default,
                zoomJump: 0.1 // 0.1 as default,
              }
            }}
          /> */}
        </Box>
        <Typography variant='h6'>{rows[0].title}</Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <div className='w-full max-w-3xl mx-auto'>
          {displayRows.map((item, index) => (
            <div key={index} className='flex px-6 py-4 hover:bg-gray-50'>
              <div className='w-1/3 font-medium text-gray-500'>{item.label}</div>
              <div className='w-2/3 text-gray-900'>{item.value}</div>
            </div>
          ))}
        </div>
      </Box>

      <Button
        variant='default'
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16
        }}
      >
        <EditIcon />
        Edit
      </Button>
    </Box>
  );
});

DetailsTable.getLayout = (page) => <>{page}</>;

export default DetailsTable;
