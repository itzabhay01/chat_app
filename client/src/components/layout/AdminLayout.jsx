import { Close as CloseIcon, Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon, Groups as GroupsIcon, ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, Message as MessageIcon } from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link , Navigate, useLocation } from 'react-router-dom'


const LinkComponent = styled(Link)`
    text-decoration: none;
    border-radius: 2rem;
    padding: 1rem 2rem;
    color: black;
    &:hover {
        color: rgba(0,0,0,0.54);
    }
`;
const adminTabs = [{
    name: "Dashboard",
    path: "/admin/dashboard",
    Icon: <DashboardIcon/>
},
{
    name: "Users",
    path: "/admin/users",
    Icon: <ManageAccountsIcon/>
},
{
    name: "Chats",
    path: "/admin/chats",
    Icon: <GroupsIcon/>
},
{
    name: "Messages",
    path: "/admin/messages",
    Icon: <MessageIcon/>
}]
const SideBar = ({ w = "100%" }) => {
    const location = useLocation();

    const logoutHandler = () => {
        console.log("Logout");
    }
    return (
        <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
            <Typography variant='h5' textTransform={"uppercase"}>
                Chatt
            </Typography>
            <Stack spacing={'1rem'}>
                {
                    adminTabs.map((tab) => (
                        <LinkComponent key={tab.path} to={tab.path}
                        sx={
                            location.pathname===tab.path &&{
                                bgcolor: 'black',
                                color:"white",
                                ":hover":{color:"white"},
                            }
                        }>
                            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                                {tab.Icon}
                                {/* {console.log(<tab.Icon/>)} */}
                                <Typography >{tab.name}</Typography>
                            </Stack>
                        </LinkComponent>
                    ))
                }

                <LinkComponent to="#" onClick={logoutHandler}>
                    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                        <ExitToAppIcon/>

                        <Typography>Logout</Typography>

                    </Stack>
                </LinkComponent>

            </Stack>

        </Stack>
    )
}

const isAdmin= true;
const AdminLayout = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const handleMobile = () => {
        setIsMobile(!isMobile);
    }
    const handleClose = () => {
        setIsMobile(false);
    }

    if(!isAdmin) return <Navigate to="/admin"/>
    return (
        <Grid container minHeight={"100vh"}>
            <Box
                sx={{
                    display: { xs: "block", md: "none" },
                    position: "fixed",
                    right: "1rem",
                    top: "1rem",
                }}>
                <IconButton onClick={handleMobile}>
                    {
                        isMobile ? <CloseIcon /> : <MenuIcon />
                    }

                </IconButton>

            </Box>
            <Grid
                item
                md={4}
                lg={3}
                sx={{ display: { xs: "none", md: "block" } }}>
                <SideBar />
            </Grid>
            <Grid item
                xs={12}
                md={8}
                lg={9}
                sx={{
                    bgcolor: "#f5f5f5",
                }}>
                {children}

            </Grid>
            <Drawer open={isMobile} onClose={handleClose}>
                <SideBar w="50vw" />

            </Drawer>

        </Grid>

    )
}

export default AdminLayout