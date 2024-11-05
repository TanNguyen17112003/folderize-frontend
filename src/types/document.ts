export interface Document {
  id: string;
  title: string;
  description: string;
  documentUrl: string;
  version: string;
  changeNote: string;
  category: string;
  keywords: string;
  fileSize: number;
  fileType: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DocumentDetail extends Document {
  body: any;
  createElement(arg0: string): unknown;
}
