import { apiDelete, apiGet, apiPatch, apiPost, apiPut, getFormData } from 'src/utils/api-request';
import { Organization, OrganizationDetail } from 'src/types/organization';
import { UserDetail } from 'src/types/user';

interface UpdateOrganizatioRequest extends Partial<Omit<Organization, 'id'>> {}

interface OrganizationEmployessResponse extends OrganizationDetail {
  employeeList: UserDetail[];
}

interface InvitationRequest {
  email: string;
  message: string;
}

interface InvitationResponse {
  token: string;
  userReply: string;
}

export class OrganizationsApi {
  static async getNumberOfOrganizations() {
    return await apiGet('/organizations/count');
  }

  static async getUserOrganizationInfo(): Promise<OrganizationDetail> {
    return await apiGet('/organizations/user-organization-info');
  }

  static async getOrganization(organizationId: string): Promise<OrganizationDetail> {
    return await apiGet(`/organizations/${organizationId}`);
  }

  static async updateOrganization(request: UpdateOrganizatioRequest) {
    return await apiPut(`/organizations`, request);
  }

  static async getOrganizationEmployees(request: {}): Promise<OrganizationEmployessResponse> {
    return await apiGet('/organizations/employees', request);
  }

  static async deleteOrganizationEmployee(userId: number): Promise<void> {
    return await apiDelete(`/organizations/employees/?userId=${userId}`, {});
  }

  static async sendInvitation(request: InvitationRequest) {
    return await apiPost('/organizations/initiate-invitation', request);
  }

  static async completeInvitation(request: InvitationResponse) {
    return await apiPost('/organizations/complete-invitation', request);
  }

  static async getAllOrganizations(request: {}): Promise<OrganizationDetail[]> {
    return await apiGet('/organizations/all', request);
  }
}
