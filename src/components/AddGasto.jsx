import React, { useEffect, useRef, useState } from 'react'
import { env } from './env'

function AddGasto() {

    const [tarjetas, settarjetas] = useState([])

    const nombre = useRef(null)
    const dia = useRef(null)
    const tipo = useRef(null)
    const tarjeta = useRef(null)
    const monto = useRef(null)
    const fechaFin = useRef(null)
    const enviroment = env;

    useEffect(() => {
      const getTarjetas = async() => {
        const response = await fetch(enviroment.baseUrl+"/tarjeta/tarjetas",
        { 
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            mode: 'cors', 
            cache: 'default',
          }
        )
        const responseJson = await response.json()
        console.log(responseJson);
        settarjetas(responseJson)
      }
        getTarjetas()

    }, [])
    
    const addGasto = async(e) => {
        e.preventDefault()
        
        const gasto = {
            nombre : nombre.current.value,
            diaPeriodico : parseInt(dia.current.value),
            isPeriodico : tipo.current.value === "true",
            fechaFin : fechaFin.current.value,
            monto : parseFloat(monto.current.value)
        }
        const tarjetaOb = {
            id : parseInt(tarjeta.current.value),
            gastos : [gasto],
        }
        console.log(tarjetaOb);
        const bodyJson = await JSON.stringify(tarjetaOb)
        const response = await fetch(enviroment.baseUrl+"/tarjeta/add-gasto",
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
    <form onSubmit={addGasto}>
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
        <label for="diaCorte" class="form-label">
          Dia periodico
        </label>
        <input type="number" class="form-control" id="diaCorte" ref={dia} />
      </div>
      <div class="mb-3">
        <label for="disabledSelect" class="form-label">
          Tipo gasto
        </label>
        <select id="disabledSelect" class="form-select" ref={tipo}>
          <option value={false}>No Periodico</option>
          <option value={true}>Periodico</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="disabledSelect" class="form-label">
        Tarjeta
        </label>
        <select id="disabledSelect" class="form-select" ref={tarjeta}>
          {tarjetas.map(t => {
            return (
                <option value={t.id}>{t.nombre}</option>
            )
          })}
        </select>
      </div>
      <div class="mb-3">
        <label for="numeroTarjeta" class="form-label">
          Monto
        </label>
        <input
          type="number"
          class="form-control"
          id="numeroTarjeta"
          ref={monto}
          step="0.01"
        />
      </div>
      <div class="mb-3">
        <label for="numeroTarjeta" class="form-label">
          Fecha fin
        </label>
        <input
          type="date"
          class="form-control"
          id="numeroTarjeta"
          ref={fechaFin}
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  )
}

export default AddGasto