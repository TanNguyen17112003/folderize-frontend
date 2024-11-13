import React from 'react';

const FileViewer = React.lazy(() => import('react-file-viewer'));
import { CustomErrorComponent } from 'custom-error';

interface FileViewerProps {
  documentUrl: string;
  fileType: string;
}

const CustomFileViewer: React.FC<FileViewerProps> = ({ documentUrl, fileType }) => {
  return (
    <FileViewer
      fileType={fileType}
      filePath={documentUrl}
      errorComponent={CustomErrorComponent}
      onError={(e) => console.error(e)}
    />
  );
};

export default CustomFileViewer;
