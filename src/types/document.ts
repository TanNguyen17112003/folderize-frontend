export interface Document {
  id: string;
  title: string;
  description: string;
  documentUrl: string;
  version: string;
  category: string;
  keywords: string;
  changeNote: string;
  createdAt: string;
  updatedAt: string;
  fileType: string;
  fileSize: string;
}

export interface DocumentDetail extends Document {
  author: string;
  label: string;
}

export const rowData: DocumentDetail = {
  id: '1',
  title: 'Introduction to TypeScript',
  description: "A beginner's guide to understanding and using TypeScript.",
  documentUrl: 'https://example.com/typescript-intro',
  version: "1",
  fileSize: '1.2MB',
  category: 'Programming',
  keywords: 'typescript, beginner, programming',
  author: 'John Doe',
  label: 'Beginner',
  fileType: 'Guide',
  changeNote: 'Initial release',
  createdAt: '2021-10-01',
  updatedAt: '2021-10-01'
};

export const docData: Document[] = [
  {
    id: '1',
    title: 'Document 1',
    description: 'Description for Document 1',
    documentUrl: 'http://example.com/doc1',
    version: '1.0',
    category: 'Category 1',
    keywords: 'keyword1, keyword2',
    changeNote: 'Initial version',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    fileType: 'pdf',
    fileSize: '1MB'
  },
  {
    id: '2',
    title: 'Document 2',
    description: 'Description for Document 2',
    documentUrl: 'http://example.com/doc2',
    version: '1.0',
    category: 'Category 2',
    keywords: 'keyword3, keyword4',
    changeNote: 'Initial version',
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
    fileType: 'docx',
    fileSize: '2MB'
  },
  {
    id: '3',
    title: 'Document 3',
    description: 'Description for Document 3',
    documentUrl: 'http://example.com/doc3',
    version: '1.0',
    category: 'Category 3',
    keywords: 'keyword5, keyword6',
    changeNote: 'Initial version',
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-03T00:00:00Z',
    fileType: 'xlsx',
    fileSize: '3MB'
  },
  {
    id: '4',
    title: 'Document 4',
    description: 'Description for Document 4',
    documentUrl: 'http://example.com/doc4',
    version: '1.0',
    category: 'Category 4',
    keywords: 'keyword7, keyword8',
    changeNote: 'Initial version',
    createdAt: '2023-01-04T00:00:00Z',
    updatedAt: '2023-01-04T00:00:00Z',
    fileType: 'pptx',
    fileSize: '4MB'
  },
  {
    id: '5',
    title: 'Document 5',
    description: 'Description for Document 5',
    documentUrl: 'http://example.com/doc5',
    version: '1.0',
    category: 'Category 5',
    keywords: 'keyword9, keyword10',
    changeNote: 'Initial version',
    createdAt: '2023-01-05T00:00:00Z',
    updatedAt: '2023-01-05T00:00:00Z',
    fileType: 'txt',
    fileSize: '5MB'
  },
  {
    id: '6',
    title: 'Document 6',
    description: 'Description for Document 6',
    documentUrl: 'http://example.com/doc6',
    version: '1.0',
    category: 'Category 6',
    keywords: 'keyword11, keyword12',
    changeNote: 'Initial version',
    createdAt: '2023-01-06T00:00:00Z',
    updatedAt: '2023-01-06T00:00:00Z',
    fileType: 'pdf',
    fileSize: '6MB'
  },
  {
    id: '7',
    title: 'Document 7',
    description: 'Description for Document 7',
    documentUrl: 'http://example.com/doc7',
    version: '1.0',
    category: 'Category 7',
    keywords: 'keyword13, keyword14',
    changeNote: 'Initial version',
    createdAt: '2023-01-07T00:00:00Z',
    updatedAt: '2023-01-07T00:00:00Z',
    fileType: 'docx',
    fileSize: '7MB'
  },
  {
    id: '8',
    title: 'Document 8',
    description: 'Description for Document 8',
    documentUrl: 'http://example.com/doc8',
    version: '1.0',
    category: 'Category 8',
    keywords: 'keyword15, keyword16',
    changeNote: 'Initial version',
    createdAt: '2023-01-08T00:00:00Z',
    updatedAt: '2023-01-08T00:00:00Z',
    fileType: 'xlsx',
    fileSize: '8MB'
  },
  {
    id: '9',
    title: 'Document 9',
    description: 'Description for Document 9',
    documentUrl: 'http://example.com/doc9',
    version: '1.0',
    category: 'Category 9',
    keywords: 'keyword17, keyword18',
    changeNote: 'Initial version',
    createdAt: '2023-01-09T00:00:00Z',
    updatedAt: '2023-01-09T00:00:00Z',
    fileType: 'pptx',
    fileSize: '9MB'
  },
  {
    id: '10',
    title: 'Document 10',
    description: 'Description for Document 10',
    documentUrl: 'http://example.com/doc10',
    version: '1.0',
    category: 'Category 10',
    keywords: 'keyword19, keyword20',
    changeNote: 'Initial version',
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2023-01-10T00:00:00Z',
    fileType: 'txt',
    fileSize: '10MB'
  }
];
