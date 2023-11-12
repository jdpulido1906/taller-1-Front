import { LitElement, html } from "lit-element";
import stylesScss from "./componente-IndexStyle";
import { Router } from "@vaadin/router";
import { UserService } from "./routes";
import "./Nuevousuario";

export class Usuarios extends LitElement {
  static get properties() {
    return {
      usuariosRegistrados: { type: Array },
      usuarioEncontrado: { type: Object },
      isModalOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
    this.campañas = JSON.parse(localStorage.getItem("campañas")) || [];
    this.usuarioEncontrado = null;
    this.isModalOpen = false;
  }

  get numCampañas() {
    return this.campañas.length;
  }

  buscarUsuario() {
    const numeroInput = this.shadowRoot.querySelector("#numero").value;
    const nombreInput = this.shadowRoot.querySelector("#nombre").value;

    const usuarioEncontrado = this.usuariosRegistrados.find(
      (user) => user.numero === numeroInput && user.nombre === nombreInput
    );

    if (usuarioEncontrado) {
      this.usuarioEncontrado = usuarioEncontrado;
      this.usuariosRegistrados.push(usuarioEncontrado); // Agregar el usuario encontrado al arreglo
    } else {
      this.usuarioEncontrado = null;
      alert("No se puede realizar la consulta debido a campos vacíos");
    }
  }
  openModalCampañas() {
    const modal = this.shadowRoot.querySelector("#modalCampañas");
    const modalContent = modal.querySelector("div");
    modalContent.innerHTML = "";

    if (this.campañas.length > 0) {
      const table = document.createElement("table");
      table.classList.add("table");
      const tableHead = document.createElement("thead");
      const headRow = tableHead.insertRow();
      const headers = ["Nombre", "Equipo", "Trabajadores"];
      headers.forEach((headerText) => {
        const headCell = document.createElement("th");
        headCell.textContent = headerText;
        headRow.appendChild(headCell);
      });
      table.appendChild(tableHead);

      const tableBody = document.createElement("tbody");
      this.campañas.forEach((campaña) => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.textContent = campaña.nombre;
        cell2.textContent = campaña.equipo;
        cell3.textContent = campaña.trabajadores;
      });
      table.appendChild(tableBody);
      modalContent.appendChild(table);
    } else {
      const message = document.createElement("p");
      message.textContent = "No hay campañas registradas actualmente.";
      modalContent.appendChild(message);
    }

    const closeButton = document.createElement("button");
    closeButton.textContent = "Cerrar";
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
    modalContent.appendChild(closeButton);

    modal.style.display = "block";
  }

  usuarios() {
    Router.go("/usuarios");
  }

  campanas() {
    Router.go("/campanas");
  }

  equipos() {
    Router.go("/equipos");
  }

  login() {
    Router.go("/");
  }

  NuevoUsuario() {
    this.isModalOpen = true;
  }

  handleFormSubmit() {
    const form = this.shadowRoot.querySelector("form");
    const nombre = form.querySelector("#nombre").value;
    const apellido = form.querySelector("#apellido").value;
    const numeroTelefono = form.querySelector("#numeroTelefono").value;
    const email = form.querySelector("#email").value;
    const contraseña = form.querySelector("#contraseña").value;
    const campañaSeleccionada = form.querySelector("#campaña").value;

    if (
      nombre &&
      apellido &&
      numeroTelefono &&
      email &&
      contraseña &&
      campañaSeleccionada
    ) {
      const nuevoUsuario = {
        nombre: nombre,
        apellido: apellido,
        numero: numeroTelefono,
        email: email,
        contraseña: contraseña,
        campaña: campañaSeleccionada,
      };
      this.usuariosRegistrados.push(nuevoUsuario);
      this.isModalOpen = false;
      this.requestUpdate(); // Actualiza la interfaz para mostrar los nuevos datos
    } else {
      alert("Por favor, complete todos los campos del formulario.");
    }
    localStorage.setItem("usuarios", JSON.stringify(this.usuariosRegistrados));
  }

  static get styles() {
    return [stylesScss];
  }
  get numCampañasActivas() {
    if (this.campañas) {
      return this.campañas.filter((campaña) => campaña.activo).length;
    } else {
      return 0;
    }
  }
  activarUsuario(user) {
    const updatedUsuarios = this.usuariosRegistrados.map((u) => {
      if (u === user) {
        return { ...u, activo: true }; // Create a new object with activo set to true
      }
      return u;
    });
    this.usuariosRegistrados = updatedUsuarios;
  }

  desactivarUsuario(user) {
    const updatedUsuarios = this.usuariosRegistrados.map((u) => {
      if (u === user) {
        return { ...u, activo: false }; // Create a new object with activo set to false
      }
      return u;
    });
    this.usuariosRegistrados = updatedUsuarios;
  }

  llamarUsuario() {
    alert("Llamado");
  }
  get numUsuariosAusentes() {
    return this.usuariosRegistrados.filter((user) => !user.activo).length;
  }
  get numUsuariosActivos() {
    return this.usuariosRegistrados.filter((user) => user.activo).length;
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

      <div class="d-flex">
        <div class="pt-2 d-flex justify-content-left">
          <div
            class="d-flex flex-shrink-0 p-3 ml-5"
            style="width: 250px; background-color: rgb(201, 205, 207); border-radius: 1rem; height: 36rem;"
          >
            <hr />
            <ul class="nav nav-pills flex-column mb-auto" style="width: 25rem;">
              <li class="nav-item">
                <a
                  href="#"
                  @click=${(e) => this.usuarios()}
                  class="nav-link active bg-light pt-2 font-weight-bold"
                  style="color: grey; border-radius: 10px; height: 45px; font-size: 18px;"
                  aria-current="page"
                >
                  <i class="fas fa-user me-2"></i> Usuarios
                </a>
              </li>
              <li class="nav-item pt-3">
                <a
                  href="#"
                  @click=${(e) => this.campanas()}
                  class="nav-link active bg-light pt-2 font-weight-bold"
                  style="color: grey; border-radius: 10px; height: 45px; font-size: 18px;"
                  aria-current="page"
                >
                  <i class="fas fa-building me-2"></i> Campañas
                </a>
              </li>
              <li class="nav-item pt-3">
                <a
                  href="#"
                  @click=${(e) => this.equipos()}
                  class="nav-link active bg-light pt-2 font-weight-bold"
                  style="color: grey; border-radius: 10px; height: 45px; font-size: 18px;"
                  aria-current="page"
                >
                  <i class="fas fa-users me-2"></i> Equipos
                </a>
              </li>
            </ul>
            <hr />
          </div>
        </div>
        &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
        <div class="pt-2">
          <div class="d-flex justify-content-left">
            &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
            <div class="row d-flex">
              <div class="row g-0 text-center pt-3">
              <div id="cajas" class="col-sm-6 col-md-4">${this.numUsuariosActivos
      }</div>
                <div id="cajas2" class="col-md-5 pt-2">Usuarios Conectados</div>
              </div>
              &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
              <div class="row g-0 text-center pt-3">
                <div id="cajas" class="col-sm-6 col-md-4">
                  ${this.numUsuariosAusentes}
                </div>
                <div id="cajas2" class="col-md-5 pt-2">Usuarios Ausentes</div>
              </div>
              &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
              <div class="row g-0 text-center pt-3">
                <div id="cajas" class="col-sm-6 col-md-4">
                  ${this.numCampañasActivas}
                </div>
                <div id="cajas2" class="col-md-5 pt-2">Campañas Activas</div>
              </div>
              &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
              <div class="row g-0 pt-3">
                <div id="cajas" class="col-sm-6 col-md-4">10</div>
                <div id="cajas2" class="col-md-5 pt-2">Llamadas Realizadas</div>
              </div>
            </div>
          </div>
          <br />

          <div id="cuadro" class="container border border-dark ml-2">
            <div class="d-flex p-3">
              <div
                class="border border-dark"
                style="width: 14rem; height: rem; border-radius: 1rem;"
              >
                <div>
                  <div
                    class="d-flex flex-shrink-0 p-3"
                    style="width: 222px; background-color: rgb(201, 205, 207); border-top-left-radius: 1rem; border-top-right-radius: 1rem; height: 10rem; "
                  >
                    <hr />
                    <ul
                      class="nav nav-pills flex-column mb-auto"
                      style="width: 25rem;"
                    >
                      <div class="input-group mt-1" style="width: 12rem;">
                        <input
                          id="numero"
                          class="form-control font-weight-bold"
                          type="number"
                          placeholder="Número"
                        />
                      </div>
                      <div class="input-group mt-3" style="width: 12rem;">
                        <input
                          id="nombre"
                          class="form-control font-weight-bold"
                          type="text"
                          placeholder="Nombre"
                        />
                      </div>
                      <div class="d-flex justify-content-center">
                        <button
                          @click=${this.buscarUsuario}
                          class="mt-2 text-center"
                          style="width: 5rem; border-radius: 5px; border: rgb(52, 58, 64); background-color: rgb(52, 58, 64); color: white;"
                        >
                          Buscar
                        </button>
                      </div>
                      <div
                        class="container border border-dark mt-4"
                        style="width: 12rem; height: 16rem;"
                      >
                        <div id="usuarioEncontrado" class="text-center mt-2">
                          <cmp-nuevo-usuario
                            ?isModalOpen=${this.isModalOpen}
                            @close=${this.closeModal}
                          ></cmp-nuevo-usuario>

                         ${this.usuarioEncontrado
                            ? html`
                        <p>Nombre: ${this.usuarioEncontrado.nombre}</p>
                        <p>Apellido: ${this.usuarioEncontrado.apellido}</p>
                        <p>Correo: ${this.usuarioEncontrado.email}</p>
                        <p>Campaña: ${this.usuarioEncontrado.campaña}</p> <!-- Corrected from .campaign to .campaña -->
                        <button
                        @click="${this.llamarUsuario}" 
                          class="mt-2 text-center"
                          style="width: 5rem; border-radius: 5px; border: rgb(52, 58, 64); background-color: rgb(52, 58, 64); color: white;"
                        >
                          Llamar
                        </button>
                      `
                            : ""
      }
                        </div>
                      </div>
                    </ul>
                    <hr />
                  </div>
                </div>
              </div>
              <div>
                <div class="d-flex justify-content-around">
                  <div class="ml-5 d-flex justify-content-around">
                    <div class="row g-0 text-center pt-1">
                      <button
                        id="btnFiltrar"
                        @click=${this.openModalCampañas}
                        class="col-sm-6 col-md-4 border border-secondary font-weight-bold"
                        style="font-size: 19px; height: 68px; border-radius: 7px;"
                      >
                        Filtrar por campaña
                      </button>
                      <div
                        id="modalCampañas"
                        style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 9999;"
                      >
                        <div
                          style="background-color: white; width: 50%; height: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; border-radius: 10px;"
                        >
                          <h2>Campañas Disponibles</h2>
                          <ul>
                         ${this.campañas.map( (campaña) => html`<li>${campaña}</li>`
      )}
                          </ul>
                          <button
                            @click=${this.closeModalCampañas}
                            style="padding: 10px; border: none; background-color: #343A40; color: white; border-radius: 5px; cursor: pointer; margin-top: 20px;"
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                      <button
                        class="mt-1 text-center"
                        style=" width: 70px; height: 40px; border-radius: 5px; border: rgb(52, 58, 64); background-color:  rgb(52, 58, 64); color: white;"
                        @click=${this.NuevoUsuario}
                      >
                        Nuevo
                      </button>
                      <div
                        id="modal"
                        class="modal"
                        style="display: ${this.isModalOpen ? "block" : "none"};"
                      >
                        <div class="modal-content">
                          <div class="modal-header">
                            <h2>Registro Usuario</h2>
                            <span class="close" @click=${this.closeModal}
                              >&times;</span
                            >
                          </div>
                          <div class="modal-body">
                            <form>
                              <input
                                id="nombre"
                                type="text"
                                placeholder="Nombre"
                                required
                              /><br />
                              <input
                                id="apellido"
                                type="text"
                                placeholder="Apellido"
                                required
                              /><br />
                              <input
                                id="numeroTelefono"
                                type="number"
                                placeholder="Número Teléfono"
                                required
                              /><br />
                              <input
                                id="email"
                                type="email"
                                placeholder="Email"
                                required
                              /><br />
                              <input
                                id="contraseña"
                                type="password"
                                placeholder="Contraseña"
                                required
                              /><br />
                              <select id="campaña" required>
                                <option value="tigo">Tigo</option>
                                <option value="claro">Claro</option>
                                <option value="movistar">
                                  Movistar
                                </option></select
                              ><br />
                              <button @click=${this.handleFormSubmit}>
                                Registrar Usuario
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="container border border-dark mt-4 ml-4"
                  style="border-radius: 1rem; width: 35rem; height: 29rem;"
                >
                 
                    <table
                      class="table table-bordered mt-4 ml-4"
                      style="border-radius: 1rem; width: 30rem;"
                    >
                      <thead>
                        <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Teléfono</th>
                          <th scope="col">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${this.usuariosRegistrados
                              ? this.usuariosRegistrados.map(
                                (user, index) => html`
                                <tr>
                                  <td>${user.nombre}</td>
                                  <td>${user.numero}</td>
                                  <td>${user.campaña}</td> <!-- Add this line for campaign -->
                                  <td>
                                    ${user.activo
                                    ? html`
                                          <button
                                            @click="${() => this.desactivarUsuario(user)}"
                                          >
                                            Desactivar
                                          </button>
                                        `
                                    : html`
                                          <button
                                            @click="${() => this.activarUsuario(user)}"
                                          >
                                            Activar
                                          </button>
                                        `}
                                  </td>
                                </tr>
                              `
                              )
                              : html``
                            }
                      </tbody>
                    </table>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("cmp-usuarios", Usuarios);
