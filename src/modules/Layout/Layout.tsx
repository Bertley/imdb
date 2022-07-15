import React, { useCallback, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { Breadcrumb, Layout as AntLayout, Menu, MenuProps } from "antd";

const { Content, Footer } = AntLayout;

const paths: {
  [key: string]: string;
} = {
  home: "/",
  liked: "/liked",
};

const items: MenuProps["items"] = [
  {
    label: "Home",
    key: "home",
  },
  {
    label: "Liked",
    key: "liked",
  },
  {
    label: (
      <a href="https://www.linkedin.com/in/ehinomenidialu/" target="_blank" rel="noopener noreferrer">
        About the author
      </a>
    ),
    key: "author",
  },
];

function Layout() {
  const [current, setCurrent] = useState("home");
  let navigate = useNavigate();

  const onClick: MenuProps["onClick"] = useCallback((e: { key: string }) => {
    if (e.key !== "author") {
      setCurrent(e.key);
      navigate(paths[e.key], { replace: true });
    }
  }, []);

  return (
    <AntLayout>
      <div style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        The Movies DB ©2022 Created by Ehis Idialu
      </Footer>
    </AntLayout>
  );
}

export default Layout;
