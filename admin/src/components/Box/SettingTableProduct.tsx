import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BuildIcon from "@mui/icons-material/Build";
import MoreVertIcon from '@mui/icons-material/MoreVert';
const actions = [
  { icon: <BuildIcon sx={{ fontSize: "1rem" }} />, name: "Fix",color:"#f37474" },
  { icon: <DeleteForeverIcon sx={{ fontSize: "1rem" }} />, name: "Delete",color:"#59fbd6" },
];
const SettingTableProduct = () => {
  return (
    <Box sx={{ height: 50, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
      direction="left"
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          backgroundColor: "transparent", // Xóa màu nền
          boxShadow: "none", // Xóa bóng
          "& .MuiFab-root": {
            // Tùy chỉnh kích thước nút chính
            width: 45, // Giảm kích thước
            height: 45,
            // backgroundColor: "transparent", // Xóa màu nền
          },
        }}
        icon={<MoreVertIcon sx={{ fontSize: "1.5rem" }} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
          sx={{
            backgroundColor: action.color, // Thay đ��i màu nút
            "&:hover": {
              backgroundColor: action.color, // Thay đ��i màu nút khi hover
            },
            "&.MuiSpeedDialAction-label": {
              fontSize: "1.2rem", // Thay đ��i kích thước đánh dấu
            },
          }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default SettingTableProduct;
