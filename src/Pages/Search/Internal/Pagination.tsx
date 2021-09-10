import React, { Dispatch, SetStateAction } from 'react';
import { MDBIcon, MDBPagination, MDBPageItem, MDBPageNav } from 'mdbreact';
import { createClickLog } from 'shared/apis';
import { TaskInfo } from 'shared/types';
import { getConditionId, getUserId } from 'shared/utils';

type PaginationProps = {
  task: TaskInfo;
  getTimeOnPage: () => number;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
};

export const SerpPagination: React.FC<PaginationProps> = ({ task, offset, setOffset, getTimeOnPage }) => {
  const user = getUserId();
  const condition = getConditionId();
  return (
    <div className="pt-3 pb-5">
      <MDBPagination color="blue">
        <MDBPageItem disabled={offset <= 0}>
          <MDBPageNav
            onClick={() => {
              if (!(offset <= 0)) {
                setOffset(offset - 1);
                createClickLog({
                  taskId: task.id,
                  conditionId: condition,
                  time: getTimeOnPage(),
                  rank: 999,
                  page: offset + 1,
                  user: user,
                  visible: false,
                });
              }
            }}
          >
            <MDBIcon icon="angle-double-left" />
          </MDBPageNav>
        </MDBPageItem>
        {[...Array(10).keys()].map((v, idx) => {
          return (
            <MDBPageItem key={idx} active={offset === v}>
              <MDBPageNav
                onClick={() => {
                  setOffset(v);
                  createClickLog({
                    taskId: task.id,
                    conditionId: condition,
                    time: getTimeOnPage(),
                    rank: 999,
                    page: offset + 1,
                    user: user,
                    visible: false,
                  });
                }}
              >
                {v + 1}
              </MDBPageNav>
            </MDBPageItem>
          );
        })}
        <MDBPageItem disabled={offset >= 9}>
          <MDBPageNav
            onClick={() => {
              if (!(offset >= 9)) {
                setOffset(offset + 1);
                createClickLog({
                  taskId: task.id,
                  conditionId: condition,
                  time: getTimeOnPage(),
                  rank: 999,
                  page: offset + 1,
                  user: user,
                  visible: false,
                });
              }
            }}
          >
            <MDBIcon icon="angle-double-right" />
          </MDBPageNav>
        </MDBPageItem>
      </MDBPagination>
    </div>
  );
};
