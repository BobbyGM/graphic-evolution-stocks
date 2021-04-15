import React, { useState } from 'react';
import StocksList from './StocksList';
import RangesList from './RangesList';
import {Line} from 'react-chartjs-2';

var data = {};
var labels = [];
var indicatorsHigh = [];
var indicatorsLow = [];

function Chart() {
	const [symbol, setSymbol] = useState('');
	const [range, setRange] = useState('');
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [
		{
			label: 'Indicators High',
			borderColor: 'black',
			data: [],
			fill: false
		},
		{
			label: 'Indicators Low',
			borderColor: 'red',
			data: [],
			fill: false
		}
		]
	});

	function handleSymbol(value) {
		setSymbol(value);
	}

	function handleRange(value) {
		setRange(value);
	}

	function handleChartData(labels, indicatorsHigh, indicatorsLow) {
		setChartData({
			labels: labels,
			datasets: [
			{
				label: 'Indicators High',
				borderColor: 'black',
				data: indicatorsHigh,
				fill: false
			},
			{
				label: 'Indicators Low',
				borderColor: 'red',
				data: indicatorsLow,
				fill: false
			}
			]
		});
	}

	function getChartData(symbol, range) {
		let xhr = new XMLHttpRequest();
		xhr.open("GET","https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=1d&symbol=" + symbol + "&range=" + range + "&region=US%22&rapidapi-key=74b64ca64dmsha902df12980907fp1512b8jsn278f35951b7b");
		xhr.send();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				data = JSON.parse(xhr.responseText);
				labels = data.chart.result[0].timestamp;
				labels.forEach(function(element,index) {
					let humanReadableDate = new Date(element * 1000);
					labels[index] = humanReadableDate.toLocaleDateString();
				})
				indicatorsHigh = data.chart.result[0].indicators.quote[0].high;
				indicatorsLow = data.chart.result[0].indicators.quote[0].low;
			}
		}
	}

	function viewChart() {
		getChartData(symbol, range);
		handleChartData(labels, indicatorsHigh, indicatorsLow);
	}

	return (
		<div>
			<StocksList onChange={handleSymbol}/>
			<RangesList onChange={handleRange}/>
			<button onClick={viewChart}>View Chart</button>
			<br/>
			<Line
				data={chartData}
			/>
		</div>
	);
}

export default Chart;