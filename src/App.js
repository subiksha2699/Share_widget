import NotionShare from "./components/notionShare";
import { ThemeProvider } from "styled-components";
import { customTheme } from "./utility/theme";

const App = () => {
  let userscopes = ["WRITE","WRITENOSHARE","READNCOMMENT","READ"];
  return (
    <ThemeProvider theme={customTheme}>
      <NotionShare userScopes={userscopes} defScope="READNCOMMENT"/>
    </ThemeProvider>
  );
};

export default App;
