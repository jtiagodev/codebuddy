import styled from "styled-components";
import {
  space,
  color,
  width,
  fontSize,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  flex,
  order,
  alignSelf,
  height,
  maxWidth
} from "styled-system";

export const Box = styled("div")(
  {
    boxSizing: "border-box"
  },
  space,
  color,
  width,
  height,
  fontSize,
  flex,
  order,
  alignSelf
);

Box.displayName = "Box";

Box.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...width.propTypes,
  ...fontSize.propTypes
};

export const Flex = styled(Box)(
  {
    display: "flex"
  },
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  height,
  maxWidth
);

Flex.displayName = "Flex";

Flex.propTypes = {
  ...flexWrap.propTypes,
  ...flexDirection.propTypes,
  ...alignItems.propTypes,
  ...justifyContent.propTypes
};

export const Spacer = styled.div`
  height: 10px;
`;
