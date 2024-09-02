import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	let isFirstStep = activeIndex === 0 ? true : false;
	let isLastStep = activeIndex === steps.length - 1 ? true : false;

	const onPrevButtonClick = () => {
		setActiveIndex(activeIndex - 1);
	};

	const onNextButtonClick = () => {
		setActiveIndex(activeIndex + 1);
	};

	const onResetButtonClick = () => {
		setActiveIndex(0);
	};

	const onStepButtonClick = (index) => {
		setActiveIndex(index);
	};

	const setStepStyles = (index) => {
		const isDone = index < activeIndex || index === activeIndex ? styles.done : '';
		const isActive = index === activeIndex ? styles.active : '';
		return `${styles['steps-item']} ${isDone} ${isActive}`;
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, i) => (
							<li key={step.id} className={setStepStyles(i)}>
								<button
									className={styles['steps-item-button']}
									onClick={() => onStepButtonClick(i)}
								>
									{i + 1}
								</button>
								{step.title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onPrevButtonClick}
							disabled={isFirstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={isLastStep ? onResetButtonClick : onNextButtonClick}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
