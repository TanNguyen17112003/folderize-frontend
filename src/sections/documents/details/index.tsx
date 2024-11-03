import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';
import React, { memo } from 'react';
import { Button } from 'src/components/shadcn/ui/button';
import { rowData } from 'src/types/document';
import type { Page as PageType } from 'src/types/page';
import DisplayRowsConfig from './details-doc-table-config';

const DetailsTable: PageType = memo(() => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', py: 4 }}>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ height: 200, backgroundColor: 'lightgrey', mb: 2 }}>
          Document Viewer
          {/* <DocViewer ... /> */}
        </Box>
        <Typography variant='h6'>{rowData.title}</Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <DisplayRowsConfig rowData={rowData} />
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
