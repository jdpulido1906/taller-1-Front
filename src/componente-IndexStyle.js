import { css } from "lit-element";

export default css`
  #cajas {
    height: 70px;
    font-size: 40px;
    font-weight: bold;
    background-color: #343a40;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    color: white;
  }
  #btnFiltrar {
    width: 700px;
  }
  #pt {
    padding-top: 210px;
  }
  #cajas2 {
    width: 200px;
    height: 70px;
    font-size: 15px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #c9c7c7;
    color: black;
  }
  #cuadro {
    width: 55rem;
    height: 40rem;
    border-radius: 1rem;
    border-color: black;
  }
  .user-list {
    list-style: none;
    padding: 0;
  }

  .user-item {
    border-bottom: 1px solid #ccc;
    padding: 10px;
  }
  /* Estilos personalizados de la ventana modal */
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 40%;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  /* Estilos adicionales para el formulario en la ventana modal */
  form {
    display: flex;
    flex-direction: column;
  }

  input {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #343a40;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #343a40;
  }
`;
