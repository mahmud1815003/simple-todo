import { Box, Typography } from "@mui/material";
import React from "react";

const TaskViewer = ({ title, des }) => {
  return (
    <Box minWidth={'450px'} sx={{border: 1, p: 2, borderRadius: '0.55rem', mb: 2,}}>
      <Box>
        <Typography
          sx={{
            fontSize: "2rem",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "1rem",
          }}
        >
          {des}
        </Typography>
      </Box>
    </Box>
  );
};

export default TaskViewer;
