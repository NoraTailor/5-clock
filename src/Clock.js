import { useState, useEffect } from 'react';
import { SetTimer } from './SetTimer';
import {
	AiOutlineSync,
	AiOutlinePause,
	AiOutlinePlayCircle,
} from 'react-icons/ai';

const audio = document.getElementById('beep');

const Clock = () => {
	const [breakCount, setBreakCount] = useState(5);
	const [sessionCount, setSessionCount] = useState(25);
	const [clockCount, setClockCount] = useState(25 * 60);
	const [currentTimer, setCurrentTimer] =
		useState('Session');
	const [isPlaying, setIsPlaying] = useState(false);
	const [loop, setLoop] = useState();

	useEffect(() => {
		clearInterval(loop);
		// eslint-disable-next-line
	}, []);

	const handlePlayPause = () => {
		if (isPlaying) {
			clearInterval(loop);
			setIsPlaying(false);
		} else {
			setIsPlaying(true);

			setLoop(
				setInterval(() => {
					if (clockCount === 0) {
						setCurrentTimer(
							currentTimer === 'Session'
								? 'Break'
								: 'Session'
						);
						setClockCount(
							currentTimer === 'Session'
								? breakCount * 60
								: sessionCount * 60
						);
						audio.play();
					} else {
						setClockCount((n) => n - 1);
					}
				}, 1000)
			);
		}
	};

	const handleReset = () => {
		clearInterval(loop);
		audio.pause();
		audio.currentTime = 0;
	};

	const convertToTime = (count) => {
		let minutes = Math.floor(count / 60);
		let seconds = count % 60;

		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		return `${minutes}:${seconds}`;
	};

	const handleLengthChange = (count, timerType) => {
		let newCount;
		if (timerType === 'session') {
			newCount = setSessionCount((n) => n + count);
		} else {
			newCount = setBreakCount((n) => n + count);
		}

		if (newCount > 0 && newCount < 61 && !isPlaying) {
			[`set${timerType}Count`](newCount);
		}

		if (currentTimer.toLowerCase() === timerType) {
			setClockCount(newCount * 60);
		}
	};

	const breakProps = {
		title: 'Break',
		count: breakCount,
		handleDecrease: () => handleLengthChange(-1, 'break'),
		handleIncrease: () => handleLengthChange(1, 'break'),
	};

	const sessionProps = {
		title: 'Session',
		count: sessionCount,
		handleDecrease: () => handleLengthChange(-1, 'session'),
		handleIncrease: () => handleLengthChange(1, 'session'),
	};

	return (
		<div>
			<div className='flex'>
				<SetTimer {...breakProps} />
				<SetTimer {...sessionProps} />
			</div>

			<div className='clock-container'>
				<h1 id='timer-label'>{currentTimer}</h1>
				<span id='time-left'>
					{convertToTime(clockCount)}
				</span>

				<div className='flex'>
					<button id='start_stop' onClick={handlePlayPause}>
						{isPlaying ? (
							<AiOutlinePause />
						) : (
							<AiOutlinePlayCircle />
						)}
					</button>
					<button id='reset' onClick={handleReset}>
						<AiOutlineSync />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Clock;
