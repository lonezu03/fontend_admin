import { Box, Card, CardContent, CardMedia, Checkbox, Typography } from '@mui/material'
import React from 'react'

const CardProduct = () => {
  return (
     <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        maxWidth: 300,
        border:"none",
        boxShadow:"none"
      }}
    >

      {/* Image */}
      <img
        src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc5S5uIf3jFBBdGIwZ-2A12rICxpuVyIQ4sQ&s`}
        alt="Product"
        width={100}
        height={100}
        style={{
          borderRadius: '8px',
          marginRight: '16px',
        }}
      />

      {/* Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ padding: 0 }}>
          {/* Product Name */}
          <Typography component="div" variant="subtitle1" fontWeight="bold">
            Urban Explorer Sneakers
          </Typography>
          {/* Subtitle */}
          <Typography variant="subtitle2" component="div" color="text.secondary">
            Accessories
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

export default CardProduct
