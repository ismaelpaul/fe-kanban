import Button from '../Button/Button';

const EmptyBoard = () => {
	const buttonClass =
		'bg-purple text-white text-m-heading p-4 rounded-full mx-[6.25rem] tablet:w-[10.875rem] transition ease-in-out duration-300 hover:bg-purple-hover';
	const buttonText = '+ Add New Column';
	return (
		<div className="flex flex-col justify-center items-center h-screen bg-light-bg dark:bg-dark-bg gap-7">
			<h1 className="text-l-heading text-medium-grey text-center mx-8">
				This board is empty. Create a new column to get started.
			</h1>
			<Button buttonText={buttonText} buttonClass={buttonClass} />
		</div>
	);
};

export default EmptyBoard;
