export default function PersonProfileImage({ person, borderRadius }) {
  return (
    <img
      src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
      alt={person.name}
      style={{
        maxWidth: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: borderRadius,
      }}
    />
  );
}
