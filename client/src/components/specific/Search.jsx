import { useInputValidation } from '6pp'
import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import { Search as SearchIcon
 } from "@mui/icons-material";
import React from 'react'
import { useState } from "react";
import UserItem from '../shared/UserItem';
import { Sampleusers } from '../../constants/sampleData';
const users=[1,2,3];
const Search = () => {
  const search= useInputValidation("");
  let isLoadingSendFriendRequest= false; //making a temporary variable
  const [users,setUsers]= useState(Sampleusers);
  const addFriendHandler=(id)=>{
    console.log(id);
  };
  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField label="" value={search.value} onChange={search.changeHandler} variant='outlined' size="small" 
        InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          )
        }}/>
        <List>
          {users.map((i)=>(
            <UserItem user={i} key={i._id} handler={addFriendHandler} handlerIsLoading={isLoadingSendFriendRequest}/>

          ))}

        </List>

      </Stack>

    </Dialog>
  )
}

export default Search