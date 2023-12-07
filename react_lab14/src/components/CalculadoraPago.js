// CalculadoraPago.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const CalculadoraPago = () => {
  const [empleadoData, setEmpleadoData] = useState({
    nombre: '',
    categoria: '',
    horas_trabajadas: 0,
    pago: null,
  });

  const [montoCalculado, setMontoCalculado] = useState(null);

  const handleInputChange = (e) => {
    setEmpleadoData({
      ...empleadoData,
      [e.target.name]: e.target.value,
    });
  };

  const calcularMonto = () => {
    const { nombre, categoria, horas_trabajadas } = empleadoData;

    console.log('Nombre:', nombre);
    console.log('Categoría:', categoria);
    console.log('Horas Trabajadas:', horas_trabajadas);

    const categoriaValores = {
      A: 30,
      B: 20,
      C: 10,
    };

    if (categoriaValores.hasOwnProperty(categoria)) {
      const pago = categoriaValores[categoria] * horas_trabajadas;

      console.log('Pago Calculado:', pago);

      fetch('http://localhost:8000/ingresar_empleado/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          categoria,
          horas_trabajadas: parseInt(horas_trabajadas, 10), // Convert to integer
          pago: parseInt(pago, 10), // Convert to integer
        }),
      })
      
        .then((response) => response.json())
        .then((data) => {
          setMontoCalculado(data.pago);
        })
        .catch((error) => {
          console.error('Error al calcular el monto:', error);
        });
    } else {
      console.error('Categoría no válida:', categoria);
    };
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Calculadora de Pago</h1>
      <div className="mb-3">
        <label className="form-label">Nombre:</label>
        <input type="text" className="form-control" name="nombre" onChange={handleInputChange} />
      </div>
      <div className="mb-3">
        <label className="form-label">Categoría:</label>
        <select className="form-select" name="categoria" onChange={handleInputChange}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Horas Trabajadas:</label>
        <input type="number" className="form-control" name="horas_trabajadas" onChange={handleInputChange} />
      </div>
      <button className="btn btn-primary" onClick={calcularMonto}>
        Calcular Pago
      </button>
      {montoCalculado !== null && (
        <div className="mt-4">
          <h2>Monto Calculado:</h2>
          <p>{montoCalculado}</p>
        </div>
      )}
    </div>
  );
};

export default CalculadoraPago;
