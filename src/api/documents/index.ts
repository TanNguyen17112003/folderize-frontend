import { FileData } from 'src/types/file-data';
import { DocumentDetail, Document } from 'src/types/document';
import { apiGet, apiPost, apiDelete, getFormData } from 'src/utils/api-request';

export default class DocumentsApi {
  static async getDocuments(request: {}) {
    return await apiGet('/documents', request);
  }

  static async uploadDocument(request: { file: File }): Promise<DocumentDetail> {
    return await apiPost('/files/upload', getFormData(request));
  }

  static async downloadDocuments(request: Partial<DocumentDetail & Pick<DocumentDetail, 'id'>>) {
    return await apiGet(`/files/download/${request.id}`, request);
  }

  static async updateDocument(request: Partial<DocumentDetail>) {
    return await apiPost(`/files`, request);
  }

  static async deleteDocument(ids: DocumentDetail['id'][]) {
    return await apiDelete(`/files`, { ids });
  }
}
