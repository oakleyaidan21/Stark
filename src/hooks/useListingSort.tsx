import { useState } from 'react';

export type SortType =
  | 'Relevance'
  | 'Hot'
  | 'Top'
  | 'New'
  | 'Comments'
  | 'Rising';

export const sortOptions = [
  'Relevance',
  'Hot',
  'Top',
  'New',
  'Comments',
  'Rising',
];

export type TimeSortType = 'All' | 'Year' | 'Month' | 'Week' | 'Day' | 'Hour';

export const timeOptions = ['All', 'Year', 'Month', 'Week', 'Day', 'Hour'];

const useListingSort = (initialType: SortType) => {
  const [sort, setSort] = useState<SortType>(initialType);
  const [timeSort, setTimeSort] = useState<TimeSortType>('All');

  return { sort, setSort, timeSort, setTimeSort };
};

export default useListingSort;
