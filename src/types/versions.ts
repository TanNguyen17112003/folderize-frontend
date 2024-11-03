export interface Version {
  id: string;
  version: string;
  updated_at: string;
  changes: string;
  author: string;
  docUrl: string;
}
export const VersionList: Version[] = [
  {
    id: 'v1',
    version: '1.0',
    updated_at: '2023-07-01',
    changes: 'Initial release with core content',
    author: 'John Doe',
    docUrl: '/#'
  },
  {
    id: 'v2',
    version: '1.1',
    updated_at: '2023-09-15',
    changes: 'Added additional examples and updated formatting',
    author: 'Jane Smith',
    docUrl: '/#'
  },
  {
    id: 'v3',
    version: '2.0',
    updated_at: '2024-01-10',
    changes: 'Major update with new chapters and sections',
    author: 'John Doe',
    docUrl: '/#'
  }
];
