import React from 'react';
import '../assets/Perfil.css'; 

const PerfilDeUsuario = () => {
    return (
        <div className="perfil-container">
            <h1 className="titulo">Perfil de Usuario</h1>
            
            <div className="info-basica">
                <h2 className="subtitulo">Información Básica</h2>
                <div className="grid">
                  <div className="inputInfo">
                        <label htmlFor="username">Nombre de Usuario:</label>
                        <input id="username" type="text" value="Admin" readOnly className="input" />
                    </div>
                    <div className="inputInfo">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input id="email" type="text" value="admin@example.com" readOnly className="input" />
                    </div>
                    <div className="inputInfo">
                        <label htmlFor="role">Rol:</label>
                        <input id="role" type="text" value="Admin" readOnly className="input" />
                    </div>
                    <div className="inputInfo">
                        <label htmlFor="status">Estado:</label>
                        <input id="status" type="text" value="Activo" readOnly className="input" />
                    </div>
                    <div className="inputInfo">
                        <label htmlFor="registrationDate">Fecha de Registro:</label>
                        <input id="registrationDate" type="text" value="01/01/2022" readOnly className="input" />
                    </div>
                    <div className="inputInfo">
                        <label htmlFor="lastLogin">Último Inicio de Sesión:</label>
                        <input id="lastLogin" type="text" value="01/02/2022 10:30 AM" readOnly className="input" />
                    </div>
                </div>
            </div>
            
            <div className="historial-acciones">
                <h2 className="subtitulo">Historial de Acciones</h2>
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>Acción</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Agregó un nuevo usuario</td>
                            <td>02/01/2022 09:45 AM</td>
                        </tr>
                        <tr>
                            <td>Modificó permisos de rol</td>
                            <td>03/01/2022 11:20 AM</td>
                        </tr>
                        <tr>
                            <td>Eliminó un usuario</td>
                            <td>04/01/2022 03:15 PM</td>
                        </tr>
                    </tbody>
                </table>
                <button className="boton-ver-mas">Ver más detalles</button>
            </div>
            
            <div class="contenedor-users">
    
    </div>

            
       
        </div>
    );
};

export default PerfilDeUsuario;
