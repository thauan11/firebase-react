import { useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { auth } from "../firebaseConnection";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPass, setShowPass] = useState(false);
	const [isRegister, setIsRegister] = useState(false);
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerPassword2, setRegisterPassword2] = useState("");

	const navigate = useNavigate();

	function viewPassword() {
		setShowPass((showPass) => !showPass);
	}

	function showRegister() {
		setIsRegister((isRegister) => !isRegister);
		setEmail("");
		setPassword("");
		setRegisterEmail("");
		setRegisterPassword("");
		setRegisterPassword2("");
	}

	async function handleLogin(e) {
		e.preventDefault();
		if (email && password) {
			await signInWithEmailAndPassword(auth, email, password)
				.then(() => {
					navigate("/posts", { replace: true });
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		} else {
			alert("Preencha todos os campos");
		}
	}

	async function handleRegister(e) {
		e.preventDefault();
		if (registerEmail && registerPassword) {
			await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword,
			)
				.then(() => {
					navigate("/posts", { replace: true });
				})
				.catch((error) => {
					console.log(error);
					alert(error);
				});
		} else {
			alert("Preencha todos os campos");
		}
	}

	function handleConfirmPassword(e) {
		setRegisterPassword2(e.target.value);
		if (registerPassword !== registerPassword2) {
			e.target.classList.add("shadow-[0_0_2px_2px_rgba(220,38,38,1)]");
		} else {
			e.target.classList.remove("shadow-[0_0_2px_2px_rgba(220,38,38,1)]");
		}
	}

	return (
		<div className="w-full max-w-[360px]">
			<div>
				<h1 className="text-center text-2xl">Lista de tarefas</h1>
				<p className="text-center pb-16">Gerencie sua agenda de forma facil.</p>

				{isRegister ? (
					<div className="register">
						<form className="flex flex-col" onSubmit={handleRegister}>
							<div className="flex flex-col gap-4 mb-8">
								<div>
									<label htmlFor="email">E-mail: </label>
									<input
										className="outline-none rounded-sm pl-2 py-0.5 text-zinc-950 w-full placeholder-zinc-500"
										name="email"
										type="text"
										placeholder="seu@e-mail.com"
										value={registerEmail}
										onChange={(e) => setRegisterEmail(e.target.value)}
									/>
								</div>

								<div className="relative">
									<label htmlFor="password">Senha: </label>
									<input
										className="outline-none rounded-sm pl-2 pr-8 py-0.5 text-zinc-950 w-full placeholder-zinc-500"
										name="password"
										type={showPass ? "text" : "password"}
										placeholder="******"
										value={registerPassword}
										onChange={(e) => setRegisterPassword(e.target.value)}
									/>

									<button
										type="button"
										onClick={viewPassword}
										className="absolute right-2 top-[31px] z-10 text-zinc-950"
									>
										{showPass ? <PiEyeClosedBold /> : <PiEyeBold />}
									</button>
								</div>

								<div className="relative">
									<label htmlFor="password">Confirme a senha: </label>
									<input
										className="outline-none rounded-sm pl-2 pr-8 py-0.5 text-zinc-950 w-full placeholder-zinc-500"
										name="password"
										type={showPass ? "text" : "password"}
										placeholder="******"
										value={registerPassword2}
										onChange={handleConfirmPassword}
										onKeyUp={handleConfirmPassword}
									/>

									<button
										type="button"
										onClick={viewPassword}
										className="absolute right-2 top-[31px] z-10 text-zinc-950"
									>
										{showPass ? <PiEyeClosedBold /> : <PiEyeBold />}
									</button>
								</div>
							</div>

							<button
								type="submit"
								className="outline-none bg-zinc-800 text-zinc-50 rounded-sm font-bold py-1 transition hover:bg-zinc-50 hover:text-zinc-800"
							>
								Cadastrar
							</button>
						</form>

						<div className="text-sm mt-4 text-center">
							<button
								type="button"
								onClick={showRegister}
								className=" underline"
							>
								Já possuo uma conta
							</button>
						</div>
					</div>
				) : (
					<div className="login">
						<form className="flex flex-col" onSubmit={handleLogin}>
							<div className="flex flex-col gap-4 mb-8">
								<input
									className="outline-none rounded-sm pl-2 py-0.5 text-zinc-950 w-full placeholder-zinc-500"
									name="email"
									type="text"
									placeholder="seu@e-mail.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>

								<div className="relative">
									<input
										className="outline-none rounded-sm pl-2 pr-8 py-0.5 text-zinc-950 w-full placeholder-zinc-500"
										name="password"
										type={showPass ? "text" : "password"}
										placeholder="******"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>

									<button
										type="button"
										onClick={viewPassword}
										className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-zinc-950"
									>
										{showPass ? <PiEyeClosedBold /> : <PiEyeBold />}
									</button>
								</div>
							</div>

							<button
								type="submit"
								className="outline-none bg-zinc-800 text-zinc-50 rounded-sm font-bold py-1 transition hover:bg-zinc-50 hover:text-zinc-800"
							>
								Entrar
							</button>
						</form>

						<div className="text-sm mt-4 text-center">
							<button
								type="button"
								onClick={showRegister}
								className=" underline"
							>
								Não possuo uma conta
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
