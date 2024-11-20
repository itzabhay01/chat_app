import { Avatar, Button,  Dialog, DialogTitle, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { SampleNotifications } from '../../constants/sampleData'

const friendRequestHandler=({_id, accept})=>{

}

const Notifications = () => {
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {
          SampleNotifications.length > 0 ? (SampleNotifications.map((i) => <NotificationItem sender={i.sender} _id={i._id} handler={friendRequestHandler}/>)) : (<Typography textAlign={"center"}> No Notification</Typography>)
        }

      </Stack>
    </Dialog>
  )
}
const NotificationItem = memo(({sender, _id, handler}) => {
  const {name, avatar} = sender;
  return (
    <ListItem>
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
            <Avatar/>

            <Typography 
            variant='body1'
            sx={{
                flexGrow:1,
                display:"-webkit-box",
                WebkitLineClamp:'vertical',
                overflow:'hidden',
                textOverflow:'ellipsis',
                width:"100%",
            }}>{`${name} sent you a friend request.`}</Typography>
            <Stack direction={{
              xs:"column",
              sm:"row",
            }}>
              <Button onClick={()=> handler({_id,accept:true})}>Accept</Button>
              <Button color="error" onClick={()=> handler({_id,accept:false})}>Reject</Button>
            </Stack>

        </Stack>
    </ListItem>
  )
})


export default Notifications