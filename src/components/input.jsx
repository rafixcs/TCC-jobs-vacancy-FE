import "../output.css"

function Input({ label, type, value, onChange }) {
	return (
		<div className='flex flex-col items-center w-full'>
			<label className='mb-2 ml-8 self-start pr-2'>{label}</label>
			<input
				type={type}
				value={value}
				onChange={onChange}
				className='border px-8 py-2 mb-4 w-full'
			/>
		</div>
	);
}

export default Input;
