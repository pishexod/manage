import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {checkauth} from "../utils/APIRoutes";
import axios from "axios";
import App from "../components/App";
import {Text, Spacer} from "@nextui-org/react"
import {Box} from "../components/Box"
import {styled} from '@mui/system';


const Subtitle = styled("p")`
  font-size: 18px;
  color: #555555;
  margin-bottom: 32px;
`;

const Home = () => {
    const navigate = useNavigate();
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
                <h2 align="center">20-та рота</h2>
                <Subtitle>Облік рівня фізичної підготовленості військовослужбовців</Subtitle>
                <Spacer y={1}/>
                <Text size="$lg">
                    Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Praesent semper feugiat nibh
                    sed pulvinar. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Malesuada
                    proin libero nunc consequat interdum varius sit amet. Lectus quam id leo in vitae. Sed viverra
                    tellus in hac habitasse platea dictumst. Vivamus at augue eget arcu. Augue mauris augue neque
                    gravida in.
                </Text>
                <Spacer y={1}/>
                <Text size="$lg">
                    Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Praesent semper feugiat nibh
                    sed pulvinar. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Malesuada
                    proin libero nunc consequat interdum varius sit amet. Lectus quam id leo in vitae. Sed viverra
                    tellus in hac habitasse platea dictumst. Vivamus at augue eget arcu. Augue mauris augue neque
                    gravida in.
                </Text>
                <Spacer y={1}/>
                <Text size="$lg">
                    Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Praesent semper feugiat nibh
                    sed pulvinar. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Malesuada
                    proin libero nunc consequat interdum varius sit amet. Lectus quam id leo in vitae. Sed viverra
                    tellus in hac habitasse platea dictumst. Vivamus at augue eget arcu. Augue mauris augue neque
                    gravida in.
                </Text>
                <Spacer y={1}/>
                <Text size="$lg">
                    Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Praesent semper feugiat nibh
                    sed pulvinar. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Malesuada
                    proin libero nunc consequat interdum varius sit amet. Lectus quam id leo in vitae. Sed viverra
                    tellus in hac habitasse platea dictumst. Vivamus at augue eget arcu. Augue mauris augue neque
                    gravida in.
                </Text>
                <Spacer y={1}/>
                <Text size="$lg">
                    Tincidunt vitae semper quis lectus nulla at volutpat diam. Gravida dictum fusce ut placerat.
                    Erat velit scelerisque in dictum non. Tempus quam pellentesque nec nam aliquam sem et tortor
                    consequat. Eu nisl nunc mi ipsum faucibus. Cras fermentum odio eu feugiat pretium nibh. Vel
                    pharetra vel turpis nunc eget lorem dolor sed viverra. Sollicitudin tempor id eu nisl nunc mi
                    ipsum faucibus. Sed id semper risus in hendrerit gravida rutrum. Eget nulla facilisi etiam
                    dignissim. Erat imperdiet sed euismod nisi. Risus in hendrerit gravida rutrum quisque non
                    tellus orci ac.
                </Text>
                <Spacer y={1}/>
                <Text size="$lg">
                    Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. In pellentesque massa placerat
                    duis ultricies. Sit amet massa vitae tortor condimentum. Morbi tincidunt augue interdum velit
                    euismod. Aliquet enim tortor at auctor urna nunc id. A scelerisque purus semper eget. Vitae
                    justo eget magna fermentum iaculis. Arcu non odio euismod lacinia at quis. Et leo duis ut diam
                    quam nulla porttitor massa. Eget nunc scelerisque viverra mauris. Suscipit tellus mauris a
                    diam maecenas sed enim. Cras sed felis eget velit aliquet. Est placerat in egestas erat
                    imperdiet sed euismod nisi porta. In ante metus dictum at tempor commodo. In cursus turpis
                    massa tincidunt dui ut ornare lectus. Tempus iaculis urna id volutpat. Iaculis eu non diam
                    phasellus vestibulum lorem sed risus.
                </Text>
                <Spacer y={1}/>
                <Text size="$lg">
                    Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Imperdiet massa tincidunt
                    nunc pulvinar sapien et ligula ullamcorper malesuada. Faucibus pulvinar elementum integer enim
                    neque volutpat. Gravida arcu ac tortor dignissim convallis aenean. Lectus quam id leo in
                    vitae. Ultricies tristique nulla aliquet enim tortor. Nec tincidunt praesent semper feugiat
                    nibh sed. Imperdiet proin fermentum leo vel orci porta non pulvinar neque. Praesent semper
                    feugiat nibh sed pulvinar proin gravida. Dis parturient montes nascetur ridiculus mus mauris.
                    Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Ut lectus arcu bibendum at.
                    Integer enim neque volutpat ac. Diam sit amet nisl suscipit. Eros donec ac odio tempor orci
                    dapibus ultrices in iaculis. Ullamcorper a lacus vestibulum sed arcu non odio euismod. Quis
                    lectus nulla at volutpat diam ut. Turpis egestas integer eget aliquet. Adipiscing tristique
                    risus nec feugiat in fermentum posuere. Morbi tempus iaculis urna id. Amet commodo nulla
                    facilisi nullam vehicula ipsum a arcu.
                </Text>
                <Text size="$lg">
                    Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Praesent semper feugiat nibh
                    sed pulvinar. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque. Malesuada
                    proin libero nunc consequat interdum varius sit amet. Lectus quam id leo in vitae. Sed viverra
                    tellus in hac habitasse platea dictumst. Vivamus at augue eget arcu. Augue mauris augue neque
                    gravida in.
                </Text>
                <Spacer y={1}/>
                <Text size="$lg">
                    Tincidunt vitae semper quis lectus nulla at volutpat diam. Gravida dictum fusce ut placerat.
                    Erat velit scelerisque in dictum non. Tempus quam pellentesque nec nam aliquam sem et tortor
                    consequat. Eu nisl nunc mi ipsum faucibus. Cras fermentum odio eu feugiat pretium nibh. Vel
                    pharetra vel turpis nunc eget lorem dolor sed viverra. Sollicitudin tempor id eu nisl nunc mi
                    ipsum faucibus. Sed id semper risus in hendrerit gravida rutrum. Eget nulla facilisi etiam
                    dignissim. Erat imperdiet sed euismod nisi. Risus in hendrerit gravida rutrum quisque non
                    tellus orci ac.
                </Text>
                <Spacer y={1}/>
            </Box>
        </div>
    );
};

export default Home;
