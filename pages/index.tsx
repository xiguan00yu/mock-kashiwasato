import AnimationText from "../components/animation-text";
import CardList from "../components/card-list";
import { useSearchContext } from "../context/search-context";
import usePosts from "../hooks/use-posts";

export default function Home() {
  const { searchValue } = useSearchContext();
  const { loading, data, error } = usePosts();
  if (loading) return <AnimationText>NOW LOADING...</AnimationText>;

  if (error || !data) return "FETCH POST GET SOME ERROR...";

  const filtedData =
    searchValue?.length > 0
      ? data.filter(
          (item) =>
            item.title.search(new RegExp(searchValue, "i")) !== -1 ||
            item.acf?.credits_thumb?.some?.(
              (item) => item.name.search(new RegExp(searchValue, "i")) !== -1
            ) ||
            item.acf?.credits?.some?.(
              (item) => item.name.search(new RegExp(searchValue, "i")) !== -1
            )
        )
      : data;

  return <CardList list={filtedData} />;
}
