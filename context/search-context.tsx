import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

const context = createContext({
  searchValue: "",
  updateSearchValue: (v: string) => void 0,
});

export const SearchProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [value, setValue] = useState("");
  return (
    <context.Provider
      value={{
        searchValue: value,
        updateSearchValue: setValue as any,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(context);
};
