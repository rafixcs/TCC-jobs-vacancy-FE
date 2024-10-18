function Button({ text, disabled, onClick }) {
	const handleClick = () => {
		if (!disabled) {
			onClick();
		}
	};

	return (
		<button
			type='button'
			className={`border mb-2 w-full bg-gradient-to-br from-blue-500 to-black text-white py-2 px-4 rounded hover:bg-blue-600 ${
				disabled ? "opacity-50 cursor-not-allowed" : ""
			}`}
			onClick={handleClick}
			disabled={disabled}
		>
			{text}
		</button>
	);
}

export default Button;
