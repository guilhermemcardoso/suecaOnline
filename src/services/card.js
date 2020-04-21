import { firestore } from './firebase';
import firebase from 'firebase/app';

export const randomCard = () => {
	return Math.floor(Math.random() * 104) + 1;
}

export const takeCard = (room) => {
	const usedCards = room.usedCards;
	let available = false;
	let card;
	while (!available) {
		card = randomCard();
		const index = usedCards.findIndex(cardItem => card === cardItem);
		if (index < 0) available = true;
    }

	const cardRef = getCardRef(card);
	let isUsed = false;
	if (cardRef.ref === CARD.NINE || cardRef.ref === CARD.TEN) isUsed = true;

	const data = {};
    data['currentCard'] = card;
    
	if (isUsed) {
        const currentPlayer = room.currentPlayer;
        const members = room.members
        const playerIndex = room.members.findIndex(member => member.id === currentPlayer.id);
        let playerCards = [];

        if(members[playerIndex].cards)
            playerCards = members[playerIndex].cards;

        playerCards.push(card);
        members[playerIndex].cards = playerCards;

        data['usedCards'] = firebase.firestore.FieldValue.arrayUnion(card);
        data['members'] = members;
    }

	return new Promise((resolve, reject) => {
		firestore
			.collection('rooms')
			.doc(room.code)
			.update(data)
			.then(() => {
				resolve(card);
			})
			.catch((err) => {
				console.log('ERRO AO TIRAR NOVA CARTA', err);
				reject(err);
			});
	});
};

export const getCardRef = (card) => {
	let cardRef = card;
	if (cardRef > 52) cardRef = cardRef - 52;

	switch (cardRef) {
		case 1:
			return {
				uri: require('../assets/images/cards/01.png'),
				ref: CARD.ACE,
				suit: SUIT.SPADES,
			};
		case 2:
			return {
				uri: require('../assets/images/cards/02.png'),
				ref: CARD.TWO,
				suit: SUIT.SPADES,
			};
		case 3:
			return {
				uri: require('../assets/images/cards/03.png'),
				ref: CARD.THREE,
				suit: SUIT.SPADES,
			};
		case 4:
			return {
				uri: require('../assets/images/cards/04.png'),
				ref: CARD.FOUR,
				suit: SUIT.SPADES,
			};
		case 5:
			return {
				uri: require('../assets/images/cards/05.png'),
				ref: CARD.FIVE,
				suit: SUIT.SPADES,
			};
		case 6:
			return {
				uri: require('../assets/images/cards/06.png'),
				ref: CARD.SIX,
				suit: SUIT.SPADES,
			};
		case 7:
			return {
				uri: require('../assets/images/cards/07.png'),
				ref: CARD.SEVEN,
				suit: SUIT.SPADES,
			};
		case 8:
			return {
				uri: require('../assets/images/cards/08.png'),
				ref: CARD.EIGHT,
				suit: SUIT.SPADES,
			};
		case 9:
			return {
				uri: require('../assets/images/cards/09.png'),
				ref: CARD.NINE,
				suit: SUIT.SPADES,
			};
		case 10:
			return {
				uri: require('../assets/images/cards/10.png'),
				ref: CARD.TEN,
				suit: SUIT.SPADES,
			};
		case 11:
			return {
				uri: require('../assets/images/cards/11.png'),
				ref: CARD.JACK,
				suit: SUIT.SPADES,
			};
		case 12:
			return {
				uri: require('../assets/images/cards/12.png'),
				ref: CARD.QUEEN,
				suit: SUIT.SPADES,
			};
		case 13:
			return {
				uri: require('../assets/images/cards/13.png'),
				ref: CARD.KING,
				suit: SUIT.SPADES,
			};
		case 14:
			return {
				uri: require('../assets/images/cards/14.png'),
				ref: CARD.ACE,
				suit: SUIT.HEARTS,
			};
		case 15:
			return {
				uri: require('../assets/images/cards/15.png'),
				ref: CARD.TWO,
				suit: SUIT.HEARTS,
			};
		case 16:
			return {
				uri: require('../assets/images/cards/16.png'),
				ref: CARD.THREE,
				suit: SUIT.HEARTS,
			};
		case 17:
			return {
				uri: require('../assets/images/cards/17.png'),
				ref: CARD.FOUR,
				suit: SUIT.HEARTS,
			};
		case 18:
			return {
				uri: require('../assets/images/cards/18.png'),
				ref: CARD.FIVE,
				suit: SUIT.HEARTS,
			};
		case 19:
			return {
				uri: require('../assets/images/cards/19.png'),
				ref: CARD.SIX,
				suit: SUIT.HEARTS,
			};
		case 20:
			return {
				uri: require('../assets/images/cards/20.png'),
				ref: CARD.SEVEN,
				suit: SUIT.HEARTS,
			};
		case 21:
			return {
				uri: require('../assets/images/cards/21.png'),
				ref: CARD.EIGHT,
				suit: SUIT.HEARTS,
			};
		case 22:
			return {
				uri: require('../assets/images/cards/22.png'),
				ref: CARD.NINE,
				suit: SUIT.HEARTS,
			};
		case 23:
			return {
				uri: require('../assets/images/cards/23.png'),
				ref: CARD.TEN,
				suit: SUIT.HEARTS,
			};
		case 24:
			return {
				uri: require('../assets/images/cards/24.png'),
				ref: CARD.JACK,
				suit: SUIT.HEARTS,
			};
		case 25:
			return {
				uri: require('../assets/images/cards/25.png'),
				ref: CARD.QUEEN,
				suit: SUIT.HEARTS,
			};
		case 26:
			return {
				uri: require('../assets/images/cards/26.png'),
				ref: CARD.KING,
				suit: SUIT.HEARTS,
			};
		case 27:
			return {
				uri: require('../assets/images/cards/27.png'),
				ref: CARD.ACE,
				suit: SUIT.DIAMONDS,
			};
		case 28:
			return {
				uri: require('../assets/images/cards/28.png'),
				ref: CARD.TWO,
				suit: SUIT.DIAMONDS,
			};
		case 29:
			return {
				uri: require('../assets/images/cards/29.png'),
				ref: CARD.THREE,
				suit: SUIT.DIAMONDS,
			};
		case 30:
			return {
				uri: require('../assets/images/cards/30.png'),
				ref: CARD.FOUR,
				suit: SUIT.DIAMONDS,
			};
		case 31:
			return {
				uri: require('../assets/images/cards/31.png'),
				ref: CARD.FIVE,
				suit: SUIT.DIAMONDS,
			};
		case 32:
			return {
				uri: require('../assets/images/cards/32.png'),
				ref: CARD.SIX,
				suit: SUIT.DIAMONDS,
			};
		case 33:
			return {
				uri: require('../assets/images/cards/33.png'),
				ref: CARD.SEVEN,
				suit: SUIT.DIAMONDS,
			};
		case 34:
			return {
				uri: require('../assets/images/cards/34.png'),
				ref: CARD.EIGHT,
				suit: SUIT.DIAMONDS,
			};
		case 35:
			return {
				uri: require('../assets/images/cards/35.png'),
				ref: CARD.NINE,
				suit: SUIT.DIAMONDS,
			};
		case 36:
			return {
				uri: require('../assets/images/cards/36.png'),
				ref: CARD.TEN,
				suit: SUIT.DIAMONDS,
			};
		case 37:
			return {
				uri: require('../assets/images/cards/37.png'),
				ref: CARD.JACK,
				suit: SUIT.DIAMONDS,
			};
		case 38:
			return {
				uri: require('../assets/images/cards/38.png'),
				ref: CARD.QUEEN,
				suit: SUIT.DIAMONDS,
			};
		case 39:
			return {
				uri: require('../assets/images/cards/39.png'),
				ref: CARD.KING,
				suit: SUIT.DIAMONDS,
			};
		case 40:
			return {
				uri: require('../assets/images/cards/40.png'),
				ref: CARD.ACE,
				suit: SUIT.CLUBS,
			};
		case 41:
			return {
				uri: require('../assets/images/cards/41.png'),
				ref: CARD.TWO,
				suit: SUIT.CLUBS,
			};
		case 42:
			return {
				uri: require('../assets/images/cards/42.png'),
				ref: CARD.THREE,
				suit: SUIT.CLUBS,
			};
		case 43:
			return {
				uri: require('../assets/images/cards/43.png'),
				ref: CARD.FOUR,
				suit: SUIT.CLUBS,
			};
		case 44:
			return {
				uri: require('../assets/images/cards/44.png'),
				ref: CARD.FIVE,
				suit: SUIT.CLUBS,
			};
		case 45:
			return {
				uri: require('../assets/images/cards/45.png'),
				ref: CARD.SIX,
				suit: SUIT.CLUBS,
			};
		case 46:
			return {
				uri: require('../assets/images/cards/46.png'),
				ref: CARD.SEVEN,
				suit: SUIT.CLUBS,
			};
		case 47:
			return {
				uri: require('../assets/images/cards/47.png'),
				ref: CARD.EIGHT,
				suit: SUIT.CLUBS,
			};
		case 48:
			return {
				uri: require('../assets/images/cards/48.png'),
				ref: CARD.NINE,
				suit: SUIT.CLUBS,
			};
		case 49:
			return {
				uri: require('../assets/images/cards/49.png'),
				ref: CARD.TEN,
				suit: SUIT.CLUBS,
			};
		case 50:
			return {
				uri: require('../assets/images/cards/50.png'),
				ref: CARD.JACK,
				suit: SUIT.CLUBS,
			};
		case 51:
			return {
				uri: require('../assets/images/cards/51.png'),
				ref: CARD.QUEEN,
				suit: SUIT.CLUBS,
			};
		case 52:
			return {
				uri: require('../assets/images/cards/52.png'),
				ref: CARD.KING,
				suit: SUIT.CLUBS,
			};
		default:
			return;
	}
};

const SUIT = {
	CLUBS: 'CLUBS',
	HEARTS: 'HEARTS',
	SPADES: 'SPADES',
	DIAMONDS: 'DIAMONDS',
};

const CARD = {
	ACE: 'ACE',
	TWO: 'TWO',
	THREE: 'THREE',
	FOUR: 'FOUR',
	FIVE: 'FIVE',
	SIX: 'SIX',
	SEVEN: 'SEVEN',
	EIGHT: 'EIGHT',
	NINE: 'NINE',
	TEN: 'TEN',
	JACK: 'JACK',
	QUEEN: 'QUEEN',
	KING: 'KING',
};
