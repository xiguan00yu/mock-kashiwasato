import styles from "../styles/search-input.module.css";
import { useSearchContext } from "../context/search-context";

export default function SearchInput() {
  const { updateSearchValue } = useSearchContext();
  return (
    <div className={styles.search}>
      <input
        onChange={(event) => updateSearchValue(event.target.value || "")}
        placeholder="PLEASE INPUT KEYWORD"
        className={styles.input}
      />
      <div className={styles.button}></div>
    </div>
  );
}
