import React, { useRef } from "react";
import { env } from "./env";

const AddTarjeta = () => {
  const nombre = useRef(null);
  const numero = useRef(null);
  const dia = useRef(null);
  const tipo = useRef(null);
const enviroment = env;
    const addTarjeta = async(e) => {
        e.preventDefault()
        
        const tarjeta = {
            nombre : nombre.current.value,
            numero : numero.current.value,
            diaCorte : parseInt(dia.current.value),
            isDebito : tipo.current.value === "true"
        }
        console.log(tarjeta);
        const bodyJson = await JSON.stringify(tarjeta)
        const response = await fetch(enviroment.baseUrl+"/tarjeta/nueva",
        { 
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            mode: 'cors', // 
            body : bodyJson,
            cache: 'default',
          }
        )
        console.log(response);
        const responseJson = await response.json();
        console.log(responseJson);
    }

  return (
    <form onSubmit={addTarjeta}>
      <div class="mb-3">
        <label for="nombreTarjeta" class="form-label">
          Nombre
        </label>
        <input
          type="text"
          class="form-control"
          id="nombreTarjeta"
          aria-describedby="nombreTarjetaHelp"
          ref={nombre}
        />
        <div id="nombreTarjetaHelp" class="form-text"></div>
      </div>
      <div class="mb-3">
        <label for="numeroTarjeta" class="form-label">
          Numero
        </label>
        <input
          type="text"
          class="form-control"
          id="numeroTarjeta"
          ref={numero}
        />
      </div>
      <div class="mb-3">
        <label for="diaCorte" class="form-label">
          Dia de corte
        </label>
        <input type="number" class="form-control" id="diaCorte" ref={dia} />
      </div>
      <div class="mb-3">
        <label for="disabledSelect" class="form-label">
          Tipo Tarjeta
        </label>
        <select id="disabledSelect" class="form-select" ref={tipo}>
          <option value={true}>Debito</option>
          <option value={false}>Credito</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddTarjeta;
