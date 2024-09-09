import Title from "antd/es/typography/Title";
import {Loading} from "../../../components/Loading.tsx";
import {IOrder} from "../../../interface";
import {useGetOrdersByUserIdQuery} from "../../../api/orders.ts";
import {useUser} from "../../../App.tsx";

export const Orders = () => {
	const { user } = useUser();
	const { data: orders, error, isLoading } = useGetOrdersByUserIdQuery(
		user?.id ?? ""
	);
	
	if(isLoading) return <Loading />;
	if (error) return <div className="text-red-600">Error occured</div>;
	
	return <div>
		<Title level={3}>
			Orders
		</Title>
		<div>
			{orders.map((order: IOrder) => {
				return order.status
			})}
		</div>
	</div>
}