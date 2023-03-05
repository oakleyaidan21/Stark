import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import SubmissionListingContext from '../../../context/SubmissionListingContext';
import { SortType } from '../../../hooks/useListingSort';
import ScreenProps from '../../../types/ScreenProps';
import ConfigHeader from '../ConfigHeader';

export interface HomeHeaderProps {
  sort: SortType;
  setSort: any;
}

const HomeHeader = ({ sort, setSort }: HomeHeaderProps) => {
  const { subredditName, changeSubreddit } = useContext(
    SubmissionListingContext,
  );
  const navigation = useNavigation<NativeStackNavigationProp<ScreenProps>>();

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
