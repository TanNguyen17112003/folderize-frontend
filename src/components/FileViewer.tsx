import React from 'react';
import FileViewer from 'react-file-viewer';
import { Document, Page } from 'react-pdf';
import { ExcelRenderer } from 'react-excel-renderer';
import { CustomErrorComponent } from 'custom-error';

interface FileViewerProps {
  documentUrl: string;
  fileType: string;
}

const CustomFileViewer: React.FC<FileViewerProps> = ({ documentUrl, fileType }) => {
  if (fileType === 'xlsx' || fileType === 'xls') {
    return (
      <ExcelRenderer
        file={documentUrl}
        render={(data) => (
          <div>
            {data.rows.map((row, index) => (
              <div key={index}>
                {row.map(
                  (
                    cell:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<React.AwaitedReactNode>
                      | Iterable<React.ReactNode>
                      | null
                      | undefined,
                    cellIndex: React.Key | null | undefined
                  ) => (
                    <span key={cellIndex}>{cell}</span>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      />
    );
  }

  if (fileType === 'pptx') {
    return (
      <FileViewer
        fileType={fileType}
        filePath={documentUrl}
        errorComponent={CustomErrorComponent}
        onError={(e) => console.error(e)}
      />
    );
  }

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
