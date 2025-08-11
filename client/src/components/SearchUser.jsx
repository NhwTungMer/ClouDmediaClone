import { useState, useEffect, useRef } from "react";
import {
  Box,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Search, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { URL_USER_SEARCH, getAssetUrl } from "../routes";
import FlexBetween from "./FlexBetween";

const SearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const theme = useTheme();

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search users function
  const searchUsers = async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(URL_USER_SEARCH(query.trim()), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setShowResults(true);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching users:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      searchUsers(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  // Handle user click
  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
    setShowResults(false);
    setSearchQuery("");
  };

  return (
    <Box ref={searchRef} position="relative">
      <FlexBetween
        backgroundColor={theme.palette.neutral.light}
        borderRadius="9px"
        gap="3rem"
        padding="0.1rem 1.5rem"
      >
        <InputBase
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: "100%" }}
        />
        <IconButton>
          {isLoading ? (
            <CircularProgress size={20} />
          ) : (
            <Search />
          )}
        </IconButton>
      </FlexBetween>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: "300px",
            overflow: "auto",
            mt: 1,
          }}
        >
          <List>
            {searchResults.map((user) => (
              <ListItem
                key={user._id}
                button
                onClick={() => handleUserClick(user._id)}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.neutral.light,
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={user.picturePath ? getAssetUrl(user.picturePath) : undefined}
                    sx={{ width: 40, height: 40 }}
                  >
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.firstName} ${user.lastName}`}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {user.occupation}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.location}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* No Results Message */}
      {showResults && searchQuery.length >= 2 && searchResults.length === 0 && !isLoading && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 1,
            p: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No users found
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SearchUser;
