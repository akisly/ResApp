import * as Yup from 'yup';

function getValidationSchema(values) {
	return Yup.object().shape({
		firstName: Yup.string().required('First name is required'),
		lastName: Yup.string().required('Last name is required'),
		phone: Yup.string().required('Please enter a valid phone number'),
		password: Yup.string().required('Password is required'),
		passwordConfirm: Yup.string()
			.oneOf([values.password], 'Passwords are not the same')
			.required('Password confirmation is required'),
		email: Yup.string()
			.email('Pleas enter a valid email address')
			.required('Email is required')
	});
}

function getErrorsFromValidationError(validationError) {
	const FIRST_ERROR = 0;
	
	return validationError.inner.reduce((errors, error) => {
		return {
			...errors,
			[error.path]: error.errors[FIRST_ERROR]
		};
	}, {});
}

export default function validate(values) {
	const validationSchema = getValidationSchema(values);
	try {
		validationSchema.validateSync(values, { abortEarly: false });
		return {};
	} catch (error) {
		return getErrorsFromValidationError(error);
	}
}
