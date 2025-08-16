import img from "../../images/no-image-available.jpg";

export default function PersonProfileImage({ person, borderRadius }) {
  return (
    <img
      src={
        person.profile_path
          ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
          : img
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
