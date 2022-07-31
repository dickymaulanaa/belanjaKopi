import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../css/auth.css";

function Register() {
	const navigate = useNavigate();
	const [formStep, setFormStep] = useState(1);
	const [form, setForm] = useState({});
	const [errors, setErrors] = useState({});
	const { name, email, password, phone } = form;

	const setField = (field, value) => {
		setForm({
			...form,
			[field]: value,
		});
		// Check and see if errors exist, and remove them from the error object:
		if (!!errors[field])
			setErrors({
				...errors,
				[field]: null,
			});
	};
	// Check Error
	const findFormErrors = () => {
		const newErrors = {};
		const regexEmail =
			// eslint-disable-next-line
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		// name errors
		if (!name || name === "") newErrors.name = "nama tidak boleh kosong!";
		// email errors
		if (!email || email === "") newErrors.email = "email tidak boleh kosong!";
		else if (regexEmail.test(email) === false) newErrors.email = "email tidak valid!";
		// password errors
		if (!password || password === "") newErrors.password = "password tidak boleh kosong!";
		else if (password.length < 8) newErrors.password = "password terlalu pendek!";
		// password errors
		if (!phone || phone === "") newErrors.phone = "Nomor telepon tidak boleh kosong!";
		else if (phone.length < 9) newErrors.phone = "Nomor telepon terlalu pendek";
		// gender errors

		return newErrors;
	};

	const handleRegister = (e) => {
		e.preventDefault();
		const newErrors = findFormErrors();
		// Conditional logic:
		if (Object.keys(newErrors).length > 0) {
			// We got errors!
			setErrors(newErrors);
		} else {
			const body = {
				name,
				email,
				password,
				phone,
			};
			axios
				.post("https://techtest.folkatech.com/api/register", body)
				.then((data) => {
					Swal.fire("Registrasi Berhasil", "Silahkan Login untuk melanjutkan", "success");
					navigate("/");
				})
				.catch((error) => {
					Swal.fire({
						text: "Registrasi Gagal",
						icon: "error",
						timer: 2500,
					});
				});
		}
	};


	const toLogin = () => {
		navigate("/");
	};

	const nextForm = () => {
		setFormStep(2);
	};
	const backForm = () => {
		setFormStep(1);
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token !== null) {
			return navigate("/home");
		}
	});
	return (
		<div className="container-app d-flex justify-content-center align-items-center">
			<div className="container-auth  ">
				{formStep === 1 && (
					<>
						<h3 className="">Daftar Sekarang</h3>
						<div className="d-flex flex-column align-items-center justify-content-center">
							<div className="d-flex flex-column ">
								<Form.Group className="my-3">
									<Form.Control
										type="text"
										placeholder="Nama Depan"
										autoComplete="off"
										onChange={(e) => setField("name", e.target.value.trim())}
										required
										isInvalid={!!errors.name}
									/>
									<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
								</Form.Group>

								<Form.Group className=" mb-3">
									<Form.Control
										type="text"
										placeholder="Nama Belakang"
										autoComplete="off"
										required
									/>
									<Form.Control.Feedback type="invalid"></Form.Control.Feedback>
								</Form.Group>

								<Form.Group className="">
									<Form.Control
										type="email"
										placeholder="Email"
										autoComplete="off"
										onChange={(e) => setField("email", e.target.value.trim())}
										required
										isInvalid={!!errors.email}
									/>
									<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
								</Form.Group>

								<button className="btn-form mt-4" onClick={nextForm}>
									{" "}
									Selanjutnya
								</button>
							</div>
						</div>
						<div className="w-75 mx-auto mt-5 bottom-form text-center">
							<span>Sudah Punya akun? &nbsp;</span>
							<span style={{ cursor: "pointer" }} onClick={toLogin}>
								Masuk
							</span>
						</div>
					</>
				)}
				{formStep === 2 && (
					<>
						<h3 style={{ cursor: "pointer" }} onClick={backForm}>
							<i className="fas fa-arrow-left"></i> Kembali
						</h3>
						<div className="d-flex flex-column align-items-center justify-content-center">
							<div className="d-flex flex-column ">
						
								<Form.Group className="my-3">
									<Form.Control
										type="text"
										placeholder="Nomor Telepon"
										autoComplete="off"
										onChange={(e) => setField("phone", e.target.value.trim())}
										required
										isInvalid={!!errors.phone}
									/>
									<Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Control
										type="password"
										placeholder="Password"
										autoComplete="off"
										onChange={(e) => setField("password", e.target.value.trim())}
										required
										isInvalid={!!errors.password}
									/>
									<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
								</Form.Group>

								<Form.Group className="">
									<Form.Control
										type="password"
										placeholder="Konfirmasi Password"
										autoComplete="off"
										onChange={(e) => setField("password", e.target.value.trim())}
										required
										isInvalid={!!errors.password}
									/>
									<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
								</Form.Group>

								<button className="btn-form mt-4" onClick={handleRegister}>
									{" "}
									Selanjutnya
								</button>
							</div>
						</div>
						<div className="w-75 mx-auto mt-5 bottom-form text-center">
							<span>Sudah Punya akun? &nbsp;</span>
							<span style={{ cursor: "pointer" }} onClick={toLogin}>
								Masuk
							</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Register;
