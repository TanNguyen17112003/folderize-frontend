import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { OrganizationsApi } from 'src/api/organizations';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { Organization, OrganizationDetail } from 'src/types/organization';

interface ContextValue {
  getOrganizationsApi: UseFunctionReturnType<FormData, OrganizationDetail[]>;
  updateOrganization: (
    organization: Partial<Omit<Organization, 'id'>>,
    id: string
  ) => Promise<void>;
}

export const OrganizationsContext = createContext<ContextValue>({
  getOrganizationsApi: DEFAULT_FUNCTION_RETURN,
  updateOrganization: async () => {}
});

const OrganizationsProvider = ({ children }: { children: ReactNode }) => {
  const getOrganizationsApi = useFunction(OrganizationsApi.getOrganizations);

  const updateOrganization = useCallback(
    async (organization: Partial<Omit<Organization, 'id'>>, id: string) => {
      try {
        await OrganizationsApi.updateOrganization(organization, id);
        getOrganizationsApi.setData(
          (getOrganizationsApi.data || []).map((c) =>
            c.id === id ? Object.assign(c, organization) : c
          )
        );
      } catch (error) {
        throw error;
      }
    },
    [getOrganizationsApi]
  );

  useEffect(() => {
    getOrganizationsApi.call(new FormData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrganizationsContext.Provider
      value={{
        getOrganizationsApi,
        updateOrganization
      }}
    >
      {children}
    </OrganizationsContext.Provider>
  );
};

export const useOrganizationsContext = () => useContext(OrganizationsContext);

export default OrganizationsProvider;
