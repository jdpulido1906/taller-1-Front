import { LitElement, html } from "lit-element";
import { UserService } from "./routes";

export class NuevoUsuario extends LitElement {
  static get properties() {
    return {
      isModalOpen: { type: Boolean },
      selectedCampaign: { type: String },
      campaigns: { type: Array },
    };
  }

  constructor() {
    super();
    this.isModalOpen = false;
    this.selectedCampaign = "";
    this.campaigns = ["Tigo", "Claro", "Movistar"];
  }

  open() {
    this.isModalOpen = true;
  }

  close() {
    this.isModalOpen = false;
  }

  handleRegistration() {
    const nombre = this.shadowRoot.querySelector("#nombre").value;
    const apellido = this.shadowRoot.querySelector("#apellido").value;
    const numero = this.shadowRoot.querySelector("#numero").value;
    const email = this.shadowRoot.querySelector("#email").value;
    const password = this.shadowRoot.querySelector("#password").value;

    if (
      !nombre ||
      !apellido ||
      !email ||
      !password ||
      !numero ||
      !this.selectedCampaign
    ) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Registra el usuario en el servicio UserService
    const newUser = {
      nombre,
      apellido,
      numero,
      email,
      password,
      campaign: this.selectedCampaign,
    };
    UserService.usuariosRegistrados.push(newUser);
    this.saveUsuariosToLocalStorage();

    alert("Usuario registrado correctamente.");
    this.close();
  }

  saveUsuariosToLocalStorage() {
    localStorage.setItem(
      "users",
      JSON.stringify(UserService.usuariosRegistrados)
    );
  }

  render() {
    return html`
      <!-- Ventana modal -->
      <div
        class="modal fade"
        ?class=${this.isModalOpen ? "show" : ""}
        tabindex="-1"
        role="dialog"
        style="display: ${this.isModalOpen ? "block" : "none"};"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Registro Usuario</h5>
            </div>
            <div class="modal-body">
              <div class="input-group mt-1">
                <input
                  id="nombre"
                  class="form-control font-weight-bold"
                  type="text"
                  placeholder="Nombre"
                  required
                  style="width: 10rem; border-radius: 5px; border: 1px solid rgb(52, 58, 64); background-color: #f2f2f2; color: #333;"
                />
              </div>
              <div class="input-group mt-1">
                <input
                  id="apellido"
                  class="form-control font-weight-bold"
                  type="text"
                  placeholder="Apellido"
                  required
                  style="width: 10rem; border-radius: 5px; border: 1px solid rgb(52, 58, 64); background-color: #f2f2f2; color: #333;"
                />
              </div>
              <div class="input-group mt-1">
                <input
                  id="numero"
                  class="form-control font-weight-bold"
                  type="number"
                  placeholder="Número Teléfono"
                  required
                  style="width: 10rem; border-radius: 5px; border: 1px solid rgb(52, 58, 64); background-color: #f2f2f2; color: #333;"
                />
              </div>
              <div class="input-group mt-1">
                <input
                  id="email"
                  class="form-control font-weight-bold"
                  type="email"
                  placeholder="Email"
                  required
                  style="width: 10rem; border-radius: 5px; border: 1px solid rgb(52, 58, 64); background-color: #f2f2f2; color: #333;"
                />
              </div>
              <div class="input-group mt-1">
                <input
                  id="password"
                  class="form-control font-weight-bold"
                  type="password"
                  placeholder="Contraseña"
                  required
                  style="width: 10rem; border-radius: 5px; border: 1px solid rgb(52, 58, 64); background-color: #f2f2f2; color: #333;"
                />
              </div>
              <div class="input-group mt-1">
                <select
                  id="campaign"
                  class="form-select font-weight-bold"
                  @change=${(e) => (this.selectedCampaign = e.target.value)}
                  style="width: 10rem; border-radius: 5px; border: 1px solid rgb(52, 58, 64); background-color: #f2f2f2; color: #333;"
                >
                  <option value="" selected>Seleccione una campaña</option>
                  ${this.campaigns.map(
                    (campaign) => html`
                      <option value=${campaign}>${campaign}</option>
                    `
                  )}
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button
                @click=${this.handleRegistration}
                class="btn btn-primary"
                style="width: 5rem; border-radius: 5px; border: rgb(52, 58, 64); background-color: rgb(52, 58, 64); color: white;"
              >
                Registrar
              </button>
              <button
                @click=${this.close}
                class="btn btn-secondary"
                style="width: 5rem; border-radius: 5px; border: rgb(52, 58, 64); background-color: rgb(52, 58, 64); color: white;"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("cmp-nuevo-usuario", NuevoUsuario);
