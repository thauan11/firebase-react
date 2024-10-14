import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
	PiPencilSimpleBold,
	PiXCircleBold,
	PiButterflyBold,
	PiChartLineUpBold,
	PiChartLineDownBold,
	PiProhibitBold,
} from "react-icons/pi";
import { auth, db } from "../firebaseConnection";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { Loading } from "../components/loading";

export function Posts() {
	const [post, setPost] = useState("");
	const [postList, setPostList] = useState([]);
	const [userDetail, setUserDetail] = useState([]);
	const [postsOrder, setPostsOrder] = useState("desc");
	const [editPost, setEditPost] = useState(false);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		function getUserDetail() {
			const userStorage = localStorage.getItem("@datailUser");
			if (userStorage) {
				const userData = JSON.parse(userStorage);
				setUserDetail(userData);

				const postRef = collection(db, "posts");

				const q = query(
					postRef,
					orderBy("createdAt", postsOrder),
					where("userUid", "==", userData?.uid),
				);

				const unsub = onSnapshot(q, (snapshot) => {
					const list = [];
					for (const doc of snapshot.docs) {
						list.push({
							id: doc.id,
							post: doc.data().post,
							userUid: doc.data().userUid,
							createdAt: doc.data().createdAt,
						});
					}
					setPostList(list);
				});
			}
		}
		getUserDetail();
	}, [postsOrder]);

	async function handleSalvar(e) {
		e.preventDefault();

		const postArea = document.querySelector('textarea[name="post"]');
		if (post === "") {
			postArea.classList.add("shadow-[0_0_2px_2px_rgba(220,38,38,1)]");
			return;
		}
		postArea.classList.remove("shadow-[0_0_2px_2px_rgba(220,38,38,1)]");

		await addDoc(collection(db, "posts"), {
			post: post,
			createdAt: new Date(),
			userUid: userDetail?.uid,
		})
			.then(() => {
				setPost("");
			})
			.catch((error) => {
				console.log(error);
				alert("Ocorreu um erro");
			});
	}

	async function handleLogout() {
		await signOut(auth);
	}

	function handleOrder() {
		if (postsOrder === "desc") {
			setPostsOrder("asc");
		} else {
			setPostsOrder("desc");
		}
	}

	async function handleDelete(id) {
		const docRef = doc(db, "posts", id);
		await deleteDoc(docRef)
			.then(() => {
				alert("Tarefa concluida!");
			})
			.catch((error) => {
				console.log(error);
				alert("Ocorreu um erro");
			});
	}

	function handleEdit(post) {
		setEditPost(true);
		setEdit(post);
		setPost(post.post);
	}

	function handleCancelEdit() {
		setEditPost(false);
		setEdit({});
		setPost("");
	}

	async function handleSavarEdit(e) {
		e.preventDefault();

		const docRef = doc(db, "posts", edit?.id);
		await updateDoc(docRef, {
			post: post,
			createdAt: new Date(),
		})
			.then(() => {
				setPost("");
				setEditPost(false);
			})
			.catch((error) => {
				console.log(error);
				alert("Ocorreu um erro");
			});
	}

	return (
		<>
			<div className="flex flex-col items-center">
				<div className="flex flex-col max-w-[512px]">
					<h1 className="text-center pb-5">Novo posts</h1>

					<form
						className="flex flex-col gap-4"
						onSubmit={editPost ? handleSavarEdit : handleSalvar}
					>
						<textarea
							name="post"
							className="outline-none p-3 w-80 h-32 resize-none text-zinc-950 rounded-sm"
							placeholder="Escreva um novo post"
							value={post}
							onChange={(e) => {
								setPost(e.target.value);
							}}
						/>

						<div className="w-full flex flex-row gap-2">
							<button
								type="submit"
								className={
									editPost
										? "w-[90%] outline-none bg-zinc-800 text-zinc-50 rounded-sm font-bold py-1 transition-all hover:bg-green-500 hover:text-zinc-50"
										: "w-full outline-none bg-zinc-800 text-zinc-50 rounded-sm font-bold py-1 transition-all hover:bg-zinc-100 hover:text-zinc-800"
								}
							>
								{editPost ? <>Salvar</> : <>Adicionar</>}
							</button>

							{editPost && (
								<button
									type="button"
									className="w-[10%] grid place-items-center transition-all text-red-500 hover:text-zinc-50 hover:bg-red-500 rounded-sm cancelEdit"
									onClick={handleCancelEdit}
								>
									<PiProhibitBold />
								</button>
							)}
						</div>
					</form>
				</div>

				<div className="w-[45vw] mt-16">
					<div className="flex flex-row w-full">
						<h1 className="text-center w-[80%]">Seus posts</h1>

						<div className="w-[15%] grid place-items-center">
							<button type="button" onClick={handleOrder}>
								{postsOrder === "desc" ? (
									<div className="flex flex-row gap-2 items-center">
										<PiChartLineUpBold />
									</div>
								) : (
									<div className="flex flex-row gap-2 items-center">
										<PiChartLineDownBold />
									</div>
								)}
							</button>
						</div>
					</div>

					<section className="flex flex-col divide-y divide-dotted divide-zinc-600">
						{postList.length > 0 ? (
							<>
								{postList.map((post) => {
									const createdAtDate = post.createdAt?.toDate();
									const formattedDate = createdAtDate
										? createdAtDate.toLocaleDateString("pt-BR", {
												day: "2-digit",
												month: "2-digit",
												year: "numeric",
											})
										: "Data não disponível";

									const formattedHour = createdAtDate
										? createdAtDate.toLocaleTimeString("pt-BR", {
												hour: "2-digit",
												minute: "2-digit",
												hour12: false,
											})
										: "Hora não disponível";

									return (
										<article
											key={post.id}
											className="py-4 flex flex-row w-full"
										>
											<div className="w-[82.5%] flex items-center">
												<p>{post.post}</p>
											</div>

											<div className="w-[10%] flex items-center">
												<div className="text-sm flex flex-col items-center">
													<p>{formattedDate}</p>
													<p>às {formattedHour}</p>
												</div>
											</div>

											<div className="w-[7.5%] flex items-center">
												<button
													type="button"
													className="w-1/2 flex justify-center hover:text-blue-500 transition-all"
													onClick={() => {
														handleEdit(post);
													}}
												>
													<PiPencilSimpleBold />
												</button>

												<button
													type="button"
													className="w-1/2 flex justify-center hover:text-red-500 transition-all"
													onClick={() => {
														handleDelete(post.id);
													}}
												>
													<PiXCircleBold />
												</button>
											</div>
										</article>
									);
								})}
							</>
						) : (
							<div className="flex justify-center pt-[10%]">
								<Loading />
							</div>
						)}
					</section>
				</div>
			</div>

			<button
				type="button"
				className="fixed bottom-8 right-8 text-3xl text-zinc-700"
				onClick={handleLogout}
			>
				<PiButterflyBold />
			</button>
		</>
	);
}
