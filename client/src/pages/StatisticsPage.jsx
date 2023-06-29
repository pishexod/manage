import React, {useEffect, useState} from 'react';
import {Card} from 'antd';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {getExercise} from '../utils/APIRoutes';
import axios from 'axios';
import App from '../components/App';

const StatisticPage = () => {
    const [exerciseData, setExerciseData] = useState([]);
    useEffect(() => {
        fetchExercise();
    }, []);

    const getUser = () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                return JSON.parse(storedUser);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const fetchExercise = async () => {
        try {
            const parsedUser = await getUser();
            const response = await axios.get(getExercise, {
                params: {
                    company: parsedUser.company,
                },
            });
            console.log(response.data.data)
            setExerciseData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };


    const renderLines = () => {
        return exerciseData.map((soldier) => {
            const data = [
                {
                    exercise: 'Підтягування',
                    rating: soldier.rating_pullup,
                },
                {
                    exercise: 'Біг на 3 км',
                    rating: soldier.rating_run3km,
                },
                {
                    exercise: 'Біг 6х100',
                    rating: soldier.rating_run6x100,
                },
                {
                    exercise: 'Біг на 100м.',
                    rating: soldier.rating_run100m,
                },
            ];
            return (
                <Line
                    type="monotone"
                    data={data}
                    dataKey="rating"
                    name={`${soldier.soldier.soldier_rank} ${soldier.soldier.surname} ${soldier.soldier.name} ${soldier.soldier.platoon}-ий взвод оцінка`}
                    key={soldier.soldier.soldier_id}
                    strokeDasharray="12 12"
                    pathLength={4}
                />
            );
        });
    };

    return (
        <>
            <App/>
            <div>
                <Card>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={exerciseData}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                            <CartesianGrid strokeDasharray="6 6"/>
                            <XAxis
                                dataKey="exercise"
                                tick={{fontSize:15}}
                            />
                            <YAxis domain={[2, 5]} />
                            <Tooltip/>
                            <Legend/>
                            {renderLines()}
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </>
    );
};

export default StatisticPage;