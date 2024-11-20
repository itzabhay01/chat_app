import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { CameraAlt as CameraAltIcon } from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/styles';
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from '../utils/validators';
import { bgGradient } from '../constants/color';

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const toggleLogin = () => setIsLogin((prev) => !prev);
    const name = useInputValidation("",);
    const Bio = useInputValidation("",);
    const username = useInputValidation("", usernameValidator);
    const Password = useStrongPassword();
    const avatar = useFileHandler("single");
    const handleLogin = (e) => {
        e.preventDefault();
    }
    const handleSignUp = (e) => {
        e.preventDefault();
    }
    // console.log(username);
    " "
    " radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)"
    return (
        <div 
        style={{
            backgroundImage:bgGradient
        }}>
            <Container component={'main'} maxWidth="xs"
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                <Paper elevation={3}
                    sx={{
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: 'center',
                    }}
                >
                    {isLogin ? (
                        <>
                            <Typography variant='h5'>Login</Typography>
                            <form style={{
                                width: "100%",
                                marginTop: "1rem",
                            }}
                                onSubmit={handleLogin}>
                                <TextField
                                    required
                                    fullWidth
                                    label='username'
                                    margin='normal'
                                    variant='outlined'
                                    value={username.value}
                                    onChange={username.changeHandler} />


                                <>
                                    {
                                        username.error && (
                                            <Typography color='error' variant='caption'>
                                                {username.error}

                                            </Typography>
                                        )
                                    }
                                </>

                                <TextField
                                    required
                                    fullWidth
                                    label='password'
                                    type='password'
                                    margin='normal'
                                    variant='outlined'
                                    value={Password.value}
                                    onChange={Password.changeHandler} />

                                <>
                                    {
                                        Password.error && (
                                            <Typography color='error' variant='caption'
                                            >
                                                {Password.error}

                                            </Typography>
                                        )
                                    }
                                </>

                                <Button
                                    sx={{
                                        marginTop: '1rem'
                                    }}
                                    variant='contained'
                                    color='primary'
                                    type='submit'>Login

                                </Button>
                                <Typography textAlign={'center'} m={'1rem'}>OR</Typography>

                                <Button
                                    fullWidth
                                    variant='text'
                                    onClick={toggleLogin}>
                                    Sign Up Instead
                                </Button>


                            </form>
                        </>
                    ) : (
                        <>

                            <Typography variant='h5'>Sign Up</Typography>
                            <form style={{
                                width: "100%",
                                marginTop: "1rem",

                            }}
                                onSubmit={handleSignUp}>
                                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                                    <Avatar
                                        sx={{
                                            width: "10rem",
                                            height: "10rem",
                                            objectFit: "contain",
                                        }}
                                        src={avatar.preview}
                                    />

                                    <IconButton sx={{
                                        position: "absolute",
                                        bottom: "0",
                                        right: "0",
                                        color: "white",
                                        bgcolor: "rgba(0,0,0,0.5)",
                                        ":hover": {
                                            bgcolor: "rgba(0,0,0,0.7",
                                        },

                                    }}
                                        component="label">
                                        <>
                                            <CameraAltIcon />
                                            <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                                        </>
                                    </IconButton>

                                </Stack>
                                <>
                                    {
                                        avatar.error && (
                                            <Typography m={'1rem'}
                                                width={'fit-content'}
                                                display={'block'} color='error' variant='caption'
                                            >
                                                {avatar.error}

                                            </Typography>
                                        )
                                    }
                                </>
                                <TextField
                                    required
                                    fullWidth
                                    label='Name'
                                    margin='normal'
                                    variant='outlined'
                                    value={name.value}
                                    onChange={name.changeHandler} />
                                <TextField
                                    required
                                    fullWidth
                                    label='Bio'
                                    margin='normal'
                                    variant='outlined'
                                    value={Bio.value}
                                    onChange={Bio.changeHandler} />
                                <TextField
                                    required
                                    fullWidth
                                    label='username'
                                    margin='normal'
                                    variant='outlined'
                                    value={username.value}
                                    onChange={username.changeHandler} />
                                <>
                                    {
                                        username.error && (
                                            <Typography color='error' variant='caption'>
                                                {username.error}

                                            </Typography>
                                        )
                                    }
                                </>
                                <TextField
                                    required
                                    fullWidth
                                    label='password'
                                    type='password'
                                    margin='normal'
                                    variant='outlined'
                                    value={Password.value}
                                    onChange={Password.changeHandler} />

                                <>
                                    {
                                        Password.error && (
                                            <Typography color='error' variant='caption'
                                            >
                                                {Password.error}

                                            </Typography>
                                        )
                                    }
                                </>

                                <Button
                                    sx={{
                                        marginTop: '1rem'
                                    }}
                                    variant='contained'
                                    color='primary'
                                    type='submit'>Sign Up

                                </Button>
                                <Typography textAlign={'center'} m={'1rem'}>OR</Typography>

                                <Button
                                    fullWidth
                                    variant='text'
                                    onClick={toggleLogin}>
                                    Login Instead
                                </Button>


                            </form>
                        </>
                    )}

                </Paper>

            </Container>

        </div>

    )
}

export default Login