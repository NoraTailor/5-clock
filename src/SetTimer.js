import {
	AiOutlinePlus,
	AiOutlineMinus,
} from 'react-icons/ai';

export const SetTimer = (props) => {
	const id = props.title.toLowerCase();

	return (
		<div className='timer-container'>
			<h2 id={`${id}-label`}>{props.title} Length</h2>
			<div className='flex actions-wrapper'>
				<button
					id={`${id}-decrement`}
					onClick={props.handleDecrease}>
					<AiOutlineMinus />
				</button>

				<span id={`${id}-length`}>{props.count}</span>

				<button
					id={`${id}-increment`}
					onClick={props.handleIncrease}>
					<AiOutlinePlus />
				</button>
			</div>
		</div>
	);
};
