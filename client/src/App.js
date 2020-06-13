import React, { useContext, useState } from "react";
import Header from "./Views/Shared/Header";
import { NotificationContainer } from "react-notifications";
import { Container } from "react-bootstrap";

import { mainContext } from "./stores/Context";
import AppRouter from "./helpers/AppRouter";
// import Overlay from "./components/Shared/Overlay";

function App() {
  const { AppStore } = useContext(mainContext);
  const [store] = useState(AppStore);

  return (
    <div className="App">
      <NotificationContainer />
      <Header store={store} />
      <Container>
        <AppRouter store={store} />
      </Container>
      {/* <Overlay /> */}
    </div>
  );
}

export default App;
