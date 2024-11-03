import { FileData } from 'src/types/file-data';
import { DocumentDetail, Document } from 'src/types/document';
import { apiGet, apiPost, apiDelete, getFormData } from 'src/utils/api-request';
export interface UploadDocumentRequest {
  file: File;
  data: string;
}
export class DocumentsApi {
  static async getDocuments(request: {}) {
    return await apiGet('/files', request);
  }

  static async uploadDocument(request: UploadDocumentRequest): Promise<DocumentDetail> {
    return await apiPost('/documents', getFormData(request));
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
