import { Typography } from "@mui/material";

// https://dev.to/mhmdjaw/an-alternative-to-the-javascript-switch-statement-1kah
const getGender = (genderId: number) => {
  const genderMap: { [key: number]: string } = {
    0: "Not specified",
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };
  const genderLabel = genderMap[genderId] ?? "Unknown";
  return genderLabel;
};

export default function PersonalInfo({ person }) {
  return (
    <>
      <Typography variant="h5" paddingTop={"10px"}>
        {person.name}
      </Typography>
      <Typography variant="body1" paddingTop="10px">
        <strong>Gender</strong>
      </Typography>
      <Typography variant="body1">{getGender(person.gender)}</Typography>
      <Typography variant="body1" paddingTop="10px">
        <strong>Known For</strong>
      </Typography>
      <Typography variant="body1">{person.known_for_department}</Typography>
      <Typography variant="body1" paddingTop="10px">
        <strong>Date of Birth</strong>
      </Typography>
      <Typography variant="body1">{person.birthday}</Typography>
      <Typography variant="body1" paddingTop="10px">
        <strong>Place of Birth</strong>
      </Typography>
      <Typography variant="body1">{person.place_of_birth}</Typography>
      {person.deathday && (
        <>
          <Typography variant="body1" paddingTop="10px">
            <strong>Death Date</strong>
          </Typography>
          <Typography variant="body1">{person.deathday}</Typography>
        </>
      )}
      {person.homepage && (
        <>
          <Typography variant="body1" paddingTop="10px">
            <strong>Website</strong>
          </Typography>
          <Typography variant="body1">
            {/* https://stackoverflow.com/questions/50709625/link-with-target-blank-and-rel-noopener-noreferrer-still-vulnerable */}
            <a href={person.homepage} target="_blank" rel="noopener noreferrer">
              {person.homepage}
            </a>
          </Typography>
        </>
      )}
    </>
  );
}
