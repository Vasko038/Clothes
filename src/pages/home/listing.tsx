import React, { useState } from "react";
import {
  Checkbox,
  Slider,
  Row,
  Col,
  Typography,
  Divider,
  message,
  Pagination,
} from "antd";
import { useGetProductsFilterQuery } from "../../api/products.ts";
import { Loading } from "../../components/Loading.tsx";
import { ICategory, IProduct, IProductFilters } from "../../interface";
import { useGetCategoriesQuery } from "../../api/categories.ts";
import { ListingCard } from "../../components/listingCard.tsx";
const { Title } = Typography;

export const Listing: React.FC = () => {
  const [filters, setFilters] = useState<IProductFilters>({
    categories: [],
    color: "",
    size: "",
    price: [0, 200],
  });

  const [page, setPage] = useState<number>(1);

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsFilterQuery({ params: filters, page });
  const { data: categories } = useGetCategoriesQuery(undefined);

  const sizes = [
    { id: 1, name: "S" },
    { id: 2, name: "M" },
    { id: 3, name: "L" },
    { id: 4, name: "X" },
    { id: 5, name: "XL" },
    { id: 6, name: "XXL" },
  ];

  const handleCategoryChange = (checkedValues: Array<string>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categories: checkedValues,
    }));
  };

  const handleColorChange = (color: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      color,
    }));
  };

  const handleSizeChange = (size: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      size,
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: [value[0], value[1]], // qiymatlarni moslashtirish
    }));
  };

  if (isLoading) return <Loading />;
  if (error) {
    message.error("Error fetching products");
  }

  console.log({ filters });
  console.log({ products });

  return (
    <Row gutter={32} className="mx-6 w-[100%]">
      <Col
        span={6}
        className="max-w-[250px]"
        style={{
          border: "1px solid #E6E7E8",
          borderRadius: "6px",
          paddingBlock: "20px",
          maxHeight: "600px",
        }}
      >
        <Title level={4}>Categories</Title>
        <Checkbox.Group onChange={handleCategoryChange}>
          {categories.map((c: ICategory) => (
            <div
              key={c.id}
              style={{ width: "100%", borderBottom: "1px solid #E6E7E8" }}
              className="py-2"
            >
              <Checkbox value={c.id}>{c.name}</Checkbox>
            </div>
          ))}
        </Checkbox.Group>

        <Title level={4} className="pt-7">
          Color
        </Title>
        <div className="flex items-center gap-3">
          <div
            onClick={() => {
              handleColorChange("black");
            }}
            className="w-8 h-8 bg-black  cursor-pointer"
            style={
              filters.color == "black"
                ? {
                    borderRadius: "50%",
                    outline: "1px solid black",
                    border: "4px solid white",
                  }
                : { borderRadius: "50%" }
            }
          ></div>
          <div
            onClick={() => {
              handleColorChange("white");
            }}
            className="w-8 h-8 bg-white cursor-pointer"
            style={
              filters.color == "white"
                ? {
                    borderRadius: "50%",
                    outline: "1px solid black",
                  }
                : { borderRadius: "50%", border: "1px solid gainsboro" }
            }
          ></div>
          <div
            onClick={() => {
              handleColorChange("yellow");
            }}
            className="w-8 h-8 bg-yellow-300 cursor-pointer"
            style={
              filters.color == "yellow"
                ? {
                    borderRadius: "50%",
                    outline: "1px solid black",
                    border: "4px solid white",
                  }
                : { borderRadius: "50%" }
            }
          ></div>
          <div
            onClick={() => {
              handleColorChange("red");
            }}
            className="w-8 h-8 bg-red-500 cursor-pointer"
            style={
              filters.color == "red"
                ? {
                    borderRadius: "50%",
                    outline: "1px solid black",
                    border: "4px solid white",
                  }
                : { borderRadius: "50%" }
            }
          ></div>
        </div>

        <Divider />

        <Title level={4}>Size</Title>
        <div style={{ width: "100%" }} className="flex gap-2 flex-wrap">
          {sizes.map((s) => (
            <div
              key={s.id}
              onClick={() => {
                handleSizeChange(s.name);
              }}
              className="w-10 h-10 cursor-pointer flex justify-center items-center"
              style={
                filters.size == s.name
                  ? {
                      borderRadius: "4px",
                      border: "1px solid black",
                    }
                  : { borderRadius: "4px", border: "1px solid #E6E7E8" }
              }
            >
              {s.name}
            </div>
          ))}
        </div>

        <Divider />

        <Title level={4}>Price</Title>
        <Slider
          range
          min={0}
          max={200}
          defaultValue={[0, 1000]}
          onChange={handlePriceChange}
        />
        <div>
          Price: ${filters.price[0]} - ${filters.price[1]}
        </div>
      </Col>

      <Col span={18}>
        <Row gutter={[32, 32]}>
          {products.items.map((product: IProduct, index: number) => (
            <ListingCard
              key={product.id}
              filters={filters}
              product={product}
              index={index}
            />
          ))}
        </Row>
        <Pagination
          className="mt-5"
          align="center"
          current={page}
          total={products.meta.total_items}
          onChange={(page: number) => {
            setPage(page);
          }}
        />
      </Col>
    </Row>
  );
};
