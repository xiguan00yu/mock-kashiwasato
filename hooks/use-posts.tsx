import { useState, useEffect } from "react";

const GET_POSTS_LIST = "https://kashiwasato.com/cms/get-posts/?20221130173534";

type TPostImage = {
  "mobile-thumbnail": string;
  "mobile-thumbnail-height": number;
  "mobile-thumbnail-width": number;
};

type TPostCredits = {
  name: string;
  title: string;
};

export type TPost = {
  ID: string;
  title: string;
  acf: {
    images: { image: { sizes: TPostImage } }[];
    mobile_image: { sizes: TPostImage };
    credits: TPostCredits[];
    credits_thumb: TPostCredits[];
  };
};

export default function usePosts() {
  const [data, setData] = useState<TPost[] | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(GET_POSTS_LIST)
      .then((res) => res.text())
      .then((jsonStr) => JSON.parse(jsonStr))
      .then((data: TPost[]) => {
        // so so so so
        // data..filter(
        //     (p) =>
        //     p?.acf?.images[0]?.image?.sizes?.["mobile-thumbnail"] !== null
        // )
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  return {
    loading,
    data,
    error,
  };
}
