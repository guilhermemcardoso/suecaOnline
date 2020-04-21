import React from 'react';
import Card from '../Card';
import { ListGroup } from 'react-bootstrap';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import './styles.css';

const MyCards = ({ cards, onSelectCard, show, onShow }) => {

	return (
		<div className={'cardsContainer'}>
			<div className={'myCardsTitleContainer'}>
				<h5 className={'myCardsTitle'}>Minhas Cartas</h5>
				{show && (<MdExpandLess className={'showButton'} size={30} onClick={onShow} />)}
				{!show && (<MdExpandMore className={'showButton'} size={30} onClick={onShow} />)}
			</div>
			{show && cards.length > 0 && (
				<ListGroup horizontal={'sm'} className={'card-list'}>
					{cards.map((card) => {
						return (
							<Card
								key={card}
								data={card}
								onClick={onSelectCard}
							/>
						);
					})}
				</ListGroup>
			)}
			{show && cards.length === 0 && (
				<p className={'emptyCardList'}>Você ainda não possui cartas</p>
			)}
		</div>
	);
};

export default MyCards;
