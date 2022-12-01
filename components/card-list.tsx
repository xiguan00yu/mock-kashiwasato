import { FC } from "react";
import { Grid } from "@nextui-org/react";
import CardItem from "./card-item";

import { TPost } from "../hooks/use-posts";

const CardList: FC<{ list: TPost[] }> = ({ list }) => {
  console.log(list[0])
  return (
    <Grid.Container
      css={{
        margin: "0 -36px",
      }}
      gap={4}
      justify="flex-start"
    >
      {list.map((item) => (
        <Grid
          key={item.ID}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          css={{
            "@xl": {
              maxWidth: "20% !important",
              flexBasis: "20% !important",
            },
          }}
        >
          <CardItem data={item} />
        </Grid>
      ))}
    </Grid.Container>
  );
};

export default CardList;
