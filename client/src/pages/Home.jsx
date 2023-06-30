import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {checkauth} from "../utils/APIRoutes";
import axios from "axios";
import App from "../components/App";
import {Text, Spacer} from "@nextui-org/react"
import {Box} from "../components/Box"
import {styled} from '@mui/system';
import '../css/style.css'


const Subtitle = styled("p")`
  font-size: 18px;
  color: #555555;
  margin-bottom: 32px;
`;

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
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
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
                const response = await axios.get(checkauth, {
                    headers: {
                        "access-token": token
                    }
                });
                if (!response.data.status) {
                    navigate("/login");
                }
            } catch (error) {
                console.log(error);
                navigate("/login");
            }
        };

        let isMounted = true;
        if (isMounted) {
            checkAuth().then(() => {
                isMounted = false;
            });
        }
    }, []);


    return (
        <div className={'app'}>
            <App/>
            <Box css={{px: "$12", mt: "0.1vh", "@xsMax": {px: "$10"}}}>
                <h2 align="center">{getUser().company}-а рота</h2>
                <Subtitle>Облік рівня фізичної підготовленості військовослужбовців</Subtitle>
                <Text>
                   Командир роти {getUser().username}
                </Text>

            </Box>
        </div>
    );
};

export default Home;
