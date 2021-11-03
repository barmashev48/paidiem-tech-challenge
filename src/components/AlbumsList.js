import React from "react";
import AlbumItem from "./AlbumItem";
import { useSelector } from "react-redux";

const AlbumsList = () => {
  const albumsList = useSelector((state) => state.albumsReducer.items);
  const artistName = useSelector((state) => state.albumsReducer.artistName);
  const artistLink = useSelector((state) => state.albumsReducer.artistLink);

  console.log(albumsList);
  return (
    <div className="albums-list">
      <a href={artistLink} target="_blank">
        <h2>{artistName}</h2>
      </a>
      {albumsList.length > 0 && (
        <div className="legend">
          <p className="legend-artwork">Artwork</p>
          <p className="legend-album-name">Album Name</p>
          <p className="legend-track-count">Track Count</p>
          <p className="legend-price">Price</p>
          <p className="legend-explicit">Explicit</p>
        </div>
      )}

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
            albumLink={el.albumLink}
          />
        );
      })}
    </div>
  );
};

export default AlbumsList;
