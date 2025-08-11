import { Box } from "@mui/material";
import { getAssetUrl } from "../routes";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={getAssetUrl(image)}
      />
    </Box>
  );
};

export default UserImage;
