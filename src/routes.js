import { Router } from "@vaadin/router";
import "./componente-login.js"; // Import the Login component
import "./usuarios.js";
import "./campañas.js";
import "./equipos.js";

export const UserService = {
  usuariosRegistrados: [],
};

function loadUsersFromLocalStorage() {
  const data = localStorage.getItem("users");
  UserService.usuariosRegistrados = data ? JSON.parse(data) : [];
}

loadUsersFromLocalStorage();

const routes = [
  {
    path: "/",
    component: "cmp-login",
  },
  {
    path: "/usuarios",
    component: "cmp-usuarios",
  },
  {
    path: "/campanas",
    component: "cmp-campanas",
  },
  {
    path: "/equipos",
    component: "cmp-home3",
  },
];

const outlet = document.getElementById("outlet");
const router = new Router(outlet);
router.setRoutes(routes);
