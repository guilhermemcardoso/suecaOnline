import React from 'react';
import { getCardRef } from '../../services/card';
import './styles.css';

const Card = ({ data, onClick }) => {
	const cardRef = getCardRef(data);

	return (
			<img
				className={'card'}
				onClick={() => onClick(data)}
				src={cardRef.uri}
				alt={`${cardRef.ref} of ${cardRef.suit}`}
			/>
		
	);
};

export default Card;
