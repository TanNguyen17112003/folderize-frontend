export interface FileData {
  id: string;
  name: string;
  path: string;
}

export const initialFileData: FileData = {
  id: '',
  name: '',
  path: ''
};

export interface FileFormProps {
  title: string;
  description: string;
  category: string;
  keywords: string;
  changeNote?: string;
}

export interface FileVersionFormProps extends FileFormProps {
  version: string;
  documentId: number;
  file?: File;
}

export const initialFileForm: FileFormProps = {
  title: '',
  description: '',
  category: '',
  keywords: '',
  changeNote: ''
};

export const initialFileVersionForm: FileVersionFormProps = {
  ...initialFileForm,
  version: '',
  documentId: 0
};

export interface FileWithId {
  id: string;
  name: string;
  size: string;
  type: string;
  date: Date;
  path: string;
}
