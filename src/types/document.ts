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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DocumentDetail extends Document {}
