export interface Organization {
  id: string;
  address: string;
  code: string;
  departmentType: string;
  name: string;
  organizationPhone: string;
  adminName?: string;
  adminEmail?: string;
  adminPhone?: string;
}

export interface OrganizationDetail extends Organization {}

export const mockOrganization: OrganizationDetail = {
  id: '1',
  address: 'Kí túc xá Khu A, ĐHQG TPHCM',
  code: 'Chovy',
  departmentType: 'Khoa',
  name: 'Khoa Công nghệ thông tin',
  organizationPhone: '0123456789',
  adminName: 'Chovy',
  adminEmail: 'duytan17112003@gmail.com',
  adminPhone: '0123456789'
};
