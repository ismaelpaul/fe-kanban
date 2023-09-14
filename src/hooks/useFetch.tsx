import { useQuery } from 'react-query';

interface UseFetchProps {
	queryKey: string;
	queryFn: () => void;
}
const useFetch = ({ queryKey, queryFn }: UseFetchProps) => {
	return useQuery(queryKey, queryFn);
};

export default useFetch;
