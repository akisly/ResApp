import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from "react-native-paper";
import Moment from 'moment';

const DateTimePicker = ({ mode, onChange }) => {
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const _onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(currentDate);
		onChange(mode === 'date' ? currentDate : Moment(currentDate).format('hh:mm'));
	};

	return (
		<>
			<TextInput
				value={mode === 'date' ? Moment(date).format('D MMMM Y') : Moment(date).format('hh:mm')}
				placeholder="First Name"
				placeholderTextColor="#666666"
				autoCorrect={false}
				onFocus={() => setShow(true)}
				style={{ backgroundColor: 'transparent', flex: 1, marginLeft: 10, height: 50 }}
				showSoftInputOnFocus={false}
				autoComplete="off"
				caretHidden
			/>
			{show && (
				<RNDateTimePicker
					testID="dateTimePicker"
					value={date}
					mode={mode}
					is24Hour={true}
					display="default"
					onChange={_onChange}
				/>
			)}
		</>
	);
};

export default DateTimePicker;
