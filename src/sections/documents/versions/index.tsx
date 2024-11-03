import { Box, Button } from '@mui/material';
import React, { memo, useMemo } from 'react';
import { CustomTable } from 'src/components/custom-table';
import type { Page as PageType } from 'src/types/page';
import { VersionList } from 'src/types/versions';

const VersionsTable: PageType = memo(() => {
  const configs = useMemo(
    () => [
      { key: 'version', headerLabel: 'Version' },
      { key: 'updated_at', headerLabel: 'Updated At' },
      { key: 'changes', headerLabel: 'Changes' },
      { key: 'author', headerLabel: 'Author' }
    ],
    []
  );

  const handleViewDoc = (docUrl: string) => {
    window.open(docUrl, '_blank');
  };

  return (
    <Box sx={{ py: 4 }}>
      <CustomTable
        rows={VersionList}
        configs={configs}
        renderRowActions={(row) => (
          <Button variant='outlined' onClick={() => handleViewDoc(row.docUrl)}>
            View
          </Button>
        )}
      />
    </Box>
  );
});

VersionsTable.getLayout = (page: any) => <>{page}</>;
export default VersionsTable;
