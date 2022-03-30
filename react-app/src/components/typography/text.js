import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;
const captionInverted = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.text.inverse};
`;
const formLabel = (theme) => `
    font-size: ${theme.fontSizes.caption};
    color:#8F9CB4;
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;
const labelTitle = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.bold};

`;

const title = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.title};
    font-weight: ${theme.fontWeights.bold};
`;
const coordinates = (theme) => `
    font-family: ${theme.fonts.monoSpace};
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.medium};
`;
const detailTitle = (theme) => `
font-family: ${theme.fonts.heading};
font-size: ${theme.fontSizes.title};
font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.text.inverse};
`;
const descriptionTitle = (theme) => `
font-family: ${theme.fonts.heading};
font-size: 18px;
font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.text.disabled};
`;
const infoCardTitle = (theme) => `
font-family: ${theme.fonts.heading};
font-size: ${theme.fontSizes.title};
font-weight: ${theme.fontWeights.bold};
color: ${theme.colors.text.disabled};
`;
const variants = {
  labelTitle,
  detailTitle,
  descriptionTitle,
  infoCardTitle,
  body,
  title,
  label,
  caption,
  captionInverted,
  error,
  hint,
  coordinates,
  formLabel,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
