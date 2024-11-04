import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { DocumentsApi } from 'src/api/documents';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { DocumentDetail, Document } from 'src/types/document';

interface ContextValue {
  getDocumentsApi: UseFunctionReturnType<FormData, DocumentDetail[]>;
}

export const OrganizationsContext = createContext<ContextValue>({
  getDocumentsApi: DEFAULT_FUNCTION_RETURN
});

const OrganizationsProvider = ({ children }: { children: ReactNode }) => {
  const getDocumentsApi = useFunction(DocumentsApi.getDocuments);

  useEffect(() => {
    getDocumentsApi.call(new FormData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrganizationsContext.Provider
      value={{
        getDocumentsApi
      }}
    >
      {children}
    </OrganizationsContext.Provider>
  );
};

export const useOrganizationsContext = () => useContext(OrganizationsContext);

export default OrganizationsProvider;
