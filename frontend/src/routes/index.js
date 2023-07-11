import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { pages } from "./pages.js";

export default function routes() {
  const routeHandler = (pagenames, prefix = "") => {
    return pagenames.map((route) => {
      if (!route.children) {
        return (
          <Route
            key={`${prefix}${route.path}`}
            path={`${prefix}${route.path}`}
            exact={route.exact}
            element={
              <route.layout>
                <route.element />
              </route.layout>
            }
          />
        );
      }
      return routeHandler(route.children, route.path);
    });
  };

  return (
    <Router>
      <Routes>
        {routeHandler(pages)}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}
