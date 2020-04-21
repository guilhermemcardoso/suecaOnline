import { auth, firestore } from './firebase';

export const TOKEN_KEY = '@sueca-auth';
export const ADMIN_KEY = '@sueca-is-admin';

export const isAuthenticated = () => {
	return localStorage.getItem(TOKEN_KEY) !== null;
};

export const getCurrentUser = () => {
	const stringUSer = localStorage.getItem(TOKEN_KEY);
	if(stringUSer) {
		return JSON.parse(stringUSer);
	}

	return null;
};

export const isAdmin = () => {
	const stringAdmin = localStorage.getItem(ADMIN_KEY);
	if(stringAdmin === 'YES') {
		return true;
	}

	return false;
};

export const login = (email, password) => {
	return new Promise((resolve, reject) => {
		auth.signInWithEmailAndPassword(email, password)
			.then(({ user }) => {
				firestore
					.collection('users')
					.doc(user.uid)
					.get()
					.then(doc => {
						if(doc.exists) {
							const userItem = doc.data();
							localStorage.setItem(TOKEN_KEY, JSON.stringify(userItem));
							resolve(userItem);
						} else {
							reject();
						}
					})
					.catch((err) => {
						console.log(
							'ERRO AO BUSCAR USUARIO NO BANCO DE DADOS',
							err
						);
						reject(err);
					});
			})
			.catch((err) => {
				console.log('ERRO AO REALIZAR LOGIN', err);
				reject(err);
			});
	});
};

export const register = (email, password, name) => {
	return new Promise((resolve, reject) => {
		auth.createUserWithEmailAndPassword(email, password)
			.then(({ user }) => {
				firestore
					.collection('users')
					.doc(user.uid)
					.set({
						id: user.uid,
						name: name,
						email: email,
					})
					.then((res) => {
						auth.signOut()
							.then(() => {
								resolve();
							})
							.catch((err) => {
								reject(err);
							});
					})
					.catch((err) => {
						console.log(
							'ERRO AO SALVAR USUARIO NO BANCO DE DADOS',
							err
						);
						reject(err);
					});
			})
			.catch((err) => {
				console.log('ERRO AO CRIAR USUARIO', err);
				reject(err);
			});
	});
};

export const logout = async () => {
	return await auth.signOut();
};
