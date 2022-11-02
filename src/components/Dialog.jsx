
import Popover from '@mui/material/Popover';
import NotionShare from "./notionShare";


export default function Dialog(props) {
    let userscopes = ["WRITE", "WRITENOSHARE", "READNCOMMENT", "READ"];
    let shareLinkPermission = ["EDIT", "COMMENT", "DUPTEMP", "SEARCH"];

    //necessary props to generate notionshare component are userScopes,addUserEnable,webLink,defScope,shareLinkPermission
    //sample values of these props are given above
    //notion share component can be reused anywhere else with the given props
    //here I am loading the notionsshare component in a popup, in the same way it can added in any other component
    //Here Im a using a Custom Inpu which again can be reused like NotionShare component
    
    return (
        <div>
            <Popover
                id="notionSharepopup"
                open={props.open}
                anchorEl={props.anchorEl}
                onClose={props.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <NotionShare userScopes={userscopes} addUserEnable={true} webLink={process.env['REACT_APP_webLink']} defScope="READNCOMMENT" shareLinkPermission={shareLinkPermission} />
            </Popover>
        </div>
    );
}
