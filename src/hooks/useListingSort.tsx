import { useState } from 'react';

export type SortType =
  | 'Relevance'
  | 'Hot'
  | 'Top'
  | 'New'
  | 'Comments'
  | 'Rising';

export const sortOptions = [
  { label: 'Relevance', icon: 'circle-double' },
  { label: 'Hot', icon: 'fire' },
  { label: 'Top', icon: 'format-vertical-align-top' },
  { label: 'New', icon: 'new-box' },
  { label: 'Comments', icon: 'comment' },
  { label: 'Rising', icon: 'trending-up' },
];

export type TimeSortType = 'All' | 'Year' | 'Month' | 'Week' | 'Day' | 'Hour';

export const timeOptions = ['All', 'Year', 'Month', 'Week', 'Day', 'Hour'];

const useListingSort = (initialType: SortType) => {
  const [sort, setSort] = useState<SortType>(initialType);
  const [timeSort, setTimeSort] = useState<TimeSortType>('All');

  return { sort, setSort, timeSort, setTimeSort };
};

export default useListingSort;
