import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { DocumentsApi } from 'src/api/documents';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { DocumentDetail, Document } from 'src/types/document';

interface ContextValue {
  getDocumentsApi: UseFunctionReturnType<FormData, DocumentDetail[]>;

  createDocument: (requests: File) => Promise<void>;
  updateDocument: (User: Partial<DocumentDetail>) => Promise<void>;
  deleteDocument: (ids: Document['id'][]) => Promise<void>;
}

export const DocumentsContext = createContext<ContextValue>({
  getDocumentsApi: DEFAULT_FUNCTION_RETURN,

  createDocument: async () => {},
  updateDocument: async () => {},
  deleteDocument: async () => {}
});

const DocumentsProvider = ({ children }: { children: ReactNode }) => {
  const getDocumentsApi = useFunction(DocumentsApi.getDocuments);

  const createDocument = useCallback(
    async (request: File) => {
      try {
        const user = await DocumentsApi.uploadDocument({ file: request });
        if (user) {
          const newUsers: DocumentDetail[] = [
            {
              ...request,
              id: user.id
            },
            ...(getDocumentsApi.data || [])
          ];
          getDocumentsApi.setData(newUsers);
        }
      } catch (error) {
        throw error;
      }
    },
    [getDocumentsApi]
  );

  const updateDocument = useCallback(
    async (Document: Partial<Document>) => {
      try {
        await DocumentsApi.updateDocument(Document);
        getDocumentsApi.setData(
          (getDocumentsApi.data || []).map((c: { id: string | undefined }) =>
            c.id == Document.id ? Object.assign(c, Document) : c
          )
        );
      } catch (error) {
        throw error;
      }
    },
    [getDocumentsApi]
  );

  const deleteDocument = useCallback(
    async (ids: Document['id'][]) => {
      try {
        const results = await Promise.allSettled(ids.map((id) => DocumentsApi.deleteDocument(ids)));
        getDocumentsApi.setData([
          ...(getDocumentsApi.data || []).filter(
            (Document: DocumentDetail) =>
              !results.find(
                (result, index) => result.status == 'fulfilled' && ids[index] == Document.id
              )
          )
        ]);
        results.forEach((result, index) => {
          if (result.status == 'rejected') {
            throw new Error(
              'Không thể xoá danh mục: ' + ids[index] + '. ' + result.reason.toString()
            );
          }
        });
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

        createDocument,
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
