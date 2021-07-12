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
        <MDBPageItem active={offset === 0}>
          <MDBPageNav
            onClick={() => {
              setOffset(0);
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
            1
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 1}>
          <MDBPageNav
            onClick={() => {
              setOffset(1);
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
            2
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 2}>
          <MDBPageNav
            onClick={() => {
              setOffset(2);
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
            3
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 3}>
          <MDBPageNav
            onClick={() => {
              setOffset(3);
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
            4
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 4}>
          <MDBPageNav onClick={() => setOffset(4)}>5</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 5}>
          <MDBPageNav
            onClick={() => {
              setOffset(5);
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
            6
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 6}>
          <MDBPageNav
            onClick={() => {
              setOffset(6);
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
            7
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 7}>
          <MDBPageNav
            onClick={() => {
              setOffset(7);
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
            8
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem active={offset === 8}>
          <MDBPageNav
            onClick={() => {
              setOffset(8);
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
            9
          </MDBPageNav>
        </MDBPageItem>
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
