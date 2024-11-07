import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { DocumentsApi, UploadDocumentRequest } from 'src/api/documents';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { DocumentDetail, Document } from 'src/types/document';

interface ContextValue {
  getDocumentsApi: UseFunctionReturnType<FormData, DocumentDetail[]>;
  uploadDocument: (request: UploadDocumentRequest) => Promise<void>;
  updateDocument: (document: Partial<DocumentDetail>, id: string) => Promise<void>;
  deleteDocument: (id: DocumentDetail['id']) => Promise<void>;
}

export const DocumentsContext = createContext<ContextValue>({
  getDocumentsApi: DEFAULT_FUNCTION_RETURN,
  uploadDocument: async () => {},
  updateDocument: async () => {},
  deleteDocument: async () => {}
});

const DocumentsProvider = ({ children }: { children: ReactNode }) => {
  const getDocumentsApi = useFunction(DocumentsApi.getDocuments);

  const uploadDocument = useCallback(
    async (request: UploadDocumentRequest) => {
      try {
        await DocumentsApi.uploadDocument(request);
        getDocumentsApi.setData({
          ...(getDocumentsApi.data || [])
        });
      } catch (error) {
        throw error;
      }
    },
    [getDocumentsApi]
  );

  const updateDocument = useCallback(
    async (document: Partial<DocumentDetail>, id: string) => {
      try {
        await DocumentsApi.updateDocument(document, id);
        getDocumentsApi.setData(
          (getDocumentsApi.data || []).map((c) => (c.id === id ? Object.assign(c, document) : c))
        );
      } catch (error) {
        throw error;
      }
    },
    [getDocumentsApi]
  );

  const deleteDocument = useCallback(
    async (id: DocumentDetail['id']) => {
      try {
        await DocumentsApi.deleteDocument(id);
        getDocumentsApi.setData((getDocumentsApi.data || []).filter((c) => c.id !== id));
      } catch (error) {
        throw error;
      }
    },
    [getDocumentsApi]
  );

  useEffect(() => {
    getDocumentsApi.call(new FormData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DocumentsContext.Provider
      value={{
        getDocumentsApi,
        uploadDocument,
        updateDocument,
        deleteDocument
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export const useDocumentsContext = () => useContext(DocumentsContext);

export default DocumentsProvider;
