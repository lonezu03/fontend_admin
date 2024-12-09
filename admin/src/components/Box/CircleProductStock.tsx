import { Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

interface CircleProductStockProps {
  value: number;
}

const CircleProductStock: React.FC<CircleProductStockProps> = ({ value }) => {
  let color;
  let textColor = 'text.secondary';
  let helperText = '';

  if (value === 0) {
    textColor = '#f44336'; // Red text for "Out"
  } else if (value >= 1 && value <= 39) {
    color= '#ffeb3b'; // Yellow for Low Stock
    helperText = 'Low Stock'; // Helper text for low stock
  } else {
    color = '#4caf50'; // Green for In Stock
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <CircularProgress
        variant="determinate"
        value={value}
        sx={{ color: color }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: textColor, fontWeight: 'bold' }}
        >
          {value === 0 ? 'Out' : `${Math.round(value)}%`}
        </Typography>
      </Box>
      {helperText && (
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default CircleProductStock;
