import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';
import React from 'react';

const AdvancedViewer: React.FC<{ documentUrl: string; fileType: string }> = ({
  documentUrl,
  fileType
}) => {
  const docs = [{ uri: documentUrl, fileType: fileType }];

  return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
};

export default AdvancedViewer;
