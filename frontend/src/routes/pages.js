import GeneralWrapper from "../components/hoc/GeneralWrapper";
import { Login } from "../components/ui/organisms/Login";
import Register from "../components/ui/organisms/Register";
import Documents from "../components/ui/organisms/Documents";
import Profile from "../components/ui/organisms/Profile/Profile";
import Document from "../components/ui/organisms/Document";
import SharedDocuments from "../components/ui/organisms/SharedDocuments";

export const pages = [
  {
    path: "/login",
    exact: true,
    layout: GeneralWrapper,
    element: Login,
  },
  {
    path: "/register",
    exact: true,
    layout: GeneralWrapper,
    element: Register,
  },
  {
    path: "/document/:document",
    exact: true,
    layout: GeneralWrapper,
    element: Document,
  },
  {
    path: "/documents",
    exact: true,
    layout: GeneralWrapper,
    element: Documents,
  },
  {
    path: "/documents/shared",
    exact: true,
    layout: GeneralWrapper,
    element: SharedDocuments,
  },
  {
    path: "/my-profile",
    exact: true,
    layout: GeneralWrapper,
    element: Profile,
  },
];
