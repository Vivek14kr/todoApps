import { Grid, TextField } from "@mui/material";
import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";

import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { createRef } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Modall = ({ open, handleClose, id, title, descriptionn }) => {
  let [newTitle, setNewTitle] = useState("");
  let [newDes, setNewDes] = useState("");

let DestextInput = createRef();

  useEffect(()=>{
    let ti = title;
    let de = descriptionn;

    setNewTitle(ti);
    setNewDes(de);
  }, [])

  const handleClick =async () => {
    
  await setNew()
    
    axios.put(`http://localhost:8000/api/todos/${id}/`, {
      title: newTitle.length === 0 ? title : newTitle,
      description: newDes.length === 0? descriptionn : newDes
    });
    handleClose();
  
  };

  const setNew = () =>{
    
    if (newTitle.length > 0 && newDes.length == 0) {
      setNewDes(descriptionn);
    } else if (newTitle.length == 0 && newDes.length > 0) {
      setNewTitle(title);
    }
  
  }

  console.log(title," 1st ", descriptionn, " 2nd ", newTitle," 3rd ", newDes);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      style={{ margin: "auto", textAlign: "center" }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          style={{
            marginLeft: "10%",
            marginRight: "10%",
            marginBottom: "10%",
          }}
          variant="h5"
        >
          EDIT TODO
        </Typography>

        <Box>
          <TextField
            required
            id="outlined-required"
            label="Title"
            defaultValue={title}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />

          <TextField
            required
            id="outlined-required"
            label="Description"
          
            defaultValue={descriptionn}
            onChange={(e) => {
              setNewDes(e.target.value);
            }}
          />
        </Box>
        <br />
        <Button variant="contained" onClick={()=>{
          handleClick()
        }}>
          Save
        </Button>
        <Button onClick={   handleClose}>Cancel</Button>
      </Box>
    </Modal>
  );
};
