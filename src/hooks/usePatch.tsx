import { useMutation } from '@tanstack/react-query';

interface PatchProps {
	patchFn: (resourceId: number, updatedData: object) => Promise<void>;
	resourceId: number;
	updatedData: object;
	queryKey: string;
}
const usePatch = () => {
	const patchMutation = useMutation(
		async ({ patchFn, resourceId, updatedData }: PatchProps) => {
			return patchFn(resourceId, updatedData);
		}
	);

	const patch = async ({
		patchFn,
		resourceId,
		updatedData,
		queryKey,
	}: PatchProps) => {
		try {
			await patchMutation.mutateAsync({
				patchFn,
				resourceId,
				updatedData,
				queryKey,
			});
		} catch (error) {
			console.log(error, '<<<< error use patch');
		}
	};

	return {
		patch,
		isLoading: patchMutation.isLoading,
	};
};

export default usePatch;
