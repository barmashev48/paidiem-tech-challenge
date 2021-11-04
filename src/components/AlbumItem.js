const AlbumItem = ({
  artwork,
  albumName,
  trackCount,
  albumPrice,
  currency,
  explicit,
  albumLink,
}) => {
  return (
    <div className="album-item">
      <img src={artwork} alt={albumName} />
      <a
        href={albumLink}
        className="album-name"
        target="_blank"
        rel="noreferrer"
      >
        {albumName}
      </a>
      <p className="track-count">
        <span className="mobile-only">Track Count: </span>

        {trackCount}
      </p>
      <p className="price">
        <span className="mobile-only">Price: </span>
        {albumPrice} {currency}
      </p>
      {explicit === "explicit" ? (
        <p className="explicit">
          <span className="mobile-only">Explicit: </span>
          True
        </p>
      ) : (
        <p className="explicit">
          <span className="mobile-only">Explicit: </span>
          False
        </p>
      )}
    </div>
  );
};

export default AlbumItem;
