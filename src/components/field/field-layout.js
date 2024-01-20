import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, selectCurrentPlayer, selectField } from '../../selectors';
import { currentField, currentStatus, newCurrentPlayer } from '../../actions';
import { checkWin, checkEmptyCell } from '../../utils';
import { STATUS, PLAYER,  PLAYER_SIGN } from '../../constants';
import styles from './field.module.css';

export const FieldLayout = () => {
	const status = useSelector(selectStatus);
	const currentPlayer = useSelector(selectCurrentPlayer);
	const field = useSelector(selectField);

	const dispatch = useDispatch();

	const handleCellClick = (cellIndex) => {
		if (
			status === STATUS.WIN ||
			status === STATUS.DRAW ||
			field[cellIndex] !== PLAYER.NOBODY
		) {
			return;
		}

		const newField = [...field];
		newField[cellIndex] = currentPlayer;
		dispatch(currentField(newField));

		if (checkWin(newField, currentPlayer)) {
			dispatch(currentStatus(STATUS.WIN));
		} else if (checkEmptyCell(newField)) {
			dispatch(
				newCurrentPlayer(
					currentPlayer === PLAYER.CROSS
						? PLAYER.NOUGHT
						: PLAYER.CROSS,
				),
			);
		} else {
			dispatch(currentStatus(STATUS.DRAW));
		}
	};

	return (
		<div className={styles.field}>
			{field.map((cellPlayer, index) => (
				<button
					key={index}
					className={styles.cell}
					onClick={() => handleCellClick(index)}
				>
					{PLAYER_SIGN[cellPlayer]}
				</button>
			))}
		</div>
	);
};
