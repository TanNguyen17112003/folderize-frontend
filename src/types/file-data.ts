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
  keywords: { value: string; label: string }[];
}

export const initialFileForm: FileFormProps = {
  title: '',
  description: '',
  category: '',
  keywords: []
};

export interface FileWithId {
  id: string;
  name: string;
  size: string;
  type: string;
  date: Date;
  path: string;
}
