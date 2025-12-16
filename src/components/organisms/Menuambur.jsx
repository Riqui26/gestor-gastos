import styled from "styled-components";
import { useState } from "react";
import { v } from "../../styles/variables";
import { LinksArray } from "../../index";
import { NavLink } from "react-router-dom";

export function Menuambur() {
  const [click, setClick] = useState(false);

  return (
    <Container>
      <NavBar>
        <HamburgerMenu $click={click} onClick={() => setClick(!click)}>
          <div className="contentLogo">
            <img src={v.logo} alt="logo" />
          </div>
        </HamburgerMenu>

        <Menu $click={click}>
          {LinksArray.map(({ icon, label, to }) => (
            <div
              key={label}
              className="LinkContainer"
              onClick={() => setClick(false)}
            >
              <NavLink to={to} className="Links">
                <div className="Linkicon">{icon}</div>
                <span>{label}</span>
              </NavLink>
            </div>
          ))}
        </Menu>
      </NavBar>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${(props) => props.theme.body};
  cursor: pointer;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  height: 100vh;
  margin: 0 auto;
  
  @media (max-width: 64em) {
    width: 100%;
    padding: 0 ${v.mdSpacing};
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
`;

const HamburgerMenu = styled.div`
  width: ${(props) => (props.$click ? "4rem" : "3.5rem")};
  height: 3.5rem;
  border-radius: 3px;
  z-index: 101;
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 64em) {
    display: flex;
  }

  .contentLogo {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 80%;
      max-width: 50px;
      transition: transform 0.3s ease;
      transform: ${(props) => (props.$click ? "rotate(90deg)" : "rotate(0)")};
    }
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  z-index: 100;

  @media (max-width: 64em) {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.95)`};
    backdrop-filter: blur(5px);
    transform: ${(props) =>
      props.$click ? "translateY(0)" : "translateY(-100%)"};
    transition: transform 0.3s ease;
    flex-direction: column;
    justify-content: center;
    gap: ${v.mdSpacing};
  }

  .LinkContainer {
    border-radius: ${v.borderRadius};
    transition: background 0.2s ease;

    &:hover {
      background: ${(props) => props.theme.bgAlpha};
    }

    .Links {
      width: 10vw;
      display: flex;
      align-items: center;
      text-decoration: none;
      color: ${(props) => props.theme.text};
      height: 100px;
      position: relative;

      @media (max-width: 64em) {
        width: 80vw;
        height: 60px;
        justify-content: flex-start;
        padding: 0 ${v.lgSpacing};
        font-size: 1.2rem;
      }

      .Linkicon {
        padding: ${v.smSpacing} ${v.mdSpacing};
        display: flex;

        svg {
          font-size: 25px;
        }
      }

      span {
        @media (max-width: 64em) {
          display: block;
          margin-left: ${v.smSpacing};
        }
      }

      &.active {
        &::before {
          position: absolute;
          content: "";
          height: 100%;
          left: 0;
          top: 0;
          width: 4px;
          border-radius: 10px;
          background-color: ${(props) => props.theme.bg5};
          transition: all 0.3s ease;
        }
        .Linkicon {
          color: ${(props) => props.theme.bg5};
        }
      }
    }
  }
`;