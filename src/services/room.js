import { firestore } from './firebase';
import firebase from 'firebase/app';

export const ROOM_KEY = '@sueca-room';
export const ADMIN_KEY = '@sueca-is-admin';

export const createRoom = (roomCode, user) => {
	const createdDate = new Date();
	user.cards = [];
	return new Promise((resolve, reject) => {
		firestore
			.collection('rooms')
			.doc(roomCode)
			.set({
				code: roomCode,
				owner: user,
				members: [user],
				status: 'CREATED',
				currentPlayer: null,
				currentCard: null,
				usedCards: [],
				createdAt: createdDate,
				startedAt: null,
			})
			.then(() => {
				localStorage.setItem(ROOM_KEY, roomCode);
				localStorage.setItem(ADMIN_KEY, 'YES');
				resolve();
			})
			.catch((err) => {
				console.log('ERRO AO CRIAR NOVA SALA', err);
				reject(err);
			});
	});
};

export const enterRoom = async (roomCode, user) => {
	user.cards = [];
	return new Promise((resolve, reject) => {
		firestore
			.collection('rooms')
			.doc(roomCode)
			.get()
			.then((doc) => {
				if (!doc.exists) reject();

				const room = doc.data();
				const memberIndex = room.members.findIndex(
					(member) => member.id === user.id
				);
				let isAdmin = 'NO';
				if (room.owner.id === user.id) isAdmin = 'YES';
				if (memberIndex > -1) {
					localStorage.setItem(ROOM_KEY, roomCode);
					localStorage.setItem(ADMIN_KEY, isAdmin);
					resolve();
				} else {
					firestore
						.collection('rooms')
						.doc(roomCode)
						.update({
							members: firebase.firestore.FieldValue.arrayUnion(
								user
							),
						})
						.then((doc) => {
							localStorage.setItem(ROOM_KEY, roomCode);
							localStorage.setItem(ADMIN_KEY, isAdmin);
							resolve();
						})
						.catch((err) => {
							console.log(
								'ERRO AO ADICIONAR USUARIO NA SALA',
								err
							);
							reject(err);
						});
				}
			})
			.catch((err) => {
				console.log('ERRO AO REMOVER USUARIO DA SALA', err);
				reject(err);
			});
	});
};

export const getRoom = () => {
	return localStorage.getItem(ROOM_KEY);
};

export const createRoomListener = (roomCode, callback) => {
	return firestore
		.collection('rooms')
		.doc(roomCode)
		.onSnapshot((doc) => {
			if (doc.exists) {
				callback(doc.data());
			}
		});
};

export const leaveRoom = (roomCode, user) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('rooms')
			.doc(roomCode)
			.update({
				members: firebase.firestore.FieldValue.arrayRemove(user),
			})
			.then(() => {
				localStorage.removeItem(ROOM_KEY);
				localStorage.removeItem(ADMIN_KEY);
				resolve();
			})
			.catch((err) => {
				console.log('ERRO AO REMOVER USUARIO DA SALA', err);
				reject(err);
			});
	});
};

export const kickFromRoom = (roomCode, user) => {
	console.log('ROOM CODE', roomCode);
	console.log('USER', user);
	return new Promise((resolve, reject) => {
		firestore
			.collection('rooms')
			.doc(roomCode)
			.update({
				members: firebase.firestore.FieldValue.arrayRemove(user),
			})
			.then(() => {
				resolve();
			})
			.catch((err) => {
				console.log('ERRO AO REMOVER USUARIO DA SALA', err);
				reject(err);
			});
	});
};

export const wasKicked = () => {
	localStorage.removeItem(ROOM_KEY);
};

export const finishRoom = (room) => {
	return new Promise((resolve, reject) => {});
};
