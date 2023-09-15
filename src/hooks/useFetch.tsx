import { useQuery } from 'react-query';

interface UseFetchProps {
	queryKey: string | readonly unknown[];
	queryFn: () => void;
}
const useFetch = ({ queryKey, queryFn }: UseFetchProps) => {
	return useQuery(queryKey, queryFn);
};

export default useFetch;
