import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TasksPage from './pages/Tasks';
import HomePage from './pages/Home';
import LoginPage, {action as loginPageAcion} from './pages/Login';
import RegisterPage, {action as registerPageAction} from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {index: true, element:<HomePage/>},
      {path: "login", element:<LoginPage/>, action: loginPageAcion},
      {path: "register", element:<RegisterPage/>, action: registerPageAction},
      {path: ":userId", element: <TasksPage/>}
    ],
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
