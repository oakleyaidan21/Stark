import { useState } from 'react';

export type SortType = 'Relevance' | 'Hot' | 'Top' | 'New' | 'Comments';

export const sortOptions = ['Relevance', 'Hot', 'Top', 'New', 'Comments'];

const useListingSort = (initialType: SortType) => {
  const [sort, setSort] = useState<SortType>(initialType);

  return { sort, setSort };
};

export default useListingSort;
