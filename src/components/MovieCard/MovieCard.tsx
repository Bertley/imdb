import { Button, Card, Avatar, List, Space } from "antd";
import React, { useState } from "react";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";

const { Meta } = Card;

interface Props {
  index: number;
  title: string;
  backdrop_path: string;
  onLikeMovie: (index: number) => void;
  liked: boolean;
  type?: "stacked" | "horizontal";
  description?: string;
  content?: string;
  popularity?: number;
}

const IconText = ({
  icon,
  text,
  onClick
}: {
  icon: typeof StarOutlined | typeof LikeOutlined | typeof MessageOutlined;
  text: string;
  onClick?: () => void;
}) => (
  <Space onClick={onClick}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const imageUrl = (backdrop_path: string) =>
  `https://image.tmdb.org/t/p/w780/` + backdrop_path;

const MovieCard = ({
  index,
  title,
  backdrop_path,
  onLikeMovie,
  liked,
  type,
  description,
  content,
  popularity,
}: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);

  const onClick = () => {
    onLikeMovie(index);
    setIsLiked(!isLiked);
  };

  if (type === "horizontal") {
    return (
      <List.Item
        actions={[
          <IconText
            icon={StarOutlined}
            text={popularity ? popularity.toFixed(2) : "0.00"}
            key="list-vertical-star-o"
          />,
          <IconText
            icon={LikeOutlined}
            text="Liked"
            key="list-vertical-like-o"
            onClick={onClick}
          />,
        ]}
        extra={<img width={272} alt="logo" src={imageUrl(backdrop_path)} />}
      >
        <List.Item.Meta
          avatar={<Avatar src={imageUrl(backdrop_path)} />}
          title={title}
          description={description}
        />
        {content}
      </List.Item>
    );
  }

  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      cover={<img alt={title} src={imageUrl(backdrop_path)} />}
      onClick={onClick}
    >
      <Meta title={title} description="www.instagram.com" />
      <Button type="primary" danger={isLiked}>
        {isLiked ? "Liked" : "Like?"}
      </Button>
    </Card>
  );
};

export default MovieCard;
