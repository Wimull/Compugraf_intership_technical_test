import React, { useState, useEffect } from "react";
import {
	PageTemplate,
	Form,
	Buttons,
	PeopleTable,
	fetchPerson,
} from "../../components";
import { useForm } from "react-hook-form";
import Styles from "../../styles/title.module.css";

export default function () {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	const [formData, setFormData] = useState({});
	const [peopleRegistered, setPeopleRegistered] = useState([{}]);
	const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(0);
	const [errorMessage, setErrorMessage] = useState("");
	const [errorMessageVisible, setErrorMessageVisible] = useState("hidden");

	const getInitialState = async () => {
		setPeopleRegistered(await fetchPerson());
	};
	useEffect(() => {
		getInitialState();
	}, []);

	async function onSubmit(e) {
		e.preventDefault;
		let getPacket = Object.keys(formData)
			.filter((key) => formData[key] !== "") //Filters empty strings
			.reduce((res, key) => `${res}${key}=${formData[key]}&`, "?");

		let response = await fetch(
			`http://localhost:3000/api/entry/Register${getPacket}%20`
		);
		let data = await response.json();
		if (response.status == 200) {
			setIsSubmitSuccessful(isSubmitSuccessful + 1);
			setErrorMessageVisible("hidden"), setErrorMessage("");
			data.map((obj) => (obj.id = obj.cpf.replace(/[\.-]/g, ""))); //Creates and id property so as RowSelect works properly (it only looks for property named "id")
			setPeopleRegistered(data);
		} else {
			setPeopleRegistered([{}]);
			setErrorMessageVisible("visible");
			setErrorMessage(`Erro ${response.status}: ${JSON.stringify(data)}`);
		}
	}

	function onSelectChange(action, state) {
		console.log(action, state);
	}
	return (
		<PageTemplate>
			<div className={Styles.title}>
				<h1>Procurar</h1>
				<hr />
			</div>
			<Form
				method="GET"
				data={formData}
				setData={setFormData}
				onSubmit={onSubmit}
				isSubmitSuccessful={isSubmitSuccessful}
				{...register("formulário")}
			>
				<Buttons href="/" label={"Procurar"} />
			</Form>
			<div className={Styles.erro} style={{ visibility: errorMessageVisible }}>
				<span>{errorMessage}</span>
			</div>
			<PeopleTable data={peopleRegistered} onSelectChange={onSelectChange} />
		</PageTemplate>
	);
}
