import { useEffect, useState } from "react";
import { db } from "../firebaseConnection";
import {
	doc,
	setDoc,
	addDoc,
	getDoc,
	collection,
	getDocs,
	updateDoc,
	deleteDoc,
	onSnapshot,
} from "firebase/firestore";

export function Posts() {
	const [titulo, setTitulo] = useState();
	const [autor, setAutor] = useState();
	const [posts, setPosts] = useState();
	const [idPost, setIdPost] = useState();

	useEffect(() => {
		async function loadPosts() {
			const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
				const lista = [];

				// biome-ignore lint/complexity/noForEach: <explanation>
				snapshot.forEach((doc) => {
					lista.push({
						id: doc.id,
						titulo: doc.data().titulo,
						autor: doc.data().autor,
					});
				});

				setPosts(lista);
			});
		}

		loadPosts();
	}, []);

	async function handleAdd() {
		await addDoc(collection(db, "posts"), {
			titulo: titulo,
			autor: autor,
		})
			.then(() => {
				console.log("Add Ok");
				setAutor("");
				setTitulo("");
			})
			.catch((error) => {
				console.log(error);
			});
	}

	// async function handleGet() {
	// 	const postRef = collection(db, "posts");

	// 	await getDocs(postRef)
	// 		.then((snapshot) => {
	// 			const lista = [];

	// 			// biome-ignore lint/complexity/noForEach: <explanation>
	// 			snapshot.forEach((doc) => {
	// 				lista.push({
	// 					id: doc.id,
	// 					titulo: doc.data().titulo,
	// 					autor: doc.data().autor,
	// 				});
	// 			});

	// 			setPosts(lista);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }

	async function handleGetId() {
		const postRef = doc(db, "posts", "OuIfdRK5jv21wFuEXg7g");

		await getDoc(postRef)
			.then((snapshot) => {
				setIdPost(snapshot.id);
				setAutor(snapshot.data().autor);
				setTitulo(snapshot.data().titulo);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async function handlePatch() {
		const docRef = doc(db, "posts", idPost);
		await updateDoc(docRef, {
			titulo: titulo,
			autor: autor,
		})
			.then(() => {
				console.log("Patch Ok");
				setIdPost("");
				setAutor("");
				setTitulo("");
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async function removePost(id) {
		const docRef = doc(db, "posts", id);
		await deleteDoc(docRef).catch((error) => {
			console.log(error);
		});
	}

	return (
		<div className="flex min-w-full min-h-screen bg-zinc-800 text-zinc-200 flex flex-col gap-16 items-center">
			<h1 className="text-4xl pt-4 text-zinc-50 font-bold text-left w-full pl-4">
				Posts
			</h1>

			<div className="flex flex-col gap-4 items-center">
				<div className="flex flex-row gap-4 w-[360px]">
					<label htmlFor="idPost" className="w-2/12">
						ID post
					</label>
					<input
						className="text-zinc-800 w-max pl-2 rounded-sm outline-0"
						id="idPost"
						type="text"
						placeholder="Digite o id"
						value={idPost}
						onChange={(e) => {
							setIdPost(e.target.value);
						}}
					/>
				</div>

				<div className="flex flex-row gap-4 w-[360px]">
					<label htmlFor="titulo" className="w-2/12">
						Titulo
					</label>
					<input
						className="text-zinc-800 w-max pl-2 rounded-sm outline-0"
						id="titulo"
						type="text"
						placeholder="Digite o titulo"
						value={titulo}
						onChange={(e) => {
							setTitulo(e.target.value);
						}}
					/>
				</div>

				<div className="flex flex-row gap-4 w-[360px]">
					<label htmlFor="autor" className="w-2/12">
						Autor
					</label>
					<input
						className="text-zinc-800 w-max pl-2 rounded-sm outline-0"
						id="autor"
						type="text"
						placeholder="Insira o autor"
						value={autor}
						onChange={(e) => {
							setAutor(e.target.value);
						}}
					/>
				</div>
			</div>

			{posts && (
				<div
					className="bg-white text-zinc-800 p-8 rounded-lg w-[500px] h-[400px] overflow-y-auto"
					id="get-posts"
				>
					<ul className="flex flex-col gap-6">
						{posts.map((post) => {
							return (
								<li key={post.id} className="flex flex-col relative">
									<span>ID: {post.id}</span>
									<span>Titulo: {post.titulo}</span>
									<span>Autor: {post.autor}</span>

									<button
										type="button"
										onClick={() => {
											removePost(post.id);
										}}
										className="absolute right-0 top-1/2 translate-x-1/2 text-red-600 font-bold"
									>
										x
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			)}

			<div className="flex flex-row gap-4 fixed bottom-4">
				<button
					type="submit"
					onClick={handleAdd}
					className="bg-indigo-700 px-8 py-2 rounded-lg font-semibold"
				>
					Cadastrar
				</button>

				<button
					type="submit"
					onClick={handlePatch}
					className="bg-lime-400 text-zinc-950 px-8 py-2 rounded-lg font-semibold"
				>
					Atualizar
				</button>

				<button
					type="submit"
					onClick={handleGetId}
					className="bg-zinc-200 text-zinc-800 px-8 py-2 rounded-lg font-semibold"
				>
					Buscar ID
				</button>

				{/* <button
					type="submit"
					onClick={handleGet}
					className="bg-zinc-950 text-zinc-200 px-8 py-2 rounded-lg font-semibold"
				>
					Tudo
				</button> */}
			</div>
		</div>
	);
}
