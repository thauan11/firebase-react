import { useEffect, useState } from "react";
import { auth } from "../firebaseConnection";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { Loading } from "./loading";

export function Usuarios() {
	const [email, setEmail] = useState();
	const [senha, setSenha] = useState();
	const [user, setUser] = useState({});
	const [userLogon, setUserLogon] = useState(false);

	function loading(opt) {
		const loading = document.getElementById("loading");
		if (loading) {
			if (opt === "show") {
				loading.classList.remove("hidden");
			} else {
				loading.classList.add("hidden");
			}
		}
	}

	async function novoUsuario() {
		loading("show");
		await createUserWithEmailAndPassword(auth, email, senha)
			.then(() => {
				alert("Cadastro realizado!");
				setEmail("");
				setSenha("");
				loading("hide");
			})
			.catch((error) => {
				loading("hide");
				alert(error);
			});
	}

	async function logarUsuario() {
		loading("show");
		await signInWithEmailAndPassword(auth, email, senha)
			.then((value) => {
				// alert("Login realizado!");
				setUser({
					uid: value.user.uid,
					email: value.user.email,
				});
				setUserLogon(true);
				setEmail("");
				setSenha("");
				loading("hide");
			})
			.catch((error) => {
				loading("hide");
				alert(error);
			});
	}

	async function fazerLogout() {
		loading("show");
		await signOut(auth)
			.then(() => {
				setUser({});
				setEmail("");
				setSenha("");
				setUserLogon(false);
				loading("hide");
			})
			.catch((error) => {
				loading("hide");
				alert(error);
			});
	}

	useEffect(() => {
		async function checkLogin() {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setUser({
						uid: user.uid,
						email: user.email,
					});
					setUserLogon(true);
				} else {
					setUser({});
					setUserLogon(false);
				}
			});
		}
		checkLogin();
	}, []);

	return (
		<>
			<div className="flex min-w-full min-h-screen bg-zinc-800 text-zinc-200 flex flex-col gap-16 items-center">
				<h1 className="text-4xl pt-4 text-zinc-50 font-bold text-left w-full pl-4">
					Usuários
				</h1>

				<div
					id="loading"
					className="flex min-w-full h-[calc(100vh-20vh)] bg-zinc-800 grid place-items-center hidden"
				>
					<Loading />
				</div>

				<div className="flex flex-col gap-8 items-center">
					{userLogon ? (
						<div className="flex flex-col gap-2 items-center">
							<h1>Você esta logado</h1>

							<div className="bg-zinc-50 text-zinc-800 rounded-md w-96 p-4">
								<p>ID: {user.uid}</p>
								<p>E-mail: {user.email}</p>
							</div>

							<button
								type="button"
								onClick={fazerLogout}
								className="bg-red-600 text-zinc-50 px-16 py-1 rounded-md mt-8"
							>
								Sair
							</button>
						</div>
					) : (
						<>
							<div className="flex flex-row gap-4">
								<label htmlFor="email">E-mail</label>
								<input
									className="text-zinc-800 pl-2"
									type="email"
									name="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className="flex flex-row gap-4">
								<label htmlFor="senha">Senha</label>
								<input
									className="text-zinc-800 pl-2"
									type="password"
									name="senha"
									id="senha"
									value={senha}
									onChange={(e) => setSenha(e.target.value)}
								/>
							</div>

							<div className="flex flex-row items-center justify-center gap-4">
								<button
									type="button"
									onClick={novoUsuario}
									className="bg-lime-600 text-zinc-50 rounded-md font-medium px-8 py-2"
								>
									Cadastrar
								</button>

								<button
									type="button"
									onClick={logarUsuario}
									className="bg-zinc-50 text-zinc-800 rounded-md font-medium px-8 py-2 hover:text-zinc-50 hover:bg-zinc-700 hover:border-zinc-50 transition-all"
								>
									Login
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
