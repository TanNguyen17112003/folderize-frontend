// export interface Document {
//   id: string;
//   title: string;
//   description: string;
//   documentUrl: string;
//   version: string;
//   changeNote: string;
//   category: string;
//   keywords: string;
//   fileSize: number;
//   fileType: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export interface DocumentVersion {
  id: number;
  title: string;
  documentUrl: string;
  version: string;
  changeNote: string;
  description: string;
  category: string;
  keywords: string;
  fileSize: number;
  fileType: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: number;
  name: string;
  isPublic: boolean;
  versions: DocumentVersion[];
}

export interface DocumentDetail extends Document {
  body?: any;
  createElement(arg0: string): unknown;
}
