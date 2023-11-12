import { LitElement, html } from "lit-element";
import stylesScss from "./componente-IndexStyle";
import { Router } from "@vaadin/router";

export class equipos extends LitElement {
  static get properties() {
    return {
      equipos: { type: Array },
    };
  }

  static get styles() {
    return [stylesScss];
  }

  constructor() {
    super();
    const storedEquipos = localStorage.getItem("equipos");
    this.equipos = storedEquipos ? JSON.parse(storedEquipos) : [];
  }

  get numEquipos() {
    return this.equipos ? this.equipos.length : 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
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

  NuevoEquipo() {
    const modal = this.shadowRoot.getElementById("modal");
    modal.style.display = "block";
  }

  closeModal() {
    const modal = this.shadowRoot.getElementById("modal");
    modal.style.display = "none";
  }

  enviar() {
    const form = this.shadowRoot.querySelector("form");
    const nombre = form.querySelector("#nombreEquipo").value;
    const director = form.querySelector("#director").value;
    const empresa = form.querySelector("#empresa").value;
    const equipo = form.querySelector("#equipo").value;

    if (nombre && director && equipo && empresa) {
      const nuevoEquipo = {
        nombre: nombre,
        director: director,
        equipo: equipo,
        empresa: empresa,
        activo: true,
      };
      this.equipos.push(nuevoEquipo);
      localStorage.setItem("equipos", JSON.stringify(this.equipos));
      this.closeModal();
      this.requestUpdate();
    } else {
      alert("Debe ingresar todos los datos de los equipos.");
    }
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

      <!-- Sidebar-->
      <div class="d-flex ">
        <div class="pt-2 d-flex justify-content-left ">
          <div
            class="d-flex  fl<iex-shrink-0 p-3 ml-5"
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
        <!-- cajas de texto-->
        <div class="pt-2  align-items-center">
          <div class="d-flex justify-content-left ">
            &nbsp&nbsp&nbsp &nbsp&nbsp&nbsp
            <div class="row d-flex">
              <div class="row g-0 text-center pt-3 ">
                <div id="cajas" class="col-sm-6 col-md-4">
                ${this.numEquipos}
                </div>
                <div id="cajas2" class="col-md-5  pt-2">
                
                Equipos creados
                </div>
              </div>
            </div>
          </div>
          <br />

          <div id="cuadro" class="container border border-dark ml-1">
            <div class="d-flex p-3">
              <div>
                <div class="row">
                  <div class=" ml-5">
                    <div class="row g-0 text-center pt-1 ">
                      <div
                        class="col-sm-6 col-md-4 pt-2 border border-secondary font-weight-bold"
                        style="width: 40rem; font-size: 20px; height: 3rem; border-radius: 7px;"
                      >
                        Equipos
                      </div>
                      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                      <button
                        @click=${this.NuevoEquipo}
                        class="mt-1 text-center"
                        style=" width: 70px; height: 40px; border-radius: 5px; border: rgb(52, 58, 64); background-color: rgb(52, 58, 64); color: white;"
                      >
                        Nuevo
                      </button>
                    </div>
                  </div>
                  <!-- Ventana modal -->
      <div id="modal" class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Nueva Equipo</h2>
            <span class="close" @click=${this.closeModal}>&times;</span>
          </div>
          <div class="modal-body">
            <form>
              <input
                id="nombreEquipo"
                type="text"
                placeholder="Nombre del Equipo"
                required
              /><br />
              <input
                id="director"
                type="text"
                placeholder="Nombre del director"
                required
              /><br />
              <input
                id="equipo"
                type="text"
                placeholder="Equipo"
                required
              /><br />
              <input
                id="empresa"
                type="text"
                placeholder="empresa"
                required
              /><br />
              <button @click=${this.enviar}>Agregar Equipo</button>
            </form>
          </div>
        </div>
      </div>
                </div>
                <div
                  class="container border border-dark mt-4 ml-4"
                  style="border-radius: 1rem; width: 50rem; height: 30rem;"
                >
                <h3>Lista de Equipos</h3>
                <table class="table table-bordered mt-4 ml-4" style="border-radius: 1rem; width: 42rem;">
                  <thead>
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">director</th>
                      <th scope="col">Equipo</th>
                      <th scope="col">empresa</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    ${this.equipos.map(
                      (equipos, index) => html`
                        <tr style="color: ${equipos.activo ? "green" : "red"};">
                          <td>${equipos.nombre}</td>
                          <td>${equipos.director}</td>
                          <td>${equipos.equipo}</td>
                          <td>${equipos.empresa}</td>
                        </tr>
                      `
                    )}
                  </tbody>
                </table>
              </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("cmp-home3", equipos);
