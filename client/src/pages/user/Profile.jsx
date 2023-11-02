import Layout from "../../components/Layout/Layout"
import UserMenu from './../../components/Layout/UserMenu'
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Profile = () => {
	//Context
	const [auth, setAuth] = useAuth();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAdress] = useState("");

	const navigate = useNavigate();

	// get user data
	useEffect(() => {
		console.log(auth.user);
		const { email, name, phone, address } = auth?.user;
		setName(name);
		setPhone(phone);
		setEmail(email);
		setAdress(address);
	}, [auth?.user]);

	//form function
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const { data } = await axios.put(
				`${import.meta.env.VITE_API}/api/v1/auth/profile`,
				{
					name,
					email,
					phone,
					address,
					password,
				}
			);

			if (data.error) {
				toast.error(data?.error);
			} else {
				setAuth({ ...auth, user: data?.updatedUser });
				let ls = localStorage.getItem("auth");
				ls = JSON.parse(ls);
				ls.user = data?.updatedUser;
				localStorage.setItem("auth", JSON.stringify(ls));
				toast.success("Profile Updated Successfully");
			}
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Layout>
			<div className="container-fluid m-3 p-3">
				<div className="row">
					<div className="col-md-3">
						<UserMenu />
					</div>
					<div className="col-md-9">
						<div className="form-container">
							<h1 className="title">USER PAGE</h1>

							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<input
										type="text"
										value={name}
										className="form-control"
										id="name"
										name="name"
										placeholder="Enter your Name"
										onChange={(e) =>
											setName(e.target.value)
										}
									/>
								</div>
								<div className="mb-3">
									<input
										type="email"
										value={email}
										className="form-control"
										id="email"
										name="email"
										placeholder="Enter your Email"
										onChange={(e) =>
											setEmail(e.target.value)
										}
										disabled
									/>
								</div>
								<div className="mb-3">
									<input
										type="password"
										value={password}
										className="form-control"
										id="password"
										name="password"
										placeholder="Enter your Password"
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</div>
								<div className="mb-3">
									<input
										type="text"
										value={phone}
										className="form-control"
										id="phone"
										name="phone"
										placeholder="Enter your phone"
										onChange={(e) =>
											setPhone(e.target.value)
										}
									/>
								</div>
								<div className="mb-3">
									<input
										type="text"
										value={address}
										className="form-control"
										id="address"
										name="address"
										placeholder="Enter your Address"
										onChange={(e) =>
											setAdress(e.target.value)
										}
									/>
								</div>
								<button
									type="submit"
									className="btn btn-primary"
								>
									UPDATE
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Profile