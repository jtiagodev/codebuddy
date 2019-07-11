import styled from "styled-components";
import { colorPalette } from "../../theme/color-pallete";

export const Title = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Open Sans, Helvetica Neue, Icons16, sans-serif;
  font-weight: bold;
  font-size: 15px;
  color: white;
`;

export const InstallerLink = styled.a`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Open Sans, Helvetica Neue, Icons16, sans-serif;
  font-weight: bold;
  font-size: 23px;
  color: white;
`;

export const ChangeLogText = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Open Sans, Helvetica Neue, Icons16, sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: white;
`;

export const ChangeLogTitle = styled(ChangeLogText)`
  font-weight: bold;
`;

export const ChangeLogMiniText = styled(ChangeLogText)`
  font-size: 10px;
`;
