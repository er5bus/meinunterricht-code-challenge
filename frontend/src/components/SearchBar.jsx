import "./css/searchBar.css";

const SearchBar = ({ onSearchWordChange = (f) => f }) => {
  return (
    <div className="topnav">
      <input
        onChange={(e) => onSearchWordChange(e.currentTarget.value)}
        type="text"
        placeholder="Search.."
      />
    </div>
  );
};

export default SearchBar;
