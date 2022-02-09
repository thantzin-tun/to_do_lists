import React, { useState, useEffect } from "react";
import List from "./components/List";
import {
  Container,
  Grid,
  TextField,
  IconButton,
  Button,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import "./components/main.css";

import AddCommentIcon from "@material-ui/icons/AddComment";

const useStyles = makeStyles({
  grid: {
    marginTop: "100px",
  },
  div: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

function App() {
  const classes = useStyles();
  let key = "List";

  const [del, setDel] = useState(false);

  const [open, setOpen] = useState({
    open: false,
    alertText: "",
  });

  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const [edit, setEdit] = useState("");
  const [bol, setBol] = useState(false);

  const alert = () => {
    if (!text) {
      setOpen({
        ...open,
        open: true,
        alertText: "Add your plans",
      });
    } else if (text && !bol) {
      setOpen({
        ...open,
        open: true,
        alertText: "Add New List",
      });
    } else if (edit && bol) {
      setOpen({
        ...open,
        open: true,
        alertText: "Successfully Edit",
      });
    }
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  //Add todo lists
  let handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert();
      //Editing bol is true  and Edit have id
    } else if (edit && bol) {
      setList(
        list.map((data) => {
          if (data.id === edit) {
            return { ...data, toDo: text };
          }
          return data;
        })
      );
      setBol(false);
      alert();
    }
    //New Todo List
    else if (text && !bol) {
      setList([...list, { toDo: text, id: Math.floor(Math.random() * 100) }]);
      alert();
    }
    setText("");
  };

  //Deleting Todo lists
  let handleDelete = (id) => {
    let array = [...list];
    let newArray = array.filter((deleteId) => deleteId.id !== id);
    setList(newArray);
  };

  //Edit todo lists
  let handleEdit = (update_id) => {
    let newArray = list.find((data) => data.id === update_id);
    setBol(true);
    setEdit(update_id);
    setText(newArray.toDo);
  };

  useEffect(() => {
    let reRender = JSON.parse(localStorage.getItem(key));
    if (reRender) {
      setList(reRender);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(list));
  }, [list]);

  return (
    <>
      <Container>
        <Grid container justifyContent="center" className={classes.grid}>
          <Grid item xs={5} align="center">
            <div className={classes.div}>
              <TextField
                type="text"
                onChange={(e) => setText(e.target.value)}
                name="text"
                fullWidth
                value={text}
                variant="standard"
                placeholder="Enter your plans"
                autoComplete="off"
              />
              <IconButton onClick={handleSubmit}>
                {bol ? (
                  <Button variant="contained" size="small" color="secondary">
                    Edit
                  </Button>
                ) : (
                  <AddCommentIcon color="primary" />
                )}
              </IconButton>
            </div>
            <List
              list={list}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={open.open}
        message={open.alertText}
        color="secondary"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      ></Snackbar>
    </>
  );
}

export default App;
