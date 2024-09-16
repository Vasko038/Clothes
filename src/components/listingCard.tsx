import { Col } from "antd";
import { IProduct, IProductFilters } from "../interface";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";

export const ListingCard = ({
  product,
  index,
  filters,
}: {
  product: IProduct;
  index: number;
  filters: IProductFilters;
}) => {
  const navigate = useNavigate();

  return (
    <Col
      key={index}
      span={8}
      onClick={() => {
        navigate(`/ecommerse/product?id=${product.id}`);
      }}
    >
      <div className="mt-8 cursor-pointer">
        <img
          alt="product image"
          src={
            filters.color == "red"
              ? product.images[3].image
              : filters.color == "white"
                ? product.images[1].image
                : filters.color == "yellow"
                  ? product.images[2].image
                  : product.images[0].image
          }
          style={{ width: "100%", height: "250px", objectFit: "cover" }}
        />
        <Title level={5} className="mt-6 mb-4">
          {product.title}
        </Title>
        <div className="flex items-center gap-5">
          <div
            style={{
              width: "100px",
              height: "28px",
              borderRadius: "14px",
              border: "1px solid #E6E7E8",
            }}
            className="flex items-center justify-center"
          >
            {product ? "In stock" : "Out of stock"}
          </div>
          <p className="text-gray-600">${product.price}</p>
        </div>
      </div>
    </Col>
  );
};
