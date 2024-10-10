import { signOut } from "firebase/auth";
import { useState } from "react";
import {
	PiPencilSimpleBold,
	PiCheckCircleBold,
	PiButterflyBold,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConnection";

export function Posts() {
	const [post, setPost] = useState("");
	const navigate = useNavigate();

	function handleSalvar(e) {
		e.preventDefault();
		alert("a");
	}

	async function logout() {
		await signOut(auth)
			.then(() => {
				navigate("/", { replace: true });
			})
			.catch((error) => {
				alert(error);
			});
	}

	return (
		<>
			<div className="flex flex-col items-center">
				<div className="flex flex-col max-w-[512px]">
					<h1 className="text-center pb-5">Novo posts</h1>

					<form className="flex flex-col gap-4" onSubmit={handleSalvar}>
						<textarea
							name="post"
							className="outline-none p-3 w-80 h-32 resize-none text-zinc-950 rounded-sm"
							placeholder="Escreva um novo post"
							value={post}
							onChange={(e) => {
								setPost(e.target.value);
							}}
						/>

						<button
							type="submit"
							className="outline-0 bg-zinc-800 text-zinc-50 rounded-sm font-bold py-1 transition hover:bg-zinc-100 hover:text-zinc-800"
						>
							Salvar
						</button>
					</form>
				</div>

				<div className="w-[45vw] mt-16">
					<h1 className="text-center">Posts</h1>

					<section className="flex flex-col divide-y divide-dotted divide-zinc-600">
						<article className="py-4 flex flex-row justify-between min-w-fit">
							<p className="w-[90%]">Lorem ipsum</p>

							<div className="w-[10%] flex justify-evenly">
								<button type="button">
									<PiPencilSimpleBold />
								</button>
								<button type="button">
									<PiCheckCircleBold />
								</button>
							</div>
						</article>

						<article className="py-4 flex flex-row justify-between min-w-fit">
							<p className="w-[90%]">Lorem ipsum</p>

							<div className="w-[10%] flex justify-evenly">
								<button type="button">
									<PiPencilSimpleBold />
								</button>
								<button type="button">
									<PiCheckCircleBold />
								</button>
							</div>
						</article>

						<article className="py-4 flex flex-row justify-between min-w-fit">
							<p className="w-[90%]">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
								provident nisi nulla architecto delectus repudiandae quia eius
								debitis mollitia placeat, beatae corrupti neque deserunt quae
								quam dolor natus earum molestiae?
							</p>

							<div className="w-[10%] flex justify-evenly">
								<button type="button">
									<PiPencilSimpleBold />
								</button>
								<button type="button">
									<PiCheckCircleBold />
								</button>
							</div>
						</article>
					</section>
				</div>
			</div>

			<button
				type="button"
				className="fixed bottom-8 right-8 text-3xl"
				onClick={logout}
			>
				<PiButterflyBold />
			</button>
		</>
	);
}
