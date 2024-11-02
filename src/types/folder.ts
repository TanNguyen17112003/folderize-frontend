import { DocumentDetail } from './document';

export interface Folder {
  id: string;
  name: string;
  description: string;
  documents: DocumentDetail[];
}
