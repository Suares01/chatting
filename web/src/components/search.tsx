import { alpha, styled } from "@mui/material/styles";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const SearchMain = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#aebac1", 0.15),
  "&:hover": {
    backgroundColor: alpha("#aebac1", 0.25),
  },
  margin: theme.spacing(1),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export type SearchProps = InputBaseProps;

export default function Search(props: SearchProps) {
  return (
    <SearchMain>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: "#aebac1" }} />
      </SearchIconWrapper>
      <StyledInputBase {...props} inputProps={{ "aria-label": "search" }} />
    </SearchMain>
  );
}
