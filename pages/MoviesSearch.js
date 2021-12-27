import React from "react";
import Image from "next/image";

class MoviesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {},
      apiKey: props.api,
    };
  }

  searchMovies = async (event) => {
    const value = event.target.value;
    const url = "http://www.omdbapi.com/?apikey=" + this.state.apiKey;
    const res = await fetch(url + "&s=" + value);
    const result = await res.json();

    if (result.Response == "True") {
      this.setState({ query: result });
    } else {
      this.setState({
        query: {
          Response: "False",
        },
      });
    }
  };

  render() {
    const { query } = this.state;

    return (
      <>
        <input
          type="search"
          onChange={(e) => this.searchMovies(e)}
          placeholder="search movies..."
        />

        {query.Response == "True" && (
          <div
            style={{
              position: "absolute",
              background: "whitesmoke",
              zIndex: "30",
              width: "500px",
              height: "400px",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              border: "1px solid #ccc",
              overflowY: "scroll",
            }}
          >
            {query.Search.map((item, key) => (
              <div key={key} style={{ display: "inline-flex", gap: "0.5rem" }}>
                <picture>
                  <Image
                    src={
                      item.Poster == "N/A"
                        ? "https://img.icons8.com/ios-filled/50/000000/no-image.png"
                        : item.Poster
                    }
                    srcSet={
                      item.Poster == "N/A"
                        ? "https://img.icons8.com/ios-filled/50/000000/no-image.png"
                        : item.Poster
                    }
                    width={32}
                    height={32}
                    alt="No image"
                    layout="fixed"
                    priority
                  />
                </picture>
                {item.Title}
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
}

export default MoviesSearch;
