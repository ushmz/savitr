import styled from 'styled-components';

/*****************************************
 * Container components
 *****************************************/

/**
 * Root component of search results.
 * Adjust position and size here.
 */
export const SearchResultContainer = styled.div`
  width: 720px;
`;

/**
 * Root component for centralizing child elements.
 * Adjust position and size here.
 */
export const RootContainer = styled.div`
  padding-top: 60px;
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
 * Recieve font size as prop, return text element as <p>
 */
export const SizedText = styled.p<{ size: string }>`
  font-size: ${(props) => props.size};
`;

/**
 * Colored text like Google search results' URL text.
 */
export const HyperLinkText = styled(SizedText)`
  color: #339d39;
`;

/**
 * Colored text like Google search results' title text.
 * Adjust position and size here.
 */
export const TitleText = styled(SizedText)`
  color: #3132a9;
  font-weight: bold;
`;

/**
 * Colored text like Google search results' URL text.
 * This is asjusted for SERP(`SearchResult.tsx`) usage.
 * Expecting margin property, this is same to `HyperLinkText`.
 */

export const URLText = styled(SizedText)`
  color: #339d39;
  margin-bottom: 3px;
`;

/**
 * Colored text for warning messages.
 * Adjust position and size here.
 */
export const WarningText = styled(SizedText)`
  background: #ff9999;
`;

/**
 * Texts for my proposal in custom SERP page.
 * Adjust position and size here.
 */
export const LinkedPageText = styled.p`
  font-size: 18px;
`;
