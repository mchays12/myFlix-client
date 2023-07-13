import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";

// Import statement to indicate that you need to bundle `./index.scss`
import "bootstrap/dist/css/bootstrap.min.scss";
import "./index.scss";

//Main component (will eventually use all the other)
const MyFlixApplication = () => {
  return <MainView />
};

//Find the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);

