
import Popover from '@mui/material/Popover';
import NotionShare from "./notionShare";


export default function Dialog(props) {
    let userscopes = ["WRITE", "WRITENOSHARE", "READNCOMMENT", "READ"];
    let shareLinkPermission = ["EDIT", "COMMENT", "DUPTEMP", "SEARCH"];

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
