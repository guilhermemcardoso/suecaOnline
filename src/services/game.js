import { firestore } from './firebase';

export const startGame = (roomCode) => {
	const startDate = new Date();
	return new Promise((resolve, reject) => {
		firestore
			.collection('rooms')
			.doc(roomCode)
			.update({
				status: 'RUNNING',
				startedAt: startDate
			})
			.then(async () => {
                await nextPlayer(null, roomCode);
				resolve();
			})
			.catch((err) => {
				console.log('ERRO AO INICIAR JOGO', err);
				reject(err);
			});
	});
};

export const finishGame = (roomCode) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('rooms')
			.doc(roomCode)
			.update({
				status: 'FINISHED',
			})
			.then(() => {
				resolve();
			})
			.catch((err) => {
				console.log('ERRO AO FINALIZAR JOGO', err);
				reject(err);
			});
	});
};

export const nextPlayer = async (currentPlayer, roomCode) => {
    let room;
	try {
        const result = await firestore.collection('rooms').doc(roomCode).get();
        room = result.data();
	} catch (err) {
        room = null;
    }

    return new Promise((resolve, reject) => {
        if(!room) reject();
        const members = room.members.sort((a, b) => {
             if(a.name < b.name) return -1;
             return 1;
        });

        const currentPlayerIndex = currentPlayer ? members.findIndex(member => member.id === currentPlayer.id) : -1;
        let nextPlayerIndex = 0;
        
        if(currentPlayerIndex >= 0 && currentPlayerIndex < members.length - 1) nextPlayerIndex = currentPlayerIndex + 1;
        const nextPlayer = members[nextPlayerIndex];

        firestore
			.collection('rooms')
			.doc(roomCode)
			.update({
				currentPlayer: nextPlayer,
				currentCard: null
			})
			.then(() => {
				resolve();
			})
			.catch((err) => {
				console.log('ERRO AO ATUALIZAR JOGADOR ATUAL', err);
				reject(err);
			});
	});
};

export const updateCurrentCard = async (card, roomCode) => {

    return new Promise((resolve, reject) => {
        
        firestore
			.collection('rooms')
			.doc(roomCode)
			.update({
				currentCard: card
			})
			.then(() => {
                console.log('CARTA ATUAL', card);
				resolve();
			})
			.catch((err) => {
				console.log('ERRO AO ATUALIZAR CARTA ATUAL', err);
				reject(err);
			});
	});
};