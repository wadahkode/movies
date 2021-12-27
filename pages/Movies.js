import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import styles from "../styles/Home.module.css";

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.data,
      x: 0,
      y: 8,
      popup: {
        status: false,
        data: {},
      },
    };
  }

  getMoreMovies = async () => {
    let y = this.state.y;

    window.addEventListener("scroll", (event) => {
      if (event.path[1].scrollY > 200) {
        setTimeout(() => {
          this.setState({ x: 0, y: y++ });
        }, 2000);
      }
    });
  };

  showDetailMovies = (key) => {
    this.setState({
      popup: {
        status: true,
        data: this.state.items[key],
      },
    });
  };

  render() {
    const { status, data } = this.state.popup;
    const { items } = this.state;

    return (
      <>
        {items && (
          <InfiniteScroll
            dataLength={items.length}
            next={this.getMoreMovies}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2rem",
            }}
            hasMore={true}
            loader={<div></div>}
          >
            {items.slice(this.state.x, this.state.y).map((item, key) => (
              <div
                key={key}
                className={styles.card}
                onClick={() => this.showDetailMovies(key)}
              >
                <picture>
                  <Image
                    src={item.Poster}
                    srcSet={
                      item.Poster == "N/A"
                        ? "https://img.icons8.com/ios-filled/50/000000/no-image.png"
                        : item.Poster
                    }
                    width={144}
                    height={200}
                    alt="No image"
                    layout="responsive"
                    priority
                  />
                </picture>
                <div className={styles.flex}>
                  <h2>{item.Title}</h2>
                  <h2>{item.imdbRating}</h2>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        )}
        {status && (
          <div className={styles.popup}>
            <div className={styles["popup-body"]}>
              <picture style={{ height: "300px" }}>
                <Image
                  src={data.Poster}
                  srcSet={
                    data.Poster == "N/A"
                      ? "https://img.icons8.com/ios-filled/50/000000/no-image.png"
                      : data.Poster
                  }
                  width={320}
                  height={460}
                  alt="No image"
                  layout="fixed"
                  priority
                />
              </picture>
              <div className={styles["popup-detail"]}>
                <table>
                  <tbody>
                    <tr>
                      <td>Title</td>
                      <td>{data.Title}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => this.setState({ popup: { status: false } })}
                >
                  tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Movies;
