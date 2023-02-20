import { useContext, useState } from 'react';
import SubmissionListingContext from '../../../context/SubmissionListingContext';
import { SortType } from '../../../hooks/useListingSort';
import SubList from '../../SubList';
import ConfigHeader from '../ConfigHeader';

export interface HomeHeaderProps {
  sort: SortType;
  setSort: any;
}

const HomeHeader = ({ sort, setSort }: HomeHeaderProps) => {
  const { subredditName } = useContext(SubmissionListingContext);
  const [showSubList, setShowSubList] = useState(false);

  return (
    <>
      <ConfigHeader
        title={subredditName}
        subtitle={sort}
        onTitlePress={() => setShowSubList(true)}
      />
      <SubList visible={showSubList} setVisible={setShowSubList} />
    </>
  );
};

export default HomeHeader;
