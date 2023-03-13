import * as React from 'react';

export const UserContext = React.createContext<{
  user: string | undefined;
  setUser: ((user: string | undefined) => void)
}>({
  user: undefined,
  setUser: () => {}
})

type UserContextProviderProps = {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const storageUser = localStorage.getItem('user') || undefined
  const [user, setUser] = React.useState<string | undefined>(storageUser);

  const updateUser = React.useCallback((user: string | undefined) => {
    if (user) {
      localStorage.setItem('user', user)
    } else {
      localStorage.removeItem('user')
    }
    setUser(user)
  }, [])
  return (
    <UserContext.Provider value={{user, setUser: updateUser}}>
      {children}
    </UserContext.Provider>
  );
};