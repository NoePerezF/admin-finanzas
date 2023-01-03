import React from "react";

const Menu = ({setpage, page}) => {
    const onClickMenu = (page) => {
        setpage(page)
    }
  return (
    <nav class="navbar navbar-dark bg-primary navbar-expand-lg">
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class={`nav-link ${page === 1 ? "active" : ""}`} aria-current="page" href="#" onClick={() => onClickMenu(1)}>
              Resumen
            </a>
          </li>
          <li class="nav-item">
            <a class={`nav-link ${page === 2 ? "active" : ""}`}  href="#" onClick={() => onClickMenu(2)}>
              Add tarjeta
            </a>
          </li>
          <li class="nav-item">
            <a class={`nav-link ${page === 3 ? "active" : ""}`}  href="#" onClick={() => onClickMenu(3)}>
              Add gasto
            </a>
          </li>
          <li class="nav-item">
            <a class={`nav-link ${page === 4 ? "active" : ""}`}  href="#" onClick={() => onClickMenu(4)}>
              Add ingreso
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
