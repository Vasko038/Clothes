import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineTruck } from "react-icons/ai";
import { VscKey } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import {Orders} from "./Profile/Orders.tsx";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
	{
		key: "orders",
		label: "Orders",
		icon: <GrCart />,
	},
	{
		key: "wishlist",
		label: "Wishlist",
		icon: <FaRegHeart />,
	},
	{
		key: "address",
		label: "Address",
		icon: <AiOutlineTruck />,
	},
	{
		key: "password",
		label: "Password",
		icon: <VscKey />,
	},
	{
		key: "account-details",
		label: "Account details",
		icon: <FaRegUser />,
	},
	{
		key: "log-out",
		label: "Logout",
		icon: <TbLogout />,
	},
];

export const Profile: React.FC = () => {
	const [selectedKey, setSelectedKey] = useState<string>("orders");
	
	const onClick: MenuProps["onClick"] = (e) => {
		setSelectedKey(e.key);
	};
	
	const renderContent = () => {
		switch (selectedKey) {
			case "orders":
				return <Orders/>;
			case "wishlist":
				return <div>Your Wishlist</div>;
			case "address":
				return <div>Your Addresses</div>;
			case "password":
				return <div>Change Password</div>;
			case "account-details":
				return <div>Account Details</div>;
			case "log-out":
				return <div>Logging Out</div>;
			default:
				return <div>Select a menu item</div>;
		}
	};
	
	return (
		<div className="mx-44 flex">
			
			
			<Menu
				onClick={onClick}
				style={{ width: 256 }}
				defaultSelectedKeys={["orders"]}
				mode="inline"
				items={items}
				className="mt-32"
			/>
			<div className="ml-10 mt-32 w-full">
				{renderContent()} {/* Tanlangan kontent */}
			</div>
		</div>
	);
};

