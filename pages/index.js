import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchPerson, PageTemplate, PeopleTable } from "../components";
import styles from "../styles/Home.module.css";
import Styles from "../styles/title.module.css";

export default function Home() {
	const [data, setData] = useState([{}]);
	const fetch = async () => {
		setData(await fetchPerson());
	};
	useEffect(() => {
		fetch();
	}, []);

	console.log(data, "data");
	return (
		<>
			<div className={styles.container}>
				<Head>
					<title>Create Next App</title>
					<meta name="description" content="Generated by create next app" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
			</div>
			<PageTemplate>
				<div className={Styles.title}>
					<h1>Lista das Pessoas Registradas</h1>
					<hr />
				</div>
				<PeopleTable data={data} />
			</PageTemplate>
		</>
	);
}
