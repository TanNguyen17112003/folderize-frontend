import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { DocumentsApi } from 'src/api/documents';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { DocumentDetail, Document } from 'src/types/document';

interface ContextValue {
  getFoldersApi: UseFunctionReturnType<FormData, DocumentDetail[]>;

  createFolder: (requests: File) => Promise<void>;
  updateFolder: (User: Partial<DocumentDetail>) => Promise<void>;
  deleteFolder: (ids: Document['id'][]) => Promise<void>;
}

export const FoldersContext = createContext<ContextValue>({
  getFoldersApi: DEFAULT_FUNCTION_RETURN,

  createFolder: async () => {},
  updateFolder: async () => {},
  deleteFolder: async () => {}
});

const FoldersProvider = ({ children }: { children: ReactNode }) => {
  const getFoldersApi = useFunction(DocumentsApi.getDocuments);

  const createFolder = useCallback(
    async (request: File) => {
      try {
        const user = await DocumentsApi.uploadDocument({ file: request });
        if (user) {
          const newUsers: DocumentDetail[] = [
            {
              ...request,
              id: user.id
            },
            ...(getFoldersApi.data || [])
          ];
          getFoldersApi.setData(newUsers);
        }
      } catch (error) {
        throw error;
      }
    },
    [getFoldersApi]
  );

  const updateFolder = useCallback(
    async (Document: Partial<Document>) => {
      try {
        await DocumentsApi.updateDocument(Document);
        getFoldersApi.setData(
          (getFoldersApi.data || []).map((c: { id: string | undefined }) =>
            c.id == Document.id ? Object.assign(c, Document) : c
          )
        );
      } catch (error) {
        throw error;
      }
    },
    [getFoldersApi]
  );

  const deleteFolder = useCallback(
    async (ids: Document['id'][]) => {
      try {
        const results = await Promise.allSettled(ids.map((id) => DocumentsApi.deleteDocument(ids)));
        getFoldersApi.setData([
          ...(getFoldersApi.data || []).filter(
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
    [getFoldersApi]
  );

  useEffect(() => {
    getFoldersApi.call(new FormData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FoldersContext.Provider
      value={{
        getFoldersApi,

        createFolder,
        updateFolder,
        deleteFolder
      }}
    >
      {children}
    </FoldersContext.Provider>
  );
};

export const useFoldersContext = () => useContext(FoldersContext);

export default FoldersProvider;
