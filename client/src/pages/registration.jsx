import React, {useState} from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer, toast} from "react-toastify";
import {registerRoute} from "../utils/APIRoutes";
import {useNavigate} from "react-router-dom";
import {Button, Input} from "@nextui-org/react";
import '../css/style.css'


const RegistrPage = () => {
    const [username, setUsername] = useState('');
    const [rank] = useState('');
    const [company, setNumberCompany] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    const handleFirstNameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleNumberCompanyChange = (e) => {
        setNumberCompany(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleValidation = () => {
        if (password.length < 8) {
            toast.error('Довжина паролю менше 8', toastOption)
            return false;
        }
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(rank)
        if (handleValidation()) {
            const {data} = await axios.post(registerRoute, {
                username,
                password,
                company: company
            })
            if (data.status === false) {
                toast.error(data.message, toastOption);
            }
            if (data.status === true) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate('/');
            }
        }
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <form
                    style={{
                        background: "#ffffff",
                        padding: "20px",
                        borderRadius: "4px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        width: "80%",
                        maxWidth: "400px",
                        position: "relative",
                    }}
                    onSubmit={handleSubmit}
                >
                    <h2 style={{textAlign: "center", marginBottom: "50px"}}>
                        Реєстрація
                    </h2>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "40px",
                        }}
                    >
                        <div>
                            <label style={{display: "block", marginBottom: "10px"}}>
                                Введіть ім'я
                            </label>
                            <Input
                                auto
                                css={{
                                    width: "100%",
                                }}
                                type="text"
                                value={username}
                                onChange={handleFirstNameChange}
                                required
                            />
                        </div>
                        <div>
                            <label style={{display: "block", marginBottom: "10px"}}>
                                Введіть пароль
                            </label>
                            <Input.Password
                                auto
                                css={{
                                    width: "100%",
                                }}
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div>
                            <label style={{display: "block", marginBottom: "10px"}}>
                                Введіть № роти
                            </label>
                            <Input
                                auto
                                css={{
                                    width: "100%",
                                }}
                                type="number"
                                value={company}
                                onChange={handleNumberCompanyChange}
                                required
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        style={{
                            marginTop: "60px",
                            fontSize: "1.4rem",
                            padding: "15px",
                            width: "100%",
                        }}
                        auto
                        css={{
                            borderRadius: "$xs",
                            border: "$space$1 solid transparent",
                            background: "$green800",
                            color: "$white",
                            height: "$12",
                            boxShadow: "$md",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "0 auto",
                            position: "relative",
                            overflow: "hidden",
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                                background: "$green100",
                                color: "$green800",
                            },
                            "&:active": {
                                background: "$green200",
                            },
                            "&:focus": {
                                borderColor: "$green400",
                            },
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                top: "-100%",
                                left: "-100%",
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                backgroundColor: "$green800",
                                transformOrigin: "center center",
                                transform: "scale(0)",
                                opacity: "0.2",
                                transition: "transform 1s ease-out",
                            },
                            "&:hover::before": {
                                transform: "scale(3)",
                            },
                        }}
                    >
                        Зареєструватися
                    </Button>
                    <a
                        href="/login"
                        style={{
                            display: "block",
                            marginTop: "24px",
                            color: "blue",
                            textAlign: "center",
                        }}
                    >
                        Вже зареєстровані?
                    </a>
                </form>
            </div>
            <ToastContainer/>
        </>
    );
};


export default RegistrPage;
