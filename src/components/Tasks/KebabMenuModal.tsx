const KebabMenuModal = () => {
	return (
		<div className="flex flex-col gap-4 pl-4 py-[1.375rem] w-48 bg-white rounded-lg absolute drop-shadow-card right-0">
			<span className="text-l-body text-medium-grey cursor-pointer">
				Edit Task
			</span>
			<span className="text-l-body text-red cursor-pointer">Delete Task</span>
		</div>
	);
};

export default KebabMenuModal;
