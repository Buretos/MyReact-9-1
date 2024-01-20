import { useDispatch } from 'react-redux';
import { restartGame } from './actions';
import { Field, Information } from './components';
import styles from './game.module.css';

export const GameLayout = () => {
	const dispatch = useDispatch();

	const handleRestart = () => {
		dispatch(restartGame());
	};

	return (
		<div className={styles.game}>
			<Information />
			<Field />
			<button className={styles.restartButton} onClick={handleRestart}>
				Начать заново
			</button>
		</div>
	);
}
