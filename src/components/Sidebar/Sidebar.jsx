import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import logo from "../../assets/logo.png";

const routes = [
  { title: "Home", icon: "fas-solid fa-house", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

const SidebarWrapper = styled.aside`
  display: flex;
  flex-direction: column;

  width: 76px;
  will-change: width;
  &.opened {
    width: 225px;
  }
  height: 100%;

  background: var(
    --color-sidebar-background-${(props) => props.theme?.current}-default
  );

  transition: all 0.2s ease-in-out;
`;

const SidebarToggleButton = styled.button`
  position: absolute;
  right: -43px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;

  cursor: pointer;

  color: var(--color-text-${(props) => props.theme?.current}-default);
  background: var(
    --color-button-background-${(props) => props.theme?.current}-default
  );
  will-change: right, background;
  ${SidebarWrapper}.opened & {
    right: -14px;
    background: var(
      --color-button-background-${(props) => props.theme.current}-active
    );
  }

  transition: all 0.2s ease-in-out;
`;

const SidebarHead = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
  position: relative;
`;

const LogoImage = styled.img`
  width: 48px;
  height: 48px;
  flex-grow: 0;
`;

const CompanyName = styled.span`
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 1;
  color: var(--color-text-logo-${(props) => props.theme?.current}-default);
  opacity: 0;
  overflow: hidden;
  ${SidebarWrapper}.opened & {
    opacity: 1;
  }
  transition: all 0.2s linear;
`;

const SidebarBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 0 auto;

  padding: 14px;
`;

const SidebarLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px;
  gap: 16px;
  border-radius: 16px;

  cursor: pointer;

  & svg {
    width: 20px;
    height: 20px;
  }
  color: var(--color-text-${(props) => props.theme?.current}-default);
  background: var(
    --color-sidebar-background-${(props) => props.theme?.current}-default
  );

  &:hover {
    color: var(--color-text-${(props) => props.theme?.current}-hover);
    background: var(
      --color-sidebar-background-${(props) => props.theme?.current}-hover
    );
  }

  &.active {
    color: var(--color-text-${(props) => props.theme?.current}-active);
    background: var(
      --color-sidebar-background-${(props) => props.theme?.current}-active
    );
  }

  transition: all 0.2s ease-in-out;
`;

const SidebarLinkText = styled.span`
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;

  opacity: 0;
  overflow: hidden;
  ${SidebarWrapper}.opened & {
    opacity: 1;
  }
  transition: all 0.2s linear;
`;

const SidebarBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 14px;
`;

const Sidebar = (props) => {
  const { color } = props;
  const [isOpened, setIsOpened] = useState(false);
  const containerClassnames = classnames("sidebar", { opened: isOpened });

  const [currentPath, setPath] = useState("/");

  const theme = {
    current: color,
  };

  const goToRoute = (path) => {
    setPath(path);
    // console.log(`going to "${path}"`);
  };

  const toggleSidebar = () => {
    setIsOpened((v) => !v);
  };

  return (
    <ThemeProvider theme={theme}>
      <SidebarWrapper className={containerClassnames}>
        <SidebarHead>
          <LogoImage src={logo} alt="TensorFlow logo" />
          <CompanyName>TensorFlow</CompanyName>
          <SidebarToggleButton onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isOpened ? "angle-left" : "angle-right"} />
          </SidebarToggleButton>
        </SidebarHead>
        <SidebarBody>
          {routes.map((route) => (
            <SidebarLink
              key={route.title}
              onClick={() => {
                goToRoute(route.path);
              }}
              className={route.path === currentPath ? "active" : ""}
            >
              <FontAwesomeIcon icon={route.icon} />
              <SidebarLinkText>{route.title}</SidebarLinkText>
            </SidebarLink>
          ))}
        </SidebarBody>
        <SidebarBottom>
          {bottomRoutes.map((route) => (
            <SidebarLink
              key={route.title}
              onClick={() => {
                goToRoute(route.path);
              }}
              className={route.path === currentPath ? "active" : ""}
            >
              <FontAwesomeIcon icon={route.icon} />
              <SidebarLinkText>{route.title}</SidebarLinkText>
            </SidebarLink>
          ))}
        </SidebarBottom>
      </SidebarWrapper>
    </ThemeProvider>
  );
};

Sidebar.propTypes = {
  color: PropTypes.string,
};

export default Sidebar;
