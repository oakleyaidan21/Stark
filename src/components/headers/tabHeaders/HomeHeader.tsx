import { useContext, useState } from 'react';
import SubmissionListingContext from '../../../context/SubmissionListingContext';
import SubList from '../../SubList';
import ConfigHeader from '../ConfigHeader';

const HomeHeader = () => {
  const { subredditName } = useContext(SubmissionListingContext);
  const [showSubList, setShowSubList] = useState(false);

  return (
    <>
      <ConfigHeader
        title={subredditName}
        subtitle={'Filter'}
        onTitlePress={() => setShowSubList(true)}
      />
      <SubList visible={showSubList} setVisible={setShowSubList} />
    </>
  );
};

export default HomeHeader;
