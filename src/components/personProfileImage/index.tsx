export default function PersonProfileImage({ person, borderRadius }) {
  return (
    <img
      src={
        person.profile_path
          ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
          : "/no-image-available.jpg"
      }
      alt={person.name}
      style={{
        maxWidth: "100%",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: borderRadius,
      }}
    />
  );
}
