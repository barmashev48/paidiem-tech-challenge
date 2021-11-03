const AlbumItem = ({ artistName, albumName, albumPrice, currency }) => {
  return (
    <div>
      <p>{artistName}</p>
      <p>{albumName}</p>
      <p>{albumPrice}</p>
      <p>{currency}</p>
    </div>
  );
};

export default AlbumItem;
