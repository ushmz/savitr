import React, { Dispatch, SetStateAction } from 'react';
import { MDBIcon, MDBPagination, MDBPageItem, MDBPageNav } from 'mdbreact';

type PaginationProps = {
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
};

export const SerpPagination: React.FC<PaginationProps> = ({ offset, setOffset }) => {
  return (
    <div className="pt-3 pb-5">
      <MDBPagination color="blue">
        <MDBPageItem disabled={offset <= 0}>
          <MDBPageNav onClick={() => setOffset(offset - 1)}>
            <MDBIcon icon="angle-double-left" />
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 0}>
          <MDBPageNav onClick={() => setOffset(0)}>1</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 1}>
          <MDBPageNav onClick={() => setOffset(1)}>2</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 2}>
          <MDBPageNav onClick={() => setOffset(2)}>3</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 3}>
          <MDBPageNav onClick={() => setOffset(3)}>4</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 4}>
          <MDBPageNav onClick={() => setOffset(4)}>5</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 5}>
          <MDBPageNav onClick={() => setOffset(5)}>6</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 6}>
          <MDBPageNav onClick={() => setOffset(6)}>7</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 7}>
          <MDBPageNav onClick={() => setOffset(7)}>8</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 8}>
          <MDBPageNav onClick={() => setOffset(8)}>9</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem disabled={offset >= 8} onClick={() => setOffset(offset + 1)}>
          <MDBPageNav>
            <MDBIcon icon="angle-double-right" />
          </MDBPageNav>
        </MDBPageItem>
      </MDBPagination>
    </div>
  );
};
