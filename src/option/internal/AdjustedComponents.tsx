import styled from 'styled-components';

/*****************************************
 * Container components
 *****************************************/

/**
 * Root component of search results.
 * Adjust position and size here.
 */
export const SearchContainer = styled.div`
  width: 720px;
  margin-left: 30px;
  padding-top: 60px;
  padding-bottom: 20px;
`;

/**
 * Root component for centralizing child elements.
 * Adjust position and size here.
 */
export const RootContainer = styled.div`
  width: 720px;
  margin: auto;
  padding-top: 20px;
  padding-bottom: 20px;
`;

/**
 * Parent compnent for search bar in header.
 * Adjust position and size here.
 */
export const SearchBarContainer = styled.div`
  width: 480px;
`;

/**
 * Parent compnent for search bar icons in header.
 * Used only to make child elements arrange side by side and centralize.
 */
export const Inlinediv = styled.div`
  display: flex;
  align-items: center;
`;

/**
 * Parent compnent for search bar icons in header.
 * Used only for adjusting position and size.
 */
export const Moveddiv = styled.div`
  margin-left: -75px;
`;

/*****************************************
 * Text components
 *****************************************/

/**
 * Colored text like Google search results' URL text.
 */
export const HyperLinkText = styled.p`
  color: #339d39;
`;

/**
 * Colored text like Google search results' title text.
 * Adjust position and size here.
 */
export const TitleText = styled.p`
  color: #3132a9;
  font-weight: bold;
  font-size: 20px;
`;

/**
 * Colored text like Google search results' URL text.
 * This is asjusted for SERP(`SearchResult.tsx`) usage.
 * Expecting margin property, this is same to `HyperLinkText`.
 */
export const URLText = styled.p`
  color: #339d39;
  margin-bottom: 3px;
`;

/**
 * Colored text for warning messages.
 * Adjust position and size here.
 */
export const WarningText = styled.p`
  background: #ff9999;
  font-size: 20px;
`;

/**
 * Texts for my proposal in custom SERP page.
 * Adjust position and size here.
 */
export const LinkedPageText = styled.p`
  font-size: 18px;
`;
