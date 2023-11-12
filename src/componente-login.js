import { LitElement, html } from "lit-element";
import stylesScss from "./componte-loginStyle";
import { Router } from "@vaadin/router";

export class Login extends LitElement {
  constructor() {
    super();
    this.usuarioPredefinido = {
      email: "jeferson@gmail.com",
      password: "123456789",
    };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("DOMContentLoaded", () => {
      const emailInput = this.shadowRoot.querySelector("#container-email");
      const passwordInput = this.shadowRoot.querySelector(
        "#container-password"
      );
      const rememberMeCheckbox =
        this.shadowRoot.querySelector(".form-check-input");

      if (rememberMeCheckbox) {
        rememberMeCheckbox.addEventListener("change", (event) => {
          if (event.target.checked) {
            localStorage.setItem("rememberedEmail", emailInput.value);
            localStorage.setItem("rememberedPassword", passwordInput.value);
          } else {
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
          }
        });
      }

      const rememberedEmail = localStorage.getItem("rememberedEmail");
      const rememberedPassword = localStorage.getItem("rememberedPassword");

      if (
        rememberedEmail &&
        rememberedPassword &&
        emailInput &&
        passwordInput &&
        rememberMeCheckbox
      ) {
        emailInput.value = rememberedEmail;
        passwordInput.value = rememberedPassword;
        rememberMeCheckbox.checked = true;
      }
    });
  }

  static get styles() {
    return [stylesScss];
  }

  login() {
    const emailInput = this.shadowRoot.querySelector("#container-email").value;
    const passwordInput = this.shadowRoot.querySelector(
      "#container-password"
    ).value;

    if (!emailInput || !passwordInput) {
      alert("Por favor, complete todos los campos.");
    } else if (
      emailInput === this.usuarioPredefinido.email &&
      passwordInput === this.usuarioPredefinido.password
    ) {
      alert("¡Acceso concedido! Bienvenido.");
      if (this.shadowRoot.querySelector(".form-check-input").checked) {
        localStorage.setItem("rememberedEmail", emailInput);
        localStorage.setItem("rememberedPassword", passwordInput);
      }
      Router.go("/usuarios");
    } else {
      alert("Credenciales no válidas. Inténtelo de nuevo.");
    }
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

      <div
        class="d-flex justify-content-center align-items-center vh-100"
        style="background: "
      >
        <div>
          <div
            id="form"
            style="width: 28rem; height: 18rem; text-align: center; position: relative;"
          >
            <img
              src="./src/img/login-icon.svg"
              alt="icono-de-login"
              style="height: 10rem; position: absolute; top: -5rem; left: 50%; transform: translateX(-50%);"
            />

            <div class="input-group mt-3" style="width: 20rem; right: 11%;">
              <div class="input-group-text" style="background-color: #343a40;">
                <img
                  src="./src/img/username-icon.svg"
                  alt="username-icon"
                  style="height: 1rem;"
                />
              </div>
              <input
                id="container-email"
                class="form-control font-weight-bold"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div class="input-group mt-3" style="width: 20rem; right: 11%;">
              <div class="input-group-text" style="background-color: #343a40;">
                <img
                  src="./src/img/password-icon.svg"
                  alt="username-icon"
                  style="height: 1rem"
                />
              </div>
              <input
                id="container-password"
                class="form-control font-weight-bold"
                type="password"
                placeholder="Contraseña"
                required
              />
            </div>

            <div class="d-flex justify-content-around mt-3">
              <div class="d-flex align-items-center">
                <input class="form-check-input" type="checkbox" />
                <div class="pt-1 font-weight-bold">Recuérdame</div>
              </div>
              &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
              <div class="pt-1">
                <a
                  class="text-decoration-none text-dark font-weight-bold"
                  style="font-size: 0.8rem"
                >
                  Registrarse
                </a>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center ">
            <button
              @click=${(e) => this.login()}
              id="form2"
              class="p-2 mt-1 font-weight-bold rounded-top text-center"
              style="font-size: 1.3rem; width: 20rem;"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("cmp-login", Login);
