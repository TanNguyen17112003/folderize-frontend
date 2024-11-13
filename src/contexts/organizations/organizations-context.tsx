import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { OrganizationsApi } from 'src/api/organizations';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { Organization, OrganizationDetail } from 'src/types/organization';

interface ContextValue {
  getOrganizationInfoApi: UseFunctionReturnType<FormData, OrganizationDetail>;
  updateOrganization: (
    organization: Partial<Omit<Organization, 'id'>>,
    id: string
  ) => Promise<void>;
}

export const OrganizationsContext = createContext<ContextValue>({
  getOrganizationInfoApi: DEFAULT_FUNCTION_RETURN,
  updateOrganization: async () => {}
});

const OrganizationsProvider = ({ children }: { children: ReactNode }) => {
  const getOrganizationInfoApi = useFunction(OrganizationsApi.getUserOrganizationInfo);

  const updateOrganization = useCallback(
    async (organization: Partial<Omit<Organization, 'id'>>) => {
      try {
        const organizationId = getOrganizationInfoApi?.data?.id;
        await OrganizationsApi.updateOrganization(organization);
        getOrganizationInfoApi.setData({
          ...organization,
          organizationId
        } as unknown as OrganizationDetail);
      } catch (error) {
        throw error;
      }
    },
    [getOrganizationInfoApi]
  );

  useEffect(() => {
    getOrganizationInfoApi.call(new FormData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrganizationsContext.Provider
      value={{
        getOrganizationInfoApi,
        updateOrganization
      }}
    >
      {children}
    </OrganizationsContext.Provider>
  );
};

export const useOrganizationsContext = () => useContext(OrganizationsContext);

export default OrganizationsProvider;
