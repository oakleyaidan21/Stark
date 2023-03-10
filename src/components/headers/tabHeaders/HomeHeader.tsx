import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import SubmissionListingContext from '../../../context/SubmissionListingContext';
import { SortType, TimeSortType } from '../../../hooks/useListingSort';
import ScreenProps from '../../../types/ScreenProps';
import ConfigHeader from '../ConfigHeader';

export interface HomeHeaderProps {
  sort: SortType;
  setSort: any;
  timeSort: TimeSortType;
  setTimeSort: any;
}

const HomeHeader = ({
  sort,
  setSort,
  timeSort,
  setTimeSort,
}: HomeHeaderProps) => {
  const { subredditName, changeSubreddit } = useContext(
    SubmissionListingContext,
  );
  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

  return (
    <>
      <ConfigHeader
        title={subredditName}
        subtitle={sort === 'Top' ? sort + ' | ' + timeSort : sort}
        onTitlePress={() =>
          navigation.navigate('UserSubScreen', {
            changeSubreddit: changeSubreddit,
          })
        }
        onSortOptionPress={setSort}
        onTimeOptionPress={setTimeSort}
      />
    </>
  );
};

export default HomeHeader;
