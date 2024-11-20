import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from '../components/styles/styles';
import AvatarCard from '../components/shared/AvatarCard';
import { Samplechats, Sampleusers } from '../constants/sampleData';
import UserItem from '../components/shared/UserItem';
import { bgGradient } from '../constants/color';
const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(()=>import("../components/dialogs/AddMemberDialog"))
const Groups = () => {
  //hooks
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuopen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [groupname, setGroupName] = useState("");
  const [groupnameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const isAddMember= false;



  //


  //Functions
  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuopen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuopen(false);
  const updateGroupName = () => {
    setIsEdit(false);
    console.log("group name updated")
  }

  const openconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("Delete Group");
  }
  const closeconfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
    
  }
  const openAddMemberHandler = () => {
    console.log("Add Member");
  }
  const DeleteHandler =()=>{
    console.log("Delete Handler");
    closeconfirmDeleteHandler();
  }
  const removeMemberHandler= (id)=>{
    console.log("Remove Member", id);
  };


  //

  useEffect(() => {
    if(chatId){
      setGroupName(`Group name ${chatId}`);
      setGroupNameUpdatedValue(`Group name ${chatId}`);
    }


    return () => {
      //it is a cleanup function
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    }

  }, [chatId]);



  const groupName = <>
    <Stack direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}>
      {isEdit ? <>
        <TextField value={groupnameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)} />
        <IconButton onClick={updateGroupName}>
          <DoneIcon />
        </IconButton>
      </> : <><Typography variant='h4' >{groupname}</Typography>
        <IconButton onClick={() => setIsEdit(true)}><EditIcon /></IconButton>
      </>}

    </Stack>
  </>;


  const ButtonGroup = <>
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse"
      }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}>

      <Button size='large' color='error' variant='outlined' startIcon={<DeleteIcon />} onClick={openconfirmDeleteHandler}>Delete Group</Button>
      <Button size='large' variant='contained' startIcon={<AddIcon />} onClick={openAddMemberHandler}>Add Member</Button>

    </Stack>
  </>


  const Iconbtns = <>
    <Box sx={{
      display: {
        xs: "block",
        sm: "none",
        position: "fixed",
        right: "1rem",
        top: "1rem",
      }
    }}>
      <IconButton onClick={handleMobile}>
        <MenuIcon />
      </IconButton>

    </Box>
    <Tooltip title="back">
      <IconButton
        sx={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          bgcolor: "rgba(0,0,0,0.8)",
          color: "white",
          ":hover": {
            bgcolor: "rgba(0,0,0,0.7)",
          }
        }}
        onClick={navigateBack}>
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>
  </>;

  const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
    <Stack width={w} sx={{
      backgroundImage: bgGradient,
      height:"100vh",
      overflow:"auto",
    }} >
      {myGroups.length > 0 ?
        (myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)) :
        <Typography textAlign={"center"} padding="1rem">
          No Groups
        </Typography>}

    </Stack>
  );



  const GroupListItem = memo(({ group, chatId }) => {
    const { name, avatar, _id } = group;
    return <Link to={`?group=
  ${_id}`} onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  })





  return (
    <Grid container height={"100vh"}>
      <Grid item sx={{
        display: {
          xs: "none",
          sm: "block",
        },
      }}
        sm={4}
        >
        <GroupsList myGroups={Samplechats} chatId={chatId} />

      </Grid>
      <Grid item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3 rem",
        }}>
        {Iconbtns}

        {
          groupname && <>

            {groupName}
            <Typography margin={"2rem"} alignSelf={"flex-start"} variant='body1'>
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              
              height={"50vh"}
              overflow={"auto"}>
              {/* members */}

              {
                Sampleusers.map((i)=>{
                  return(
                    <UserItem key={i._id} user={i} isAdded styling={{
                      boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",
                      padding:"1rem 2rem",
                      borderRadius:"1rem",
                    }} 
                    handler={removeMemberHandler}/>
                  )


                })
              }
            </Stack>

            {ButtonGroup}


          </>

        }



      </Grid>
      {confirmDeleteDialog &&
        <>
          <Suspense fallback={<Backdrop open/>}><ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeconfirmDeleteHandler}
          deleteHandler={DeleteHandler}/>
          </Suspense>

        </>}

        {
          isAddMember && <Suspense fallback={<Backdrop open/>}><AddMemberDialog/></Suspense>
        }
      <Drawer sx={{
        display: {
          xs: "block",
          sm: "none",
        },

      }} open={isMobileMenuOpen} onClose={handleMobileClose}><GroupsList w={"50vw"} myGroups={Samplechats} chatId={chatId} /></Drawer>

    </Grid>
  )
}




export default Groups