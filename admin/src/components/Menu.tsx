import React, { useState,useEffect} from "react";
import { useDispatch,useSelector } from 'react-redux';
import {fetchProducts} from '../redux/products/productThunks'
 
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Grid,
} from "@mui/material";
import { FaShoppingCart, FaTshirt } from "react-icons/fa";
import { Category, ExpandLess, ExpandMore, Person } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { CiImport } from "react-icons/ci";

const menuItems = [
  {
    label: "Product",
    icon: <FaTshirt />,
    children: [
      { label: "List", path: "/product" },
    ],
  },
  {
    label: "User",
    icon: <Person />,
    children: [
      { label: "List", path: "/user" },
      { label: "Details", path: "/user/details" },
      { label: "Role", path: "/user/roles" },
    ],
  },
  {
    label: "Property",
    icon: <Category />,
    children: [{ label: "Create", path: "/property" }],
  },
  {
    label: "Order",
    icon: <FaShoppingCart />,
    children: [
      { label: "Customer Orders", path: "/orders" },
    ],
  },
  {
    label: "Invoice",
    icon: <CiImport />,
    children: [
      { label: "List", path: "/invoice" },
      { label: "Create", path: "/invoice/new" },
    ],
  },
];


const SidebarMenu = () => {
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = (label: string, path?: string) => {
    if (path) {
      navigate(path);
    }
    setOpenMenu((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  const isSelected = (path: string) => location.pathname === path;
 
  return (
    <Grid container spacing={2}>
      <Grid item xs={11}>
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              <ListItemButton
                onClick={() =>
                  handleToggle(
                    item.label,
                    item.children.length === 0
                      ? item.children[0].path
                      : undefined
                  )
                }
                sx={{
                  bgcolor: openMenu[item.label] ? "#e8f5e9" : "transparent",
                  "&:hover": {
                    bgcolor: "#c8e6c9",
                    fontWeight: "bold",
                  },
                  borderRadius: "10px",
                  margin: "5px 0",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#4caf50",
                    minWidth: "40px",
                    "& svg": { fontSize: "1.5rem" },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    fontWeight: item.children.some((child) =>
                      isSelected(child.path)
                    )
                      ? "bold"
                      : "normal",
                  }}
                />
                {item.children.length > 0 &&
                  (openMenu[item.label] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              {/* Sub-menu items (if any) */}
              {item.children.length > 0 && (
                <Collapse
                  in={openMenu[item.label]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <React.Fragment key={child.label}>
                        <ListItemButton
                          sx={{
                            pl: 4,
                            fontSize: "1.2rem",
                            bgcolor: isSelected(child.path)
                              ? "#e8f5e9"
                              : "transparent",
                            "&:hover": {
                              bgcolor: "#e0f7fa",
                              fontWeight: "bold",
                            },
                          }}
                          onClick={() => handleToggle(child.label, child.path)}
                        >
                          <ListItemText
                            primary={child.label}
                            sx={{
                              fontWeight: isSelected(child.path)
                                ? "bold"
                                : "normal",
                              "& span": {
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                              },
                            }}
                          />
                        </ListItemButton>

                        {/* Sub-menu items under Import */}
                        {/* {child.children && (
                          <Collapse
                            in={openMenu[child.label]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              {child.children.map((subChild) => (
                                <ListItemButton
                                  key={subChild.label}
                                  sx={{
                                    pl: 8,
                                    fontSize: "1rem",
                                    bgcolor: isSelected(subChild.path)
                                      ? "#e8f5e9"
                                      : "transparent",
                                    "&:hover": {
                                      bgcolor: "#f0f4c3",
                                      fontWeight: "bold",
                                    },
                                  }}
                                  onClick={() => navigate(subChild.path)}
                                >
                                  <ListItemText
                                    primary={subChild.label}
                                    sx={{
                                      fontWeight: isSelected(subChild.path)
                                        ? "bold"
                                        : "normal",
                                      "& span": {
                                        fontSize: "0.7rem",
                                        fontWeight: "bold",
                                      },
                                    }}
                                  />
                                </ListItemButton>
                              ))}
                            </List>
                          </Collapse>
                        )} */}
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item xs={9}>
        {/* Content of the selected page goes here */}
      </Grid>
    </Grid>
  );
};

export default SidebarMenu;
