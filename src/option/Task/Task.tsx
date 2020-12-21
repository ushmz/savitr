import { MDBBtn } from 'mdbreact';
import React from 'react';
import { Pages } from 'shared/types';
import { PrivacyTaskSearchResult } from '../internal/SearchResult';

type Props = {
  resultPages: {
    title: string;
    url: string;
    snippet: string;
    cookies: string[];
    linkedPages: { title: string; url: string }[];
  }[];
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
};

export const Task: React.FC<Props> = ({ setPage, resultPages }) => {
  return (
    <>
      {resultPages.map((page) => {
        return (
          // eslint-disable-next-line react/jsx-key
          <PrivacyTaskSearchResult
            title={page.title}
            snippet={page.snippet}
            url={page.url}
            cookies={page.cookies}
            linkedPages={page.linkedPages}
          />
        );
      })}
      <MDBBtn color="primary" className="float-left disabled" onClick={() => setPage('PreTask')}>
        「事前アンケート」へ
      </MDBBtn>
      <MDBBtn color="primary" onClick={() => setPage('PostTask')}>
        「事後アンケート」へ
      </MDBBtn>
    </>
  );
};
