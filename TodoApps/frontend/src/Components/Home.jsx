import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import axios from "axios";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Modall } from "./Modal";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AddModall } from "./AddModal";

function Home() {
  let [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleting, setDelete] = useState(false);
  const [addopen, setAddOpen] = useState(false);
  const handleAddClose = () => setAddOpen(false);
  const handleAddOpen = () => setAddOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [!open]);

  useEffect(() => {
    getData();
  }, [deleting]);
  useEffect(() => {
    getData();
  }, [!addopen]);

  const handleOpen = ({ id, title, description }) => {
    setId(id);
    setTitle(title);
    setDescription(description);
    setOpen(true);
  };

  async function getData() {
    const res = await fetch("http://localhost:8000/api/todos/");
    const todoList = await res.json();

    let newtodo = todoList.reverse();
    setData(newtodo);
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/todos/${id}/`);
    setDelete(!deleting);
  };
  const handleCheckbox = async ({ id, title, description, completed }) => {
    await axios.put(`http://localhost:8000/api/todos/${id}/`, {
      title: title,
      description: description,
      completed: !completed,
    });

    getData();
  };
  console.log(data, " this is a way a data ", open, handleClose);
  return (
    <Grid
      style={{
        margin: "auto",
        border: "2px solid black",
      }}
    >
      <Typography style={{ color: "#1565C0" }} variant="h3" gutterBottom>
        Todo App
      </Typography>

      <AddModall open={addopen} handleClose={handleAddClose} />
      <Card>
        <CardContent>
          <Button variant="contained" onClick={handleAddOpen}>
            Add Todo
          </Button>
        </CardContent>
      </Card>
      <br />
      <Card
        style={{
          width: "100%",

          margin: "auto",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        {data.map((item) => (
          <CardContent
            style={{
              display: "flex",

              width: "90%",
              textAlign: "left",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <Checkbox
              style={{ color: "#1565C0" }}
              onClick={() => {
                handleCheckbox(item);
              }}
              checked={item.completed ? true : false}
            />
            <CardContent style={{ marginLeft: "15%" }}>
              <Typography
                style={
                  item.completed
                    ? {
                        width: "20vw",
                        fontWeight: "bold",
                        textDecoration: "line-through",
                      }
                    : {
                        width: "20vw",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }
                }
                variant="h5"
              >
                {item.title}
              </Typography>

              <Typography
                style={
                  item.completed
                    ? {
                        width: "100%",
                        textDecoration: "line-through",
                      }
                    : {
                        width: "100%",
                      }
                }
                variant="body2"
              >
                {item.description}
              </Typography>
            </CardContent>
            <CardContent style={{ display: "flex" }}>
              <Button
                onClick={() => {
                  handleOpen(item);
                }}
                style={{
                  marginLeft: "20%",
                  marginRight: "10%",

                  paddingRight: "10%",
                  paddingLeft: "10%",
                }}
              >
                Edit
              </Button>

              <Button
                onClick={() => {
                  handleDelete(item.id);
                }}
                style={{
                  marginLeft: "10%",

                  paddingRight: "10%",
                  paddingLeft: "10%",
                }}
              >
                Delete
              </Button>
            </CardContent>
          </CardContent>
        ))}
      </Card>

      <Modall
        open={open}
        handleClose={handleClose}
        id={id}
        title={title}
        descriptionn={description}
        getData={getData}
      />
    </Grid>
  );
}

export default Home;
