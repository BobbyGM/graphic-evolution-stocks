import React, { useState } from 'react';

function RangesList(props) {
	const [value, setValue] = useState('');

	function handleChange(event) {
		setValue(event.target.value);
		props.onChange(event.target.value);
	}
	return (
		<select value={value} onChange={handleChange}>
			<option value="" disabled>Select the range</option>
			<option value="1mo">1 month</option>
			<option value="3mo">3 months</option>
			<option value="6mo">6 months</option>
			<option value="1y">1 year</option>
		</select>
	);
}

export default RangesList;