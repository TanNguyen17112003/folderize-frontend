import { apiDelete, apiGet, apiPatch, apiPost, apiPut, getFormData } from 'src/utils/api-request';
import { Organization, OrganizationDetail } from 'src/types/organization';

interface UpdateOrganizatioRequest extends Partial<Omit<Organization, 'id'>> {}

export class OrganizationsApi {
  static async getOrganizations(): Promise<OrganizationDetail[]> {
    return await apiGet('/organizations');
  }

  static async getOrganization(userId: string): Promise<OrganizationDetail> {
    return await apiGet(`/organizations/${userId}`);
  }

  static async updateOrganization(request: UpdateOrganizatioRequest, organizationId: string) {
    return await apiPut(`/organizations/${organizationId}`, request);
  }
}
