import AnyChart from "anychart-react";
import anychart from "anychart";
import React, { useEffect, useState } from "react";
import { env } from "./env";

const Resumen = () => {
  const [tarjetas, settarjetas] = useState([]);
  const [gastosf, setgastosf] = useState(0.0);
  const [ingresosf, setingresosf] = useState(0.0);
  const [saldos, setsaldos] = useState(0.0);
  const [gastosTotales, setgastosTotales] = useState(0.0);
  const enviroment = env;
  const [grafica, setgrafica] = useState({});
  const [grafica2, setgrafica2] = useState({});
  const [grafica3, setgrafica3] = useState({});

  useEffect(() => {
    const getTarjetas = async () => {
      const response = await fetch(enviroment.baseUrl + "/tarjeta/tarjetas", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        mode: "cors",
        cache: "default",
      });

      await fetch(enviroment.baseUrl + "/tarjeta/actualizar", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        mode: "cors",
        cache: "default",
      });
      const responseJson = await response.json();
      let gf = 0;
      let iff = 0;
      let sal = 0;
      let gt = 0;
      const actualizarTarjetas = responseJson.map((t) => {
        const fecha = new Date();

        let fechaCorte = new Date();
        fechaCorte.setDate(t.diaCorte - 1);

        if (fechaCorte.getMonth === 0) {
          fechaCorte.setMonth(11);
          fechaCorte.setFullYear(fechaCorte.getFullYear() - 1);
        } else {
          fechaCorte.setMonth(fechaCorte.getMonth() - 1);
        }

        const gastosT = t.gastos.filter(
          (g) =>
            !g.isPeriodico && new Date(g.fecha).getTime() > fechaCorte.getTime()
        );
        if (gastosT.length === 0) {
          t = { ...t, gastosVariables: 0.0 };
        } else {
          let gastos = 0.0;
          for (let i = 0; i < gastosT.length; i++) {
            gastos = gastos + gastosT[i].monto;
            gt = gt + gastosT[i].monto;
          }
          t = { ...t, gastosVariables: gastos };
        }

        if (t.isDebito) {
          sal = sal + t.saldo;
        }

        const gastosFijos = t.gastos.filter(
          (g) =>
            g.isPeriodico &&
            g.fechaFin &&
            new Date(g.fechaFin).getTime() > fecha.getTime()
        );
        const ingresosFijos = t.ingresos.filter((i) => i.isPeriodico);
        if (gastosFijos.length === 0) {
          t = { ...t, gastosFijos: 0.0 };
        } else {
          let gastos = 0.0;
          for (let i = 0; i < gastosFijos.length; i++) {
            gastos = gastos + gastosFijos[i].monto;
            gf = gf + gastosFijos[i].monto;
          }
          t = { ...t, gastosFijos: gastos };
        }

        if (ingresosFijos.length === 0) {
          t = { ...t, ingresosFijos: 0.0 };
        } else {
          let gastos = 0.0;
          for (let i = 0; i < ingresosFijos.length; i++) {
            gastos = gastos + ingresosFijos[i].monto;
            iff = iff + ingresosFijos[i].monto;
          }
          t = { ...t, ingresosFijos: gastos };
        }

        return t;
      });

      settarjetas(actualizarTarjetas);
      setgastosf(gf);
      setingresosf(iff);
      setsaldos(sal);
      setgastosTotales(gt);

      let dataGraf = [];
      let dataGraf2 = [];
      let dataGraf3 = [];
      let acum1 = 0;
      let acum2 = 0;
      for (let i = 0; i < 12; i++) {
        const tot = getGrafica(i, responseJson);
        dataGraf = [...dataGraf, tot];
        acum1 = acum1 + 35000 - tot - 5000
        acum2 = acum2 + 35000 - tot - 10000
        dataGraf2 = [...dataGraf2, acum1];
        dataGraf3 = [...dataGraf3, acum2];
      }

      setgrafica(dataGraf);
      setgrafica2(dataGraf2);
      setgrafica3(dataGraf3);
    };
      getTarjetas();
  }, []);

  const getGrafica = (i, tarjetass) => {
    let gf = 0;
    let iff = 0;
    let sal = 0;
    let gt = 0;
    const actualizarTarjetas = tarjetass.map((t) => {
      let fecha = new Date();
      fecha.setMonth(fecha.getMonth() + i);
      console.log(fecha);
      let fechaCorte = fecha;
      fechaCorte.setDate(t.diaCorte - 1);

      if (fechaCorte.getMonth === 0) {
        fechaCorte.setMonth(11);
        fechaCorte.setFullYear(fechaCorte.getFullYear() - 1);
      } else {
        fechaCorte.setMonth(fechaCorte.getMonth() - 1);
      }

      const gastosT = t.gastos.filter(
        (g) =>
          !g.isPeriodico && new Date(g.fecha).getTime() > fechaCorte.getTime()
      );
      if (gastosT.length === 0) {
        t = { ...t, gastosVariables: 0.0 };
      } else {
        let gastos = 0.0;
        for (let i = 0; i < gastosT.length; i++) {
          gastos = gastos + gastosT[i].monto;
          gt = gt + gastosT[i].monto;
        }
        t = { ...t, gastosVariables: gastos };
      }

      if (t.isDebito) {
        sal = sal + t.saldo;
      }

      const gastosFijos = t.gastos.filter(
        (g) =>
          g.isPeriodico &&
          g.fechaFin &&
          new Date(g.fechaFin).getTime() > fecha.getTime()
      );
      const ingresosFijos = t.ingresos.filter((i) => i.isPeriodico);
      if (gastosFijos.length === 0) {
        t = { ...t, gastosFijos: 0.0 };
      } else {
        let gastos = 0.0;
        for (let i = 0; i < gastosFijos.length; i++) {
          gastos = gastos + gastosFijos[i].monto;
          gf = gf + gastosFijos[i].monto;
        }
        t = { ...t, gastosFijos: gastos };
      }

      if (ingresosFijos.length === 0) {
        t = { ...t, ingresosFijos: 0.0 };
      } else {
        let gastos = 0.0;
        for (let i = 0; i < ingresosFijos.length; i++) {
          gastos = gastos + ingresosFijos[i].monto;
          iff = iff + ingresosFijos[i].monto;
        }
        t = { ...t, ingresosFijos: gastos };
      }

      return t;
    });
    return gf;
  };

  return (
    <div class="container ">
      <div class="card text-center mb-4">
        <div class="card-header">General</div>
        <div class="card-body">
          <p class="card-text">
            Saldo : ${(Math.round(saldos * 100) / 100).toFixed(2)}
          </p>
          <p class="card-text">
            Gastos Fijos : ${(Math.round(gastosf * 100) / 100).toFixed(2)}
          </p>

          <p class="card-text">
            Gastos Acumulados : $
            {(Math.round(gastosTotales * 100) / 100).toFixed(2)}
          </p>

          <p class="card-text">
            Ingresos Fijos : ${(Math.round(ingresosf * 100) / 100).toFixed(2)}
          </p>
        </div>
      </div>
      {tarjetas.map((t) => {
        return (
          <div class="card text-center mb-4">
            <div class="card-header">{t.nombre}</div>
            <div class="card-body">
              <p class="card-text">
                Saldo : ${(Math.round(t.saldo * 100) / 100).toFixed(2)}
              </p>
              <p class="card-text">
                Gastos Fijos : $
                {(Math.round(t.gastosFijos * 100) / 100).toFixed(2)}
              </p>

              <p class="card-text">
                Gastos Variables : $
                {(Math.round(t.gastosVariables * 100) / 100).toFixed(2)}
              </p>

              <p class="card-text">
                Ingresos Fijos : $
                {(Math.round(t.ingresosFijos * 100) / 100).toFixed(2)}
              </p>
            </div>
          </div>
        );
      })}

      <div class="container text-center mb-4 h-30 mb-5">
        <AnyChart
          type="column"
          width={800}
          height={600}
          data={grafica}
          title="Gastos fijos"
          legend="true"
          class="mb-5"
        />
      </div>

      <div class="container text-center mb-4 h-30 mb-5">
        <AnyChart
          type="column"
          width={800}
          height={600}
          data={grafica2}
          title="Gastos fijos"
          legend="true"
          class="mb-5"
        />
      </div>

      <div class="container text-center mb-4 h-30 mb-5">
        <AnyChart
          type="column"
          width={800}
          height={600}
          data={grafica3}
          title="Gastos fijos"
          legend="true"
          class="mb-5"
        />
      </div>
    </div>
  );
};

export default Resumen;
