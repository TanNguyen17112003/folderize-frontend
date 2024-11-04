declare module 'react-file-viewer' {
  import * as React from 'react';

  interface FileViewerProps {
    fileType: string;
    filePath: string;
    errorComponent?: React.ComponentType<any>;
    onError?: (e: Error) => void;
  }

  const FileViewer: React.FC<FileViewerProps>;

  export default FileViewer;
}
