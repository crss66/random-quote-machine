class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <QuoteBox />
      </div>
    );
  }
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      color: "",
      fade: "",
      data: [],
      status: false,
    };
    this.colorsArr = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
    ];
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let indexColor = Math.floor(Math.random() * this.colorsArr.length);
    this.setState({
      color: this.colorsArr[indexColor],
      fade: "fade-out",
    });
    if (this.state.status) {
      let index = Math.floor(Math.random() * this.state.data.length);
      setTimeout(() => {
        this.setState({
          fade: "fade-in",
          quote: this.state.data[index].quote,
          author: this.state.data[index].author,
        });
      }, 1000);
    }
  }
  componentDidMount() {
    var xhr = new XMLHttpRequest();
    var json_obj,
      status = false;
    xhr.open(
      "GET",
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
      true
    );
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var json_obj = JSON.parse(xhr.responseText);
          status = true;
          let index = Math.floor(Math.random() * json_obj.quotes.length);
          this.setState({
            data: [...json_obj.quotes],
            author: json_obj.quotes[index].author,
            quote: json_obj.quotes[index].quote,
            status: true,
          });
        } else {
          console.error(xhr.statusText);
        }
      }
    }.bind(this);
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);

    let indexColor = Math.floor(Math.random() * this.colorsArr.length);
    this.setState({
      color: this.colorsArr[indexColor],
      fade: "fade-in",
    });
  }

  render() {
    if (this.state.status) {
      return (
        <div
          className={`container`}
          style={{ backgroundColor: this.state.color }}
        >
          <div id="quote-box" style={{ backgroundColor: "white" }}>
            <Quote
              quote={this.state.quote}
              author={this.state.author}
              color={this.state.color}
              fade={this.state.fade}
            />
            <Buttons handleClick={this.handleClick} color={this.state.color} />
          </div>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}
const Quote = (props) => {
  return (
    <div style={{ color: props.color }} className={props.fade}>
      <h1 id="text" className="anim">
        <i className="fas fa-quote-left" /> {props.quote}{" "}
        <i className="fas fa-quote-right" />
      </h1>
      <p id="author" className="anim">
        {" "}
        - {props.author}
      </p>
    </div>
  );
};
const Buttons = (props) => {
  return (
    <div className="buttons">
      <a href="twitter.com/intent/tweet" target="_blank" id="tweet-quote">
        <i
          className="fab fa-twitter-square fa-2x button"
          style={{ color: props.color }}
        />
      </a>
      <a href="#">
        <i
          className="fab fa-tumblr-square fa-2x button"
          style={{ color: props.color }}
        />
      </a>
      <button
        id="new-quote"
        className="button"
        style={{ backgroundColor: props.color, color: "white" }}
        onClick={props.handleClick}
      >
        New Quote
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("wrapper"));
