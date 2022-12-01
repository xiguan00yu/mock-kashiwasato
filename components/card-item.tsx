import { FC, useRef } from "react";
import { useRouter } from "next/router";
import { useComponentSize } from "react-use-size";
import { Image } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { TPost } from "../hooks/use-posts";
import AnimationText from "./animation-text";
import styles from "../styles/card-item.module.css";

const CardItem: FC<{ data: TPost }> = ({ data }) => {
  const animationTextRef = useRef<{ onPlay: () => void }>(null);
  const { ref, width } = useComponentSize();
  const router = useRouter();
  const onClick = () => {
    router.push(`/project/${data.ID}`);
  };
  return (
    <div
      className={styles.card}
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => animationTextRef.current?.onPlay()}
    >
      <Image
        style={{ height: width }}
        width={width}
        src={
          "https://kashiwasato.com/" +
          data?.acf?.mobile_image?.sizes?.["mobile-thumbnail"]
        }
        alt={data.title}
        objectFit="cover"
      />
      <AnimationText
        ref={animationTextRef}
        className={styles.title}
        size={15}
        css={{ marginTop: "$10", marginBottom: "$6", fontWeight: 480 }}
      >
        {data.title}
      </AnimationText>
      <div className={styles.desc}>
        {(data?.acf?.credits_thumb || data?.acf?.credits)
          ?.filter((item) => !!item.name && !!item.title)
          ?.slice(0, 4)
          ?.map((item, index) => (
            <Text
              css={{
                color: "$grey999",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              key={item.title + index}
              size={12}
            >
              {`${item.title} : ${item.name}`}
            </Text>
          ))}
        <Text
          css={{
            marginTop: "$10",
            position: "absolute",
            bottom: 0,
            opacity: 0.8,
          }}
        >
          READ MORE +
        </Text>
      </div>
    </div>
  );
};

export default CardItem;
