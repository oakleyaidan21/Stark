import ConfigHeader from './ConfigHeader';

export interface SearchResultHeaderProps {
  query: string;
}

const SearchResultHeader = ({ query }: SearchResultHeaderProps) => {
  return (
    <ConfigHeader title={`Results for ${query}`} leftIconBehavior="back" />
  );
};

export default SearchResultHeader;
