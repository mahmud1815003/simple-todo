import {
  Box,
  Container,
  TextField,
  Typography,
  useTheme,
  Alert,
  Snackbar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import TaskViewer from "../components/TaskViewer";
import { useGetTodoQuery, usePostTodoMutation } from "../redux/api";

const MainScreens = () => {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [des, setDes] = useState("");
  const [get, setGet] = useState(true);
  const theme = useTheme();
  const [postTodo, { data, isLoading, error, isSuccess }] =
    usePostTodoMutation();
  const {
    data: todoData,
    isSuccess: todoSuccess,
    isLoading: todoLoading,
  } = useGetTodoQuery(undefined, {
    skip: get,
  });
  const handleSubmit = () => {
    postTodo({
      title,
      des,
    });
  };
  const handleGet = () => {
    setGet(false);
  };
//   useEffect(() => {
//     if (todoSuccess) {
//       setGet(true);
//     }
//   }, [todoSuccess]);
  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setDes("");
      setOpen(true);
    }
  }, [isSuccess]);
  console.log(todoData);
  return (
    <Container mt="2rem">
      <Typography
        sx={{
          fontSize: "4rem",
        }}
        textAlign={"center"}
      >
        Todo List
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontSize: "2rem",
          }}
          textAlign={"center"}
        >
          Add Task
        </Typography>
        <Box width={"400px"}>
          <TextField
            fullWidth
            required
            label="Task Title"
            error={error?.data?.title}
            helperText={
              error?.data?.title ? error?.data?.title.msg : "Enter Your Task"
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{
              style: {
                color: theme.palette.text.primary,
                fontSize: "17px",
                borderColor: theme.palette.text.primary,
              },
            }}
          />
          <TextField
            sx={{
              mt: 2,
            }}
            fullWidth
            multiline
            rows={5}
            maxRows={100}
            label="Task Description"
            error={error?.data?.des}
            helperText={
              error?.data?.des
                ? error?.data?.des?.msg
                : "Enter Your Description"
            }
            value={des}
            onChange={(e) => setDes(e.target.value)}
            InputLabelProps={{
              style: {
                color: theme.palette.text.primary,
                fontSize: "17px",
                borderColor: theme.palette.text.primary,
              },
            }}
          />
        </Box>
        <LoadingButton
          sx={{ mt: 2 }}
          loading={isLoading}
          color="success"
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Submit
        </LoadingButton>
        <LoadingButton
          sx={{ mt: 4, mb: 1 }}
          loading={todoLoading}
          onClick={() => handleGet()}
          color="success"
          variant="contained"
        >
          Show All Task
        </LoadingButton>
        {todoData && (
          <Box sx={{ borderTop: 1 }}>
            <Typography
              sx={{
                fontSize: "2rem",
              }}
            >
              All Task
            </Typography>
            <Box>
              {todoData?.map((id) => {
                return (
                  <TaskViewer
                    key={id._id}
                    title={id.title}
                    des={
                      id.des
                    }
                  />
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {data?.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MainScreens;
