import React from "react";

import { Paper, Grid, Typography, IconButton } from "@material-ui/core";

import EditRoundedIcon from "@material-ui/icons/EditRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

import { makeStyles } from "@material-ui/core";

import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const useStyles = makeStyles({
  div: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  paper: {
    margin: "20px 0px",
    padding: "4px 13px",
    "&:hover": {
      backgroundColor: "lightseagreen",
      transition: "0.8s linear",
    },
  },
});

function List({ list, handleDelete, handleEdit }) {
  const classes = useStyles();

  return (
    <>
      <Grid item>
        {list.map((data, index) => (
          <AnimatePresence>
            <motion.div
              key={index}
              initial={{ y: -10, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.5,
                  duration: 0.5,
                  ease: "linear",
                  type: "spring",
                },
              }}
              exit={{
                y: 10,
                transition: { ease: "linear", delay: 1, duration: 1 },
              }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={1}
            >
              <Paper elevation={2} className={classes.paper}>
                <div className={classes.div}>
                  <Typography variant="subtitle1" color="textPrimary">
                    {data.toDo}
                  </Typography>
                  <div>
                    <IconButton onClick={() => handleEdit(data.id)}>
                      <EditRoundedIcon color="primary"></EditRoundedIcon>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(data.id)}>
                      <HighlightOffRoundedIcon color="secondary"></HighlightOffRoundedIcon>
                    </IconButton>
                  </div>
                </div>
              </Paper>
            </motion.div>
          </AnimatePresence>
        ))}
      </Grid>
    </>
  );
}

export default List;
