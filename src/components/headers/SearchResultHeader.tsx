import ConfigHeader from './ConfigHeader';

export interface SearchResultHeaderProps {
  query: string;
}

const SearchResultHeader = ({ query }: SearchResultHeaderProps) => {
  return (
    <ConfigHeader
      title={`Results for ${query}`}
      subtitle={'Filter'}
      leftIconBehavior="back"
    />
  );
};

export default SearchResultHeader;
