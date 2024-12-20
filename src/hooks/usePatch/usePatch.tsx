import { useMutation } from '@tanstack/react-query';

interface PatchProps {
	patchFn: (resourceId: number, updatedData: object) => Promise<void>;
	resourceId: number;
	updatedData: object;
	queryKey: string;
}

const usePatch = () => {
	const patchMutation = useMutation<void, Error, PatchProps>(
		async ({ patchFn, resourceId, updatedData }) => {
			return patchFn(resourceId, updatedData);
		}
	);

	const patch = async ({
		patchFn,
		resourceId,
		updatedData,
		queryKey,
	}: PatchProps): Promise<void> => {
		try {
			const response = await patchMutation.mutateAsync({
				patchFn,
				resourceId,
				updatedData,
				queryKey,
			});
			return response;
		} catch (error) {
			console.log(error, '<<<< error use patch');
			throw error;
		}
	};

	return {
		patch,
		isLoading: patchMutation.isLoading,
	};
};

export { usePatch };
