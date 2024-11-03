export interface Document {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface DocumentDetail extends Document {
  author: string;
  label: string;
  category: string;
  keyword: string;
  type: string;
  fileSize: string;
  title: string;
}

export const rowData: DocumentDetail = {
  id: '1',
  name: 'Advanced JavaScript Concepts',
  description: 'A comprehensive guide to advanced JavaScript concepts.',
  url: 'http://example.com/advanced-js',
  author: 'John Doe',
  label: 'Approval',
  category: 'Programming',
  keyword: 'JavaScript, Guide, Advanced',
  type: 'PDF',
  fileSize: '2.3 MB',
  title: 'Advanced JavaScript Concepts'
};
