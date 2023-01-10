import React from 'react';
import { Link } from 'react-router-dom'

export const SideBar = () => {
	return (
		<div className="sidebarContainer" >
			<ul className="" id="originalNav" >

				<li className="originalNav-icon" id='logo'>
					<Link className="logo" to="/">
						<img className="" src="/images/logo.jpg" alt="Amapola Bags" />
					</Link>
				</li>


				<li className="originalNav-icon">
					<Link className="nav-link" to="/">
						<span>PERFIL ADMINISTRADOR</span></Link>
				</li>

				<div className="originalNav-icon" id='opciones'><span>OPCIONES</span></div>

				<li className="originalNav-icon">
					<Link className="nav-link " to="/products">
						<i className="fas fa-fw fa-folder"></i>
						<span>Productos</span>
					</Link>
				</li>


				<li className="originalNav-icon">
					<Link className="nav-link" to="/users">
						<i className="fas fa-users"></i>
						<span>Usuarios</span></Link>
				</li>


				<li className="originalNav-icon" id='categorias'>
					<Link className="nav-link" to="/categories">
						<i className="fas fa-fw fa-table"></i>
						<span>Categorías</span></Link>
				</li>



			</ul></div>
	)
}
