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

const useListingSort = (initialType: SortType) => {
  const [sort, setSort] = useState<SortType>(initialType);

  return { sort, setSort };
};

export default useListingSort;
