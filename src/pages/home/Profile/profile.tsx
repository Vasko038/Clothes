import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { GrCart } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineTruck } from "react-icons/ai";
import { VscKey } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { Orders } from "./orders.tsx";
import { Address } from "./address.tsx";
import { Wishlist } from "./wishlist.tsx";
import { Password } from "./password.tsx";
import { AccountDetails } from "./account-details.tsx";
import { Logout } from "./logout.tsx";

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
        return <Orders />;
      case "wishlist":
        return <Wishlist />;
      case "address":
        return <Address />;
      case "password":
        return <Password />;
      case "account-details":
        return <AccountDetails />;
      case "log-out":
        return <Logout />;
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <div className="mx-6 flex">
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
