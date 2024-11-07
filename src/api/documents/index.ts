import { FileData } from 'src/types/file-data';
import { DocumentDetail, Document } from 'src/types/document';
import { apiGet, apiPost, apiDelete, getFormData } from 'src/utils/api-request';
export interface UploadDocumentRequest {
  file: File;
  data: string;
}
export class DocumentsApi {
  static async getDocuments(request: {}): Promise<DocumentDetail[]> {
    return await apiGet('/documents', request);
  }

  static async uploadDocument(request: UploadDocumentRequest): Promise<DocumentDetail> {
    return await apiPost('/documents', getFormData(request));
  }

  static async updateDocument(request: Partial<DocumentDetail>, documentId: string) {
    return await apiPost(`/documents/` + documentId, request);
  }

  static async deleteDocument(documentId: DocumentDetail['id']) {
    return await apiDelete(`/documents/` + documentId, {});
  }
}
