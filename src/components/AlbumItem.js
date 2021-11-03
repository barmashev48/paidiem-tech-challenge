const AlbumItem = ({
  artwork,
  albumName,
  trackCount,
  albumPrice,
  currency,
  explicit,
}) => {
  return (
    <div>
      <img src={artwork} alt={albumName} />
      <p>{albumName}</p>
      <p>{trackCount}</p>
      <p>
        {albumPrice} {currency}
      </p>
      {explicit === "explicit" ? <p>True</p> : <p>False</p>}
    </div>
  );
};

export default AlbumItem;
