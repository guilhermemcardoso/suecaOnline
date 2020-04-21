import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.css';

const ConfirmationModal = ({ title, text, onConfirm, onCancel, show }) => {
	return (
		<div hidden={!show} className={'toastModal'}>
			<div className={'confirmationContainer'}>
				<div className={'confirmationTitleContainer'}>
					<h5 className={'confirmationTitle'}>{title}</h5>
				</div>
				<p>{text}</p>
				<div className={'confirmationBodyContainer'}>
					<Button
                        variant={'secondary'}
						size='lg'
						className={'turnButton'}
						onClick={() => onCancel()}
					>
						Cancelar
					</Button>
					<Button
                        variant={'danger'}
						size='lg'
						className={'turnButton'}
						onClick={() => onConfirm()}
					>
						Confirmar
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
