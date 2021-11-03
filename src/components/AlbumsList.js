import React from "react";
import AlbumItem from "./AlbumItem";
import { useSelector } from "react-redux";

const AlbumsList = () => {
  const albumsList = useSelector((state) => state.albumsReducer.items);
  const artistName = useSelector((state) => state.albumsReducer.artistName);
  const artistLink = useSelector((state) => state.albumsReducer.artistLink);

  console.log(albumsList);
  return (
    <div>
      <a href={artistLink} target="_blank">
        <h2>{artistName}</h2>
      </a>
      {albumsList.map((el, index) => {
        return (
          <AlbumItem
            key={el.id}
            artwork={el.artwork}
            albumName={el.albumName}
            trackCount={el.trackCount}
            albumPrice={el.albumPrice}
            currency={el.currency}
            explicit={el.explicit}
          />
        );
      })}
    </div>
  );
};

export default AlbumsList;
