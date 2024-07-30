import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useProgress, Html } from '@react-three/drei';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" sx={{ height: 20 }} {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="h6" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearStatic() {
  const { progress } = useProgress();

  return (
    <Html center>
      <Box sx={{ width: '100%', bgcolor: 'red', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '80%' }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
      </Box>
    </Html>
  );
}
