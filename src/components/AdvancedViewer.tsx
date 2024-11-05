import { DocViewerRenderers } from '@cyntler/react-doc-viewer';
const DocViewer = React.lazy(() => import('@cyntler/react-doc-viewer'));
import '@cyntler/react-doc-viewer/dist/index.css';
import React from 'react';

const AdvancedViewer: React.FC<{ documentUrl: string; fileType: string }> = ({
  documentUrl,
  fileType
}) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const docs = [{ uri: documentUrl, fileType: fileType }];

  return (
    <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} style={{ height: 500 }} />
  );
};

export default AdvancedViewer;
