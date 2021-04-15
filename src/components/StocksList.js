import React, { useState } from 'react';

function StocksList(props) {
	const [value, setValue] = useState('');

	function handleChange(event) {
		setValue(event.target.value);
		props.onChange(event.target.value);
	}
	return (
		<select value={value} onChange={handleChange}>
			<option value="" disabled>Select the stock</option>
			<option value="AAPL">Apple Inc.</option>
			<option value="MSFT">Microsoft Corporation</option>
			<option value="AMZN">Amazon.com, Inc.</option>
			<option value="GOOG">Alphabet Inc.</option>
			<option value="FB">Facebook, Inc.</option>
			<option value="TSLA">Tesla, Inc.</option>
		</select>
	);
}

export default StocksList;