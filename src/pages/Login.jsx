import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Swal from 'sweetalert2'

import "../css/auth.css";

function Login() {
	const [passwordType, setPasswordType] = useState("password");
	const navigate = useNavigate();
	const [password, setPassword ] = useState("")
	const [email, setEmail] = useState("")

	const toRegister = () => {
		navigate("/register");
	};
	const toHome =() =>{
		navigate("/home", )
	}

	const ShowPassword = () => {
		if (passwordType === "password") {
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
	};

	const handleLogin =() =>{
		localStorage.clear()
		const body ={
			"email" : email,
			"password" : password
		}
		axios.post("https://techtest.folkatech.com/api/login", body)
		.then((res) =>{
			console.log(res.data.data.token);
			// setToken(res.data.data.token)
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Login berhasil',
				showConfirmButton: false,
				timer: 2500
			   })
			
			if(res.data !== null){
				localStorage.setItem("token", res.data.data.token);
			}
			toHome()
		}).catch((error) =>{
			Swal.fire("Login gagal", "Silahkan cek kembali email dan password anda", "error");
		})
	}
	useEffect (() =>{
		const token = localStorage.getItem("token");
		if(token !== null){
			return navigate("/home")
		}
	})
	return (
		<div className="container-app d-flex justify-content-center align-items-center">
			<div className="container-auth  ">
				<h3 className="">Masuk</h3>
				<div className="d-flex flex-column align-items-center justify-content-center">
					<div className="d-flex flex-column">
						<div className="form-container align-items-center d-flex my-3">
							<input type="text" className="input-form" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
						</div>
						<div className="form-container align-items-center d-flex">
							<input type={passwordType} className="input-form" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
							<button type="button" onClick={ShowPassword} className="btn-show">
								{passwordType === "password" ? <>Show</> : <>Hide</>}
							</button>
						</div>
						<span className="forgot-password">Lupa Password?</span>
						<button className="btn-form" onClick={handleLogin}> MASUK</button>
					</div>
				</div>
				<div className="w-75 mx-auto mt-5 bottom-form text-center">
					<span>Belum Punya akun? &nbsp;</span>
					<span style={{ cursor: "pointer" }} onClick={toRegister}>
						Daftar Sekarang
					</span>
				</div>
			</div>
		</div>
	);
}

export default Login;
