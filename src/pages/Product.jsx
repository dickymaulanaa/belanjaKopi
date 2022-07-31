import axios from "axios";
import React, { useEffect, useState } from "react";
import InputRange from "react-input-range";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import "../css/product.css";

function Product() {
	const navigate = useNavigate();
	const [minMax, setMinMax] = useState({
		min: 50000,
		max: 2250000,
	});
	const [dataProduct, setDataProduct] = useState([]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setMinMax((prevState) => ({
			...prevState,
			[name]: value.replace(/\D/, ""),
		}));
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		const getProduct = () => {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			axios
				.get(
					`https://techtest.folkatech.com/api/product?keyword=&price=10000,250000&page=1&limit=10&order=product_name,ASC`,
					config
				)
				.then((res) => {
					setDataProduct(res.data.data.list);
					// console.log(res.data.data.list);
				})
				.catch((error) => {
					console.error(error);
				});
		};
		getProduct();
	}, []);

	const toDetail = (e) => {
		navigate("/detail-product", {
			state: { name: e.currentTarget.id },
		});
		// console.log(e.currentTarget.id);
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token === null) {
			return navigate("/");
		}
	});
	return (
		<div className="container-app">
			<Navbar />
			<div className="content  mt-2">
				{/* -----------------------------------BREADCRUM START----------------------------------- */}
				<div className="breadcrumbnav ">
					<nav className="divider" aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item" style={{ cursor: "pointer" }}>
								Home
							</li>
							<li className="breadcrumb-item " aria-current="page" style={{ cursor: "pointer" }}>
								Produk
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								Roasted Bean
							</li>
						</ol>
					</nav>
				</div>
				{/* -----------------------------------BREADCRUM END----------------------------------- */}

				<div className="d-flex mt-4">
					{/* -------------------------------CONTENT LEFT (FILTER) START------------------------------- */}
					<div className="filter  d-flex flex-column">
						<span className="label-urutkan">URUTKAN BERDASARKAN</span>
						<span className="label-urutkan-harga my-2">Harga</span>
						<InputRange maxValue={3000000} minValue={50000} value={minMax} onChange={setMinMax} />
						<div className="d-flex justify-content-evenly rangePrice mt-1">
							<div>
								<span className="me-2">Rp</span>
								<input type="text" value={minMax.min} onChange={handleChange} name="min" pattern="[0-9]*" />
							</div>
							-
							<div>
								<span className="me-2">Rp</span>
								<input type="text" value={minMax.max} onChange={handleChange} name="max" pattern="[0-9]*" />
							</div>
						</div>

						{/* -----------------------------------ACCORDION ORIGIN START----------------------------------- */}
						<div className="accordion mt-2" id="accordionPanelsStayOpen">
							<div className="accordion-item border-0">
								<h2 className="accordion-header" id="panelsStayOpen-headingOne">
									<button
										className="accordion-button "
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#panelsStayOpen-collapseOne"
										aria-expanded="true"
										aria-controls="panelsStayOpen-collapseOne"
									>
										Origin
									</button>
								</h2>
								<div
									id="panelsStayOpen-collapseOne"
									className="accordion-collapse collapse show"
									aria-labelledby="panelsStayOpen-headingOne"
								>
									<div className="accordion-body">
										<div className="d-flex">
											<input type="checkbox" id="aceh" name="aceh" value="aceh" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="aceh">Aceh</label>
												<label> (8)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="semarang" name="semarang" value="semarang" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="semarang">Semarang</label>
												<label> (2)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="bandung" name="bandung" value="bandung" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="bandung">Bandung</label>
												<label> (7)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="jawa" name="jawa" value="jawa" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="jawa">Jawa</label>
												<label> (5)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="amerika" name="amerika" value="amerika" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="amerika">Amerika Selatan</label>
												<label> (6)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="lain-lain" name="lain-lain" value="lain-lain" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="lain-lain">Lain-lain</label>
												<label> (8)</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* -----------------------------------ACCORDION ORIGIN END----------------------------------- */}

						{/* -----------------------------------ACCORDION SPECIES START----------------------------------- */}

						<div className="accordion mt-2" id="accordionPanelsStayOpen">
							<div className="accordion-item border-0">
								<h2 className="accordion-header" id="panelsStayOpen-headingOne">
									<button
										className="accordion-button "
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#panelsStayOpen-collapseTwo"
										aria-expanded="true"
										aria-controls="panelsStayOpen-collapseTwo"
									>
										Species
									</button>
								</h2>
								<div
									id="panelsStayOpen-collapseTwo"
									className="accordion-collapse collapse show"
									aria-labelledby="panelsStayOpen-headingTwo"
								>
									<div className="accordion-body">
										<div className="d-flex">
											<input type="checkbox" id="arabika" name="arabika" value="arabika" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="arabika">Arabika</label>
												<label> (128)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="robusta" name="robusta" value="robusta" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="robusta">Robusta</label>
												<label> (23)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="blend" name="blend" value="blend" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="blend">Blend</label>
												<label> (9)</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* -----------------------------------ACCORDION SPECIES END----------------------------------- */}

						{/* -----------------------------------ACCORDION ROAST START----------------------------------- */}
						<div className="accordion mt-2" id="accordionPanelsStayOpen">
							<div className="accordion-item border-0">
								<h2 className="accordion-header" id="panelsStayOpen-headingOne">
									<button
										className="accordion-button "
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#panelsStayOpen-collapseThree"
										aria-expanded="true"
										aria-controls="panelsStayOpen-collapseThree"
									>
										Roast Level
									</button>
								</h2>
								<div
									id="panelsStayOpen-collapseThree"
									className="accordion-collapse collapse show"
									aria-labelledby="panelsStayOpen-headingTwo"
								>
									<div className="accordion-body">
										<div className="d-flex">
											<input type="checkbox" id="lightRoast" name="lightRoast" value="lightRoast" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="lightRoast">Light Roast</label>
												<label> (5)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="mediumRoast" name="mediumRoast" value="mediumRoast" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="mediumRoast">Medium Roast</label>
												<label> (2)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="darkRoast" name="darkRoast" value="darkRoast" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="darkRoast">Dark Roast</label>
												<label> (7)</label>
											</div>
										</div>
										<div className="d-flex">
											<input
												type="checkbox"
												id="lightToMediumRoast"
												name="lightToMediumRoast"
												value="lightToMediumRoast"
											/>
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="lightToMediumRoast">Light To Medium Roast</label>
												<label> (5)</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* -----------------------------------ACCORDION ROAST END----------------------------------- */}

						{/* -----------------------------------ACCORDION TESTED START----------------------------------- */}
						<div className="accordion mt-2" id="accordionPanelsStayOpen">
							<div className="accordion-item border-0">
								<h2 className="accordion-header" id="panelsStayOpen-headingOne">
									<button
										className="accordion-button "
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#panelsStayOpen-collapseFour"
										aria-expanded="true"
										aria-controls="panelsStayOpen-collapseFour"
									>
										Tested
									</button>
								</h2>
								<div
									id="panelsStayOpen-collapseFour"
									className="accordion-collapse collapse show"
									aria-labelledby="panelsStayOpen-headingOne"
								>
									<div className="accordion-body">
										<div className="d-flex">
											<input type="checkbox" id="sweet" name="sweet" value="sweet" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="sweet">Sweet</label>
												<label> (18)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="floral" name="floral" value="floral" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="floral">Floral</label>
												<label> (21)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="fruity" name="fruity" value="fruity" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="fruity">Fruity</label>
												<label> (21)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="nutty" name="nutty" value="nutty" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="nutty">Nutty</label>
												<label> (5)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="cocoa" name="cocoa" value="cocoa" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="cocoa">Cocoa</label>
												<label> (21)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="spicies" name="spicies" value="spicies" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="spicies">Spicies</label>
												<label> (18)</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* -----------------------------------ACCORDION TESTED END----------------------------------- */}

						{/* -----------------------------------ACCORDION PROCESSING START----------------------------------- */}
						<div className="accordion mt-2" id="accordionPanelsStayOpen">
							<div className="accordion-item border-0">
								<h2 className="accordion-header" id="panelsStayOpen-headingOne">
									<button
										className="accordion-button "
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#panelsStayOpen-collapseFive"
										aria-expanded="true"
										aria-controls="panelsStayOpen-collapseFive"
									>
										Tested
									</button>
								</h2>
								<div
									id="panelsStayOpen-collapseFive"
									className="accordion-collapse collapse show"
									aria-labelledby="panelsStayOpen-headingOne"
								>
									<div className="accordion-body">
										<div className="d-flex">
											<input type="checkbox" id="honeyWhite" name="honeyWhite" value="honeyWhite" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="honeyWhite">Honey White</label>
												<label> (12)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="natural" name="natural" value="natural" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="natural">Natural</label>
												<label> (8)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="honeyGold" name="honeyGold" value="honeyGold" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="honeyGold">Honey Gold</label>
												<label> (13)</label>
											</div>
										</div>
										<div className="d-flex">
											<input type="checkbox" id="honeyYellow" name="honeyYellow" value="honeyYellow" />
											<div className="d-flex justify-content-between w-100 m-1">
												<label htmlFor="honeyYellow">Honey Yellow</label>
												<label> (28)</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* -----------------------------------ACCORDION PROCESSING END----------------------------------- */}
					</div>

					{/* -------------------------------CONTENT LEFT (FILTER)  END------------------------------- */}

					{/* -------------------------------CONTENT RIGHT (PRODUK) START------------------------------- */}
					<div className="product ">
						<div className="d-flex justify-content-between">
							<div className="d-flex align-items-center header-product">
								<span>Menampilkan</span>
								<select className="select-show-product mx-2">
									<option defaultValue>1</option>
									<option value="1">21</option>
									<option value="2">12</option>
									<option value="3">9</option>
								</select>
								<span>dari 132</span>
							</div>
							<div className="d-flex filter-name-product align-items-center">
								<span>Urutkan</span>
								<select className="select-name-product mx-2">
									<option defaultValue>Nama Produk</option>
									<option value="apel">Apel</option>
								</select>
							</div>
						</div>
						<div className="list-product mt-3 d-flex flex-wrap">
							{dataProduct.map((el, i) => {
								let reverse = el.price.toString().split("").reverse().join(""),
									ribuan = reverse.match(/\d{1,3}/g);
								ribuan = ribuan.join(".").split("").reverse().join("");
								return (
									<div
										className="product-item d-flex flex-column  align-items-center p-2"
										key={i}
										id={el.name}
										onClick={toDetail}
									>
										<img src={el.images ? el.images[0].image_url : null} alt="foto" className="product-img " />
										<span>{el.name}</span>
										<span>{el.short_description}</span>
										<span>
											<svg width="79" height="10" viewBox="0 0 79 10" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													d="M65.4655 1.36L65.1355 0.85C64.2422 1.35 63.5555 1.95667 63.0755 2.67C62.6022 3.38333 62.3655 4.20333 62.3655 5.13C62.3655 6.05667 62.6022 6.87667 63.0755 7.59C63.5555 8.30333 64.2422 8.91 65.1355 9.41L65.4655 8.9C64.6989 8.41333 64.1189 7.86667 63.7255 7.26C63.3389 6.64667 63.1455 5.93667 63.1455 5.13C63.1455 4.32333 63.3389 3.61667 63.7255 3.01C64.1189 2.39667 64.6989 1.84667 65.4655 1.36ZM66.7015 1.72H70.5515L67.3915 8H68.2715L71.4515 1.59V1H66.7015V1.72ZM72.5385 1.36C73.3052 1.84667 73.8818 2.39667 74.2685 3.01C74.6618 3.61667 74.8585 4.32333 74.8585 5.13C74.8585 5.93667 74.6618 6.64667 74.2685 7.26C73.8818 7.86667 73.3052 8.41333 72.5385 8.9L72.8685 9.41C73.7618 8.91 74.4452 8.30333 74.9185 7.59C75.3985 6.87667 75.6385 6.05667 75.6385 5.13C75.6385 4.20333 75.3985 3.38333 74.9185 2.67C74.4452 1.95667 73.7618 1.35 72.8685 0.85L72.5385 1.36Z"
													fill="#868686"
												/>
												<g clipPath="url(#clip0_128_712)">
													<path
														d="M9.974 3.83595C9.90854 3.63346 9.72894 3.48964 9.51645 3.47049L6.63018 3.20842L5.48887 0.537068C5.40471 0.341293 5.21306 0.214565 5.00012 0.214565C4.78717 0.214565 4.59552 0.341293 4.51137 0.537526L3.37005 3.20842L0.483323 3.47049C0.27122 3.4901 0.0920774 3.63346 0.026234 3.83595C-0.0396094 4.03844 0.0211985 4.26054 0.181649 4.40054L2.36333 6.31389L1.72 9.14774C1.67293 9.35611 1.7538 9.57149 1.92669 9.69646C2.01962 9.7636 2.12834 9.79778 2.23798 9.79778C2.33251 9.79778 2.42627 9.7723 2.51043 9.72195L5.00012 8.23395L7.48889 9.72195C7.67101 9.83151 7.90058 9.82151 8.07309 9.69646C8.24605 9.57111 8.32685 9.35565 8.27977 9.14774L7.63645 6.31389L9.81813 4.40092C9.97858 4.26054 10.0398 4.03882 9.974 3.83595V3.83595Z"
														fill="#FFC107"
													/>
												</g>
												<g clipPath="url(#clip1_128_712)">
													<path
														d="M34.4184 3.83595C34.353 3.63346 34.1734 3.48964 33.9609 3.47049L31.0746 3.20842L29.9333 0.537068C29.8492 0.341293 29.6575 0.214565 29.4446 0.214565C29.2316 0.214565 29.04 0.341293 28.9558 0.537526L27.8145 3.20842L24.9278 3.47049C24.7157 3.4901 24.5365 3.63346 24.4707 3.83595C24.4048 4.03844 24.4656 4.26054 24.6261 4.40054L26.8078 6.31389L26.1644 9.14774C26.1174 9.35611 26.1982 9.57149 26.3711 9.69646C26.4641 9.7636 26.5728 9.79778 26.6824 9.79778C26.777 9.79778 26.8707 9.7723 26.9549 9.72195L29.4446 8.23395L31.9333 9.72195C32.1155 9.83151 32.345 9.82151 32.5175 9.69646C32.6905 9.57111 32.7713 9.35565 32.7242 9.14774L32.0809 6.31389L34.2626 4.40092C34.423 4.26054 34.4843 4.03882 34.4184 3.83595V3.83595Z"
														fill="#FFC107"
													/>
												</g>
												<g clipPath="url(#clip2_128_712)">
													<path
														d="M22.1962 3.83595C22.1308 3.63346 21.9512 3.48964 21.7387 3.47049L18.8524 3.20842L17.7111 0.537068C17.6269 0.341293 17.4353 0.214565 17.2223 0.214565C17.0094 0.214565 16.8177 0.341293 16.7336 0.537526L15.5923 3.20842L12.7055 3.47049C12.4934 3.4901 12.3143 3.63346 12.2485 3.83595C12.1826 4.03844 12.2434 4.26054 12.4039 4.40054L14.5856 6.31389L13.9422 9.14774C13.8952 9.35611 13.976 9.57149 14.1489 9.69646C14.2418 9.7636 14.3506 9.79778 14.4602 9.79778C14.5547 9.79778 14.6485 9.7723 14.7327 9.72195L17.2223 8.23395L19.7111 9.72195C19.8932 9.83151 20.1228 9.82151 20.2953 9.69646C20.4683 9.57111 20.5491 9.35565 20.502 9.14774L19.8587 6.31389L22.0403 4.40092C22.2008 4.26054 22.2621 4.03882 22.1962 3.83595V3.83595Z"
														fill="#FFC107"
													/>
												</g>
												<g clipPath="url(#clip3_128_712)">
													<path
														d="M46.6407 3.83595C46.5752 3.63346 46.3956 3.48964 46.1831 3.47049L43.2968 3.20842L42.1555 0.537068C42.0714 0.341293 41.8797 0.214565 41.6668 0.214565C41.4538 0.214565 41.2622 0.341293 41.178 0.537526L40.0367 3.20842L37.15 3.47049C36.9379 3.4901 36.7587 3.63346 36.6929 3.83595C36.6271 4.03844 36.6879 4.26054 36.8483 4.40054L39.03 6.31389L38.3867 9.14774C38.3396 9.35611 38.4205 9.57149 38.5934 9.69646C38.6863 9.7636 38.795 9.79778 38.9046 9.79778C38.9992 9.79778 39.0929 9.7723 39.1771 9.72195L41.6668 8.23395L44.1556 9.72195C44.3377 9.83151 44.5672 9.82151 44.7398 9.69646C44.9127 9.57111 44.9935 9.35565 44.9464 9.14774L44.3031 6.31389L46.4848 4.40092C46.6452 4.26054 46.7065 4.03882 46.6407 3.83595V3.83595Z"
														fill="#FFC107"
													/>
												</g>
												<g clipPath="url(#clip4_128_712)">
													<path
														d="M58.8629 3.83595C58.7974 3.63346 58.6178 3.48964 58.4053 3.47049L55.5191 3.20842L54.3778 0.537068C54.2936 0.341293 54.1019 0.214565 53.889 0.214565C53.6761 0.214565 53.4844 0.341293 53.4003 0.537526L52.2589 3.20842L49.3722 3.47049C49.1601 3.4901 48.981 3.63346 48.9151 3.83595C48.8493 4.03844 48.9101 4.26054 49.0705 4.40054L51.2522 6.31389L50.6089 9.14774C50.5618 9.35611 50.6427 9.57149 50.8156 9.69646C50.9085 9.7636 51.0172 9.79778 51.1269 9.79778C51.2214 9.79778 51.3152 9.7723 51.3993 9.72195L53.889 8.23395L56.3778 9.72195C56.5599 9.83151 56.7895 9.82151 56.962 9.69646C57.1349 9.57111 57.2157 9.35565 57.1687 9.14774L56.5253 6.31389L58.707 4.40092C58.8675 4.26054 58.9287 4.03882 58.8629 3.83595V3.83595Z"
														fill="#FFC107"
													/>
												</g>
												<defs>
													<clipPath id="clip0_128_712">
														<rect width="10" height="10" fill="white" />
													</clipPath>
													<clipPath id="clip1_128_712">
														<rect width="10" height="10" fill="white" transhtmlform="translate(24.4444)" />
													</clipPath>
													<clipPath id="clip2_128_712">
														<rect width="10" height="10" fill="white" transhtmlform="translate(12.2222)" />
													</clipPath>
													<clipPath id="clip3_128_712">
														<rect width="10" height="10" fill="white" transhtmlform="translate(36.6667)" />
													</clipPath>
													<clipPath id="clip4_128_712">
														<rect width="10" height="10" fill="white" transhtmlform="translate(48.8889)" />
													</clipPath>
												</defs>
											</svg>
										</span>
										<span>Rp. {ribuan} </span>
									</div>
								);
							})}
						</div>
						<div className="bottom d-flex justify-content-center ">
							<nav aria-label="Page navigation example">
								<ul className="pagination">
									<li className="page-item">
										<a className="page-link" href="_blank">
											<i className="fas fa-angle-left"></i>
										</a>
									</li>
									<li className="page-item">
										<a className="page-link" href="_blank">
											1
										</a>
									</li>
									<li className="page-item">
										<a className="page-link" href="_blank">
											2
										</a>
									</li>
									<li className="page-item">
										<a className="page-link" href="_blank">
											3
										</a>
									</li>
									<li className="page-item">
										<a className="page-link" href="_blank">
											<i className="fas fa-angle-right"></i>
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
					{/* -------------------------------CONTENT RIGHT (PRODUK) END------------------------------- */}
				</div>
			</div>
		</div>
	);
}

export default Product;
