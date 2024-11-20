import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React from 'react'
import { Sampleusers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {

    const [members, setMembers]= useState(Sampleusers);
    const [selectedMembers, setSelectedMembers] = useState([]);
  
    const selectMemberHandler=(id)=>{
      setSelectedMembers((prev)=> prev.includes(id)? prev.filter((i)=>i!==id):[...prev, id]);
    }// we can make it as a custom hook having a setter functiona as that function is the only function depending on the outside world

    const closeHandler =()=>{
        setSelectedMembers([]);
        setMembers([]);
    }
    const addMemberSubmitHandler =()=>{
        closeHandler();
    }
    
    return (
        <Dialog open onClose={closeHandler}>
            <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
                <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

                <Stack spacing={"1rem"}>
                    {members.length > 0 ?
                        members.map(i => (
                            <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)}/>
                        )) : <Typography textAlign={"center"}>
                            No Friends
                        </Typography>
                    }

                </Stack>

                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
                    <Button onClick={addMemberSubmitHandler} variant='contained' disabled={isLoadingAddMember}>Submit</Button>
                    <Button color='error' onClick={closeHandler}>Cancel</Button>

                </Stack>




            </Stack>
        </Dialog>
    )
}

export default AddMemberDialog