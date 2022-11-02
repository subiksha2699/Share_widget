import NotionShare from "./components/notionShare";
import { ThemeProvider } from "styled-components";
import { customTheme } from "./utility/theme";

const App = () => {
  let userscopes = ["WRITE","WRITENOSHARE","READNCOMMENT","READ"];
  let shareLinkPermission = ["EDIT","COMMENT","DUPTEMP","SEARCH"];
  return (
    <ThemeProvider theme={customTheme}>
      <NotionShare userScopes={userscopes} addUserEnable={true} webLink={process.env['REACT_APP_webLink']} defScope="READNCOMMENT" shareLinkPermission={shareLinkPermission}/>
    </ThemeProvider>
  );
};

export default App;
