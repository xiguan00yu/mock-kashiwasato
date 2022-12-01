import styles from "../styles/fix-search-input.module.css";
import { useSearchContext } from "../context/search-context";
import { useRef } from "react";

export default function FixSearchInput({
  onSearch,
}: {
  onSearch: (str: String) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const { updateSearchValue } = useSearchContext();

  const onClick = () => {
    const newValue = ref.current?.value || "";
    updateSearchValue(newValue);
    onSearch && onSearch(newValue);
  };

  return (
    <div className={styles.search}>
      <input
        ref={ref}
        placeholder="PLEASE INPUT KEYWORD"
        className={styles.input}
      />
      <div className={styles.button} onClick={onClick}>
        SEARCH
      </div>
    </div>
  );
}
