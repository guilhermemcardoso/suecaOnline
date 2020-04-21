import React from 'react';
import { Alert } from 'react-bootstrap';
export const AlertType = {
	PRIMARY: 'primary',
	SECONDARY: 'secondary',
	SUCCESS: 'success',
	DANGER: 'danger',
	WARNING: 'warning',
	INFO: 'info',
	LIGHT: 'light',
	DARK: 'dark'
};

const AlertMessage = ({message, type, onClose}) => {
	return (
			<Alert onClick={onClose} variant={type}>
				{message}
			</Alert>
	);
};

export default AlertMessage;
