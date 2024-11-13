import { FileData } from 'src/types/file-data';
import { DocumentDetail, Document, DocumentVersion } from 'src/types/document';
import { apiGet, apiPost, apiDelete } from 'src/utils/api-request';
export interface UploadDocumentRequest {
  file: File;
  title: string;
  version: string;
  changeNote: string;
  isPublic?: boolean;
  description: string;
  category: string;
  keywords: string;
}

export interface UploadDocumentVersionRequest extends UploadDocumentRequest {
  documentId: number;
}

export const getFormDataDocument = (request: UploadDocumentRequest): FormData => {
  const formData = new FormData();
  formData.append('file', request.file);
  formData.append('title', request.title);
  formData.append('version', request.version);
  formData.append('changeNote', request.changeNote);
  formData.append('description', request.description);
  formData.append('category', request.category);
  formData.append('keywords', request.keywords);
  if (request.isPublic !== undefined) {
    formData.append('isPublic', request.isPublic.toString());
  }
  return formData;
};

export const getFormDataDocumentVersion = (request: UploadDocumentVersionRequest): FormData => {
  const formData = new FormData();
  formData.append('documentId', request.documentId.toString());
  formData.append('file', request.file);
  formData.append('title', request.title);
  formData.append('version', request.version);
  formData.append('changeNote', request.changeNote);
  formData.append('description', request.description);
  formData.append('category', request.category);
  formData.append('keywords', request.keywords);
  return formData;
};

export class DocumentsApi {
  static async getDocuments(request: {}): Promise<DocumentDetail[]> {
    return await apiGet('/documents', request);
  }

  static async getDocumentVersions(documentId: number): Promise<DocumentDetail> {
    return await apiGet(`/documents/${documentId}/versions`, {});
  }

  static async uploadDocument(request: UploadDocumentRequest): Promise<DocumentDetail> {
    return await apiPost('/documents', getFormDataDocument(request));
  }

  static async uploadDocumentVersion(
    request: UploadDocumentVersionRequest
  ): Promise<DocumentVersion> {
    return await apiPost(
      `/documents/${request.documentId}/versions`,
      getFormDataDocumentVersion(request)
    );
  }

  static async updateDocument(request: Partial<DocumentDetail>, documentId: number) {
    return await apiPost(`/documents/` + documentId, request);
  }

  static async deleteDocument(documentId: DocumentDetail['id']) {
    return await apiDelete(`/documents/` + documentId, {});
  }
}
