declare module 'react-excel-renderer' {
  import * as React from 'react';

  interface ExcelRendererProps {
    file: string;
    render: (data: { rows: any[]; cols: any[] }) => React.ReactNode;
  }

  export class ExcelRenderer extends React.Component<ExcelRendererProps> {}
}
