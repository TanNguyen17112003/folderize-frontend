export interface Organization {
  id: string;
  address: string;
  code: string;
  department_type: string;
  name: string;
  organization_phone: string;
  adminName: string;
  adminEmail: string;
  adminPhone: string;
}

export interface OrganizationDetail extends Organization {}

export const mockOrganization: OrganizationDetail = {
  id: '1',
  address: 'Kí túc xá Khu A, ĐHQG TPHCM',
  code: 'Chovy',
  department_type: 'Khoa',
  name: 'Khoa Công nghệ thông tin',
  organization_phone: '0123456789',
  adminName: 'Chovy',
  adminEmail: 'duytan17112003@gmail.com',
  adminPhone: '0123456789'
};
