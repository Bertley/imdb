import { Card } from "antd";
import React from "react";

const { Meta } = Card;

interface Props {
  title: string;
  backdrop_path: string;
}


const imageUrl = (backdrop_path: string) => `https://image.tmdb.org/t/p/w780/` + backdrop_path;

const MovieCard = ({ title, backdrop_path }: Props) => {
  return (
    <Card
      hoverable
      style={{ width: '100%' }}
      cover={
        <img
          alt={title}
          src={imageUrl(backdrop_path)}
        />
      }
    >
      <Meta title={title} description="www.instagram.com" />
    </Card>
  );
};

export default  MovieCard