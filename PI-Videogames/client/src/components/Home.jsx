import "../App.css";
import { getAllGames, getGenres } from "../redux/Actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.showGames);

  const genres = useSelector((state) => state.gameGenres);

  const generos = genres.map((x) => ({ value: x.name, label: x.name }));
  const history = useHistory();

  const dataLimit = 10;
  const pageLimit = 11;
  const [pages] = useState(Math.round(videogames.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  const [state, setState] = useState("");

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return videogames.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };


  const atoz = getPaginatedData().sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const ztoa = getPaginatedData().sort(function (a, b) {
    if (b.name > a.name) {
      return 1;
    }
    if (b.name < a.name) {
      return -1;
    }
    return 0;
  });
  console.log(ztoa);
  const masRating = getPaginatedData().sort(function (a, b) {
    if (a.rating > b.rating) {
      return 1;
    }
    if (a.rating < b.rating) {
      return -1;
    }
    return 0;
  });

  const menosRating = getPaginatedData().sort(function (a, b) {
    if (b.rating > a.rating) {
      return 1;
    }
    if (b.rating < a.rating) {
      return -1;
    }
    return 0;
  });

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getGenres());
  }, [dispatch]);

  const handleGenres = (e) => {
    console.log(e);
    history.push(`/genres/${e.value}`);
  };

  const handleOrder = (e) => {
    console.log(e);
    setState(e.label);
  };

  const func = () => {
    if (state === "A-Z") {
      return atoz.map((x) => (
        <div className="card 1" key={x.name}>
          <h1 className="card_title title-white">{x.name}</h1>
          <Link to={`/videogames/${x.id}`}>
            <img src={x.background_image} alt="img" className="card_image" />
          </Link>
          {
            <h2>
              {x.genres.map((x) => (
                <p className="p" key={x.name}>
                  {x.name}
                </p>
              ))}{" "}
            </h2>
          }
        </div>
      ));
    } else if (state === "Z-A") {
      return ztoa.map((x) => (
        <div className="card 1" key={x.name}>
          <h1 className="card_title title-white">{x.name}</h1>
          <Link to={`/videogames/${x.id}`}>
            <img src={x.background_image} alt="img" className="card_image" />
          </Link>
          {
            <h2>
              {x.genres.map((x) => (
                <p className="p" key={x.name}>
                  {x.name}
                </p>
              ))}{" "}
            </h2>
          }
        </div>
      ));
    } else if (state === "+Rating") {
      return masRating.map((x) => (
        <div className="card 1" key={x.name}>
          <h1 className="card_title title-white">{x.name}</h1>
          <Link to={`/videogames/${x.id}`}>
            <img src={x.background_image} alt="img" className="card_image" />
          </Link>
          {
            <h2>
              {x.genres.map((x) => (
                <p className="p" key={x.name}>
                  {x.name}
                </p>
              ))}{" "}
            </h2>
          }
        </div>
      ));
    } else if (state === "-Rating") {
      return menosRating.map((x) => (
        <div className="card 1" key={x.name}>
          <h1 className="card_title title-white">{x.name}</h1>
          <Link to={`/videogames/${x.id}`}>
            <img src={x.background_image} alt="img" className="card_image" />
          </Link>
          {
            <h2>
              {x.genres.map((x) => (
                <p className="p" key={x.name}>
                  {x.name}
                </p>
              ))}{" "}
            </h2>
          }
        </div>
      ));
    } else {
      return getPaginatedData().map((x) => (
        <div className="card 1" key={x.id}>
          <h1 className="card_title title-white">{x.name}</h1>
          <Link to={`/videogames/${x.id}`}>
            <img src={x.background_image} alt="img" className="card_image" />
          </Link>
          {
            <h2>
              {x.genres.map((x) => (
                <p className="p" key={x.name}>
                  {x.name}
                </p>
              ))}{" "}
            </h2>
          }
        </div>
      ));
    }
  };

  const order = [
    { value: func(), label: "A-Z" },
    { value: func(), label: "Z-A" },
    { value: func(), label: "+Rating" },
    { value: func(), label: "-Rating" },
  ];

  return (
    <div className="App">
      <h1 className="title">Henry Videogames</h1>
      <div className="searchBy">
        <div>
          <label>Search By Genres:</label>
          <Select options={generos} onChange={(e) => handleGenres(e)} />
        </div>
        <div>
          <label>Order By:</label>
          <Select options={order} onChange={(e) => handleOrder(e)} />
        </div>
      </div>

      <div className="cards-list">{videogames.length ? func() : null}</div>
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Home;
