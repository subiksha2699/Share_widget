import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { Stack, Switch, Box, Typography } from "@mui/material";
import { CustomInput } from "./CustomInput";
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneIcon from '@mui/icons-material/Done';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';


const HBox = styled(Box)`
                display:flex;
                flex-direction:row;
                align-items:center;
                `;


const NotionShare = (props) => {

    const [userList, setuserList] = useState([]);
    const [emailInputValue, setemailInputValue] = useState("");
    const [expanded, setExpanded] = React.useState(false);
    const [expandedPermissionPanel, setExpandedPermissionPanel] = React.useState(false);
    const [scopeDescList, setscopeDescList] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedUser, setselectedUser] = React.useState(0);
    const [sharePermission, setSharePermission] = React.useState([]);

    const defaultPermissionforUsers = function () {
        let defPerm = ""
        switch (props.defScope) {
            case "WRITE":
                defPerm = "Full access";
                break;
            case "WRITENOSHARE":
                defPerm = "Can edit";
                break;
            case "READNCOMMENT":
                defPerm = "Can comment";
                break;
            case "READ":
                defPerm = "Can view";
                break;
        }
        return defPerm;
    }

    useEffect(() => {
        let input = document.getElementById("idemailInput");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter" && props.addUserEnable) {
                event.preventDefault();
                // Trigger the button element with a click
                document.getElementById("idInviteBtn").click();
            }
        });
        if (props.userScopes.length > 0) {
            let scopeList = props.userScopes.map((item) => {
                let selectedScope = {};
                switch (item) {
                    case "WRITE":
                        selectedScope["description"] = "Can edit and share with others";
                        selectedScope["name"] = "Full access";
                        break;
                    case "WRITENOSHARE":
                        selectedScope["description"] = "Can edit, but not share with others";
                        selectedScope["name"] = "Can edit";
                        break;
                    case "READNCOMMENT":
                        selectedScope["description"] = "Can view and comment, but not edit";
                        selectedScope["name"] = "Can comment";
                        break;
                    case "READ":
                        selectedScope["description"] = "Cannot edit or share with others";
                        selectedScope["name"] = "Can view";
                        break;
                }
                return selectedScope;
            })
            setscopeDescList(scopeList);

            if (props.shareLinkPermission.length > 0) {
                let permissionList = props.shareLinkPermission.map((item) => {
                    let selectedItem = {};
                    switch (item) {
                        case "EDIT":
                            selectedItem["description"] = "Allow Editing";
                            selectedItem["id"] = "EDIT";
                            break;
                        case "COMMENT":
                            selectedItem["description"] = "Allow Comments";
                            selectedItem["id"] = "COMMENT";
                            break;
                        case "DUPTEMP":
                            selectedItem["description"] = "Allow duplicate as templates";
                            selectedItem["id"] = "DUPTEMP";
                            break;
                        case "SEARCH":
                            selectedItem["description"] = "Search engine indexing";
                            selectedItem["id"] = "SEARCH";
                            break;
                    }
                    return selectedItem;
                })
                setSharePermission(permissionList);
            }
        }
    }, [])

    // useEffect(() => {
    //     setemailInputValue(emailInputValue)
    // }, [emailInputValue])

    function addNewUSer() {
        let users = JSON.parse(JSON.stringify(userList));
        if (emailInputValue !== "") {
            users.push({ emailId: emailInputValue, userType: "guest", defaultPermission: defaultPermissionforUsers(), userPermission: scopeDescList })
            setemailInputValue("");
            setuserList(users)
        }
    }
    const open = Boolean(anchorEl);


    return (
        <>
            <Stack sx={{ width: "400px", padding: "10px" }}>
                <HBox sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                    <CustomInput id="idemailInput" value={emailInputValue} onChange={(oEvent) => setemailInputValue(oEvent.target.value)} />
                    <Button id="idInviteBtn" disabled={!props.addUserEnable} disableElevation disableRipple disableFocusRipple variant="contained"  size="small" onClick={() => addNewUSer()}>Invite</Button>
                </HBox>
                <Stack sx={{ maxHeight: "7rem", overflow: "overlay" }}>
                    <List>
                        {userList.length > 0 &&
                            userList.map((item, index) => (
                                <ListItem alignItems="flex-start" secondaryAction={
                                    <IconButton edge="end" size="small" disableRipple onClick={(oEvent) => { setAnchorEl(oEvent.currentTarget); setselectedUser(index); }}>
                                        <Typography sx={{ fontSize: "12px" }}>{item.defaultPermission}</Typography>
                                        <ExpandMoreIcon sx={{ width: "15px", height: "15px" }} />
                                    </IconButton>
                                }>
                                    <ListItemAvatar>
                                        <Avatar>{item.emailId.charAt(0)}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.emailId}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline', fontSize: "14px" }}
                                                    color="text.primary"
                                                >
                                                    {item.userType}
                                                </Typography>
                                                &nbsp; &middot; {item.emailId}

                                            </React.Fragment>
                                        }
                                    />

                                </ListItem>))}
                    </List>

                </Stack>
                {/* <Divider sx={{ width: "100%" }} /> */}
                <Accordion expanded={expanded} sx={{ marginTop: "10px" }} onChange={() => setExpanded(!expanded)}>
                    <AccordionSummary
                        expandIcon={<></>}
                        id="sharepanel-header"
                    >
                        <HBox justifyContent="space-between" alignItems="center" width="100%">
                            <HBox justifyContent="flex-start" alignItems="center">
                                <Avatar>W</Avatar>
                                <Stack sx={{ paddingLeft: "10px" }}>
                                    <Typography >
                                        Share to Web
                                    </Typography >
                                    <Typography sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary">Anyone with link can view</Typography>
                                </Stack>
                            </HBox>
                            <Switch />
                        </HBox>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack>
                            <HBox justifyContent="space-around" alignItems="center" width="100%">
                                <CustomInput value={props.webLink} />
                                <Button>Copy Link</Button>
                            </HBox>
                            <Accordion expanded={expandedPermissionPanel} onChange={() => setExpandedPermissionPanel(!expandedPermissionPanel)}>
                                <AccordionSummary
                                    expandIcon={<></>}
                                    id="sharepanelpermission-header"
                                >
                                    <HBox>
                                        <Typography sx={{ fontSize: "12px" }}>Show link options</Typography>
                                        <ExpandMoreIcon sx={{ width: "10px", height: "10px" }} />
                                    </HBox>
                                </AccordionSummary>
                                <AccordionDetails sx={{"& .MuiListItem-root" :{
                                    padding:"0px"
                                }}}>
                                    <List>
                                        {sharePermission.length > 0 &&
                                            sharePermission.map((item) => (
                                                <ListItem alignItems="flex-start" secondaryAction={
                                                    <Switch />
                                                }>
                                                    <ListItemText
                                                        primary={item.description}
                                                    />

                                                </ListItem>))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </AccordionDetails>
                </Accordion>


            </Stack>
            <Menu
                id="idscopeMenu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                {(scopeDescList.length > 0 && userList.length > 0) && scopeDescList.map((item) => (
                    <MenuItem onClick={() => {
                        setAnchorEl(null);
                        let users = JSON.parse(JSON.stringify(userList));
                        users[selectedUser].defaultPermission = item.name;
                        setuserList(users)
                    }}>
                        <HBox justifyContent="space-between" alignItems="center">
                            <Stack>
                                <Typography sx={{ fontSize: "14px" }}>{item.name}</Typography>
                                <Typography sx={{ fontSize: "12px", color: (theme) => theme.palette.text.secondary }}>{item.description}</Typography>
                            </Stack>
                            {item.name === userList[selectedUser].defaultPermission && <DoneIcon sx={{ width: "15px", height: "15px" }} />}
                        </HBox>
                    </MenuItem>
                ))}
            </Menu>

        </>
    )
}

export default NotionShare;