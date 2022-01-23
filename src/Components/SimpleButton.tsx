import ButtonUnstyled, { buttonUnstyledClasses, ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';
import blue from '@mui/material/colors/blue';
import { styled } from '@mui/system';
import React from 'react';

// const ghblue = '#2467e2';

const CustomButtonRoot = styled('button')`
  font-family: sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[600]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[800]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.2), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function SimpleButton(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}
