import { useEffect, useState } from "react";
import { auth } from "../firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Loading } from "../components/loading";
import { Navigate } from "react-router-dom";

export function Private({ children }) {
	const [loading, setLoading] = useState(true);
	const [signed, setSigned] = useState(false);

	useEffect(() => {
		async function checkLogin() {
			const unsub = onAuthStateChanged(auth, (user) => {
				if (user) {
					const userData = {
						uid: user.uid,
						email: user.email,
					};

					localStorage.setItem("@datailUser", JSON.stringify(userData));

					setLoading(false);
					setSigned(true);
				} else {
					setLoading(false);
					setSigned(false);
				}
			});
		}
		checkLogin();
	}, []);

	if (loading) {
		return <Loading />;
	}

	if (!signed) {
		return <Navigate to="/" />;
	}

	return children;
}
