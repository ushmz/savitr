import React, { Dispatch, SetStateAction } from 'react';
import { MDBIcon, MDBPagination, MDBPageItem, MDBPageNav } from 'mdbreact';
import { createClickLog, TaskInfo } from '../../../shared/apis/apis';
import { getUserId } from '../../../shared/util';

type PaginationProps = {
  task: TaskInfo;
  getTimeOnPage: () => number;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
};

export const SerpPagination: React.FC<PaginationProps> = ({ task, offset, setOffset, getTimeOnPage }) => {
  const user = getUserId();
  return (
    <div className="pt-3 pb-5">
      <MDBPagination color="blue">
        <MDBPageItem disabled={offset <= 0}>
          <MDBPageNav
            onClick={() => {
              setOffset(offset - 1);
              createClickLog({
                taskId: task.id,
                conditionId: task.conditionId,
                time: getTimeOnPage(),
                rank: 999,
                page: offset,
                user: user,
                visible: false,
              });
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
                    conditionId: task.conditionId,
                    time: getTimeOnPage(),
                    rank: 999,
                    page: offset,
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
        <MDBPageItem
          disabled={offset >= 8}
          onClick={() => {
            setOffset(offset + 1);
            createClickLog({
              taskId: task.id,
              conditionId: task.conditionId,
              time: getTimeOnPage(),
              rank: 999,
              page: offset,
              user: user,
              visible: false,
            });
          }}
        >
          <MDBPageNav>
            <MDBIcon icon="angle-double-right" />
          </MDBPageNav>
        </MDBPageItem>
      </MDBPagination>
    </div>
  );
};
