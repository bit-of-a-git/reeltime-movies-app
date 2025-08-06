import React from "react";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import SortIcon from "@mui/icons-material/Sort";

const styles = {
  root: {
    maxWidth: 345,
  },

  formControl: {
    margin: 1,
    minWidth: 220,
  },
};

interface SortCardProps {
  onSortChange: (sortOption: string) => void;
  sortOption: string;
}

const SortCard: React.FC<SortCardProps> = ({ onSortChange, sortOption }) => {
  const handleSortChange = (e: SelectChangeEvent) => {
    onSortChange(e.target.value);
  };

  return (
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography
          variant="h5"
          component="h1"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <SortIcon fontSize="large" />
          Sort
        </Typography>

        <FormControl sx={styles.formControl}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            label="Sort By"
            id="sort-select"
            value={sortOption}
            onChange={handleSortChange}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default SortCard;
