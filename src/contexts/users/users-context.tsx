import { createContext, ReactNode, useCallback, useEffect, useContext } from 'react';
import { UsersApi } from 'src/api/users';
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';
import { User, UserDetail } from 'src/types/user';

interface ContextValue {
  getUsersApi: UseFunctionReturnType<FormData, UserDetail[]>;
}

export const UsersContext = createContext<ContextValue>({
  getUsersApi: DEFAULT_FUNCTION_RETURN
});

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const getUsersApi = useFunction(UsersApi.getUsers);

  return (
    <UsersContext.Provider
      value={{
        getUsersApi
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => useContext(UsersContext);

export default UsersProvider;
