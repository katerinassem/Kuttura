import React, { useEffect, useState } from 'react';
import { Card, Box, Typography, Container } from '@material-ui/core';
import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Bar,
	PieChart, Pie } from 'recharts';
import { getSummary } from './service/summaryService';
import { prepareWorkingSummary } from './util';
import Spinner from './../spinner/Spinner';
import { useHistory } from 'react-router-dom';

function Dashboard() {
	const history = useHistory();
	const [ isLoaded, setIsLoaded ] = useState(false);
	const [ summary, setSummary ] = useState({});

	useEffect(() => {
		const fetchSummary = async () => {
			try {
				const summaryData = await getSummary();
				if(summaryData) {
					setSummary({
						trainings: summaryData.data.Trainings,
						working: prepareWorkingSummary(summaryData.data.Working)
					});
					setIsLoaded(true);
				}
			} catch(error) {
				history.push('/error');
			}
		}

		fetchSummary();
	}, [history]);

	return (
		<Box>
			<Container maxWidth="sm">
				<Typography variant="h2">Dashboard</Typography>
				<Typography variant="h3">Statistical data</Typography>
			</Container>
			{
				isLoaded
				? (
					<Box display="flex" justifyContent="center" flexWrap="wrap">
						<Box flexGrow={1}>
							<Card>
								<BarChart width={400} height={300} data={summary.trainings}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="Name" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Bar dataKey="Progress" />
								</BarChart>
							</Card>
						</Box>
						<Box flexGrow={1}>
							<Card>
								<PieChart width={300} height={300}>
									<Legend />
									<Pie data={summary.working} dataKey="value" label innerRadius="65%" outerRadius="89%"/>
								</PieChart>
							</Card>
						</Box>
					</Box>
				)
				: (<Spinner/>)
			}
		</Box>
	);
}

export default Dashboard;
