import { Box, Button } from '@mui/material';
import React, { memo, useEffect, useMemo } from 'react';
import { CustomTable } from 'src/components/custom-table';
import type { Page as PageType } from 'src/types/page';
import { VersionList } from 'src/types/versions';
import { DocumentsApi } from 'src/api/documents';
import { useRouter } from 'next/router';
import useFunction from 'src/hooks/use-function';

const VersionsTable: PageType = memo(() => {
  const router = useRouter();
  const getDocumentVersionsApi = useFunction(DocumentsApi.getDocumentVersions);
  const versionList = useMemo(() => {
    return getDocumentVersionsApi.data?.versions || [];
  }, [getDocumentVersionsApi.data]);
  const configs = useMemo(
    () => [
      { key: 'version', headerLabel: 'Phiên bản' },
      { key: 'updatedAt', headerLabel: 'Updated At' },
      { key: 'changes', headerLabel: 'Changes' }
    ],
    []
  );

  const handleViewDoc = (docUrl: string) => {
    window.open(docUrl, '_blank');
  };

  useEffect(() => {
    getDocumentVersionsApi.call(Number(router.query.documentId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.documentId]);

  return (
    <Box sx={{ py: 4 }}>
      <CustomTable
        rows={versionList}
        configs={configs}
        renderRowActions={(row) => <Button variant='outlined'>View</Button>}
      />
    </Box>
  );
});

VersionsTable.getLayout = (page: any) => <>{page}</>;
export default VersionsTable;
