import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import React, { Dispatch, SetStateAction } from 'react';

import { createEventLog } from 'shared/apis';
import { TaskInfo } from 'shared/types';
import { getConditionID, getUserID } from 'shared/utils';

type PaginationProps = {
  task: TaskInfo;
  getTimeOnPage: () => number;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
};

export const SerpPagination: React.FC<PaginationProps> = ({ task, offset, setOffset, getTimeOnPage }) => {
  const user = getUserID();
  const condition = getConditionID();

  const WrapedArrowBackIcon: React.FC<PaginationProps> = (props) => (
    <ArrowBackIcon
      onClick={() => {
        if (!(props.offset <= 0)) {
          setOffset(props.offset - 1);
          createEventLog({
            task: props.task.id,
            condition: condition,
            time: props.getTimeOnPage(),
            rank: 0,
            page: props.offset + 1,
            user: user,
            visible: true,
            event: 'paginate',
          });
        }
      }}
    />
  );

  const WrapedArrowForwordIcon: React.FC<PaginationProps> = (props) => (
    <ArrowForwardIcon
      onClick={() => {
        if (!(props.offset >= 9)) {
          setOffset(props.offset + 1);
          createEventLog({
            task: props.task.id,
            condition: condition,
            time: props.getTimeOnPage(),
            rank: 0,
            page: props.offset + 1,
            user: user,
            visible: true,
            event: 'paginate',
          });
        }
      }}
    />
  );

  return (
    <div className="pt-3 pb-5">
      <Pagination
        color="standard"
        count={10}
        page={offset + 1}
        defaultPage={0}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: WrapedArrowBackIcon, next: WrapedArrowForwordIcon }}
            {...item}
            onClick={() => {
              if (!item.page) return;
              setOffset(item.page - 1);
              createEventLog({
                task: task.id,
                condition: condition,
                time: getTimeOnPage(),
                rank: 0,
                page: offset + 1,
                user: user,
                visible: true,
                event: 'paginate',
              });
            }}
          />
        )}
      />
    </div>
  );
};
