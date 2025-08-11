import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { URL_ASSET_INFO4 } from "../../routes";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={URL_ASSET_INFO4}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>tungdevvv17</Typography>
        <Typography color={medium}>tungdevv17.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        contact me to sp ads.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
