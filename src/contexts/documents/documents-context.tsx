import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { DocumentsApi, UploadDocumentRequest } from 'src/api/documents';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { DocumentDetail, Document } from 'src/types/document';

interface ContextValue {
  getDocumentsApi: UseFunctionReturnType<FormData, DocumentDetail[]>;
}

export const DocumentsContext = createContext<ContextValue>({
  getDocumentsApi: DEFAULT_FUNCTION_RETURN
});

const DocumentsProvider = ({ children }: { children: ReactNode }) => {
  const getDocumentsApi = useFunction(DocumentsApi.getDocuments);

  useEffect(() => {
    getDocumentsApi.call(new FormData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DocumentsContext.Provider
      value={{
        getDocumentsApi
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export const useDocumentsContext = () => useContext(DocumentsContext);

export default DocumentsProvider;
