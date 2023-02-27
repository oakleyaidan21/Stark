import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import SubmissionListingContext from '../../../context/SubmissionListingContext';
import { SortType } from '../../../hooks/useListingSort';
import ConfigHeader from '../ConfigHeader';

export interface HomeHeaderProps {
  sort: SortType;
  setSort: any;
}

const HomeHeader = ({ sort, setSort }: HomeHeaderProps) => {
  const { subredditName, changeSubreddit } = useContext(
    SubmissionListingContext,
  );
  const navigation = useNavigation();

  return (
    <>
      <ConfigHeader
        title={subredditName}
        subtitle={sort}
        onTitlePress={() =>
          navigation.navigate('UserSubScreen', {
            changeSubreddit: changeSubreddit,
          })
        }
        onSortOptionPress={setSort}
      />
    </>
  );
};

export default HomeHeader;
