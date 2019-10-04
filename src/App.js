import React, { Component } from "react";
import "./App.css";
export default class App extends Component {
  state = {
    punchesIn: [],
    punchesOut: [],
    punchesTime: [],
    total: 0,
    date: null,
    time: null,
    in: false
  };

  formatMilliseconds = milliseconds => {
    let date = new Date(milliseconds);
    let hours = date.getHours() - 18;
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${hours}:${minutes}:${seconds}`;
  };

  addCurrentTime = clocked => {
    let punchesIn = [...this.state.punchesIn];
    let punchesOut = [...this.state.punchesOut];
    let punchesTime = [...this.state.punchesTime];
    let total = 0;
    this.setState({ in: !clocked });

    let time = new Date();
    if (clocked) {
      let periodEnd =
        time.getTime() - this.state.punchesIn[this.state.punchesIn.length - 1];
      console.log(periodEnd);
      punchesOut.push(time.getTime());

      punchesTime.push(periodEnd);
    } else {
      punchesIn.push(time.getTime());
    }
    total = punchesTime.reduce((a, b) => a + b, 0);

    this.setState({ punchesIn, punchesOut, punchesTime, total });
  };

  componentDidMount() {
    setInterval(() => {
      let date = new Date();
      let time = "";
      let dateS = date.toString();
      let total = this.state.total;
      dateS = dateS.split(" ");
      time = `${dateS[4]}`;
      dateS = `${dateS[0]} ${dateS[1]} ${dateS[2]} ${dateS[3]}`;

      if (this.state.in) {
        total = total + 500;
      }
      this.setState({
        date: dateS,
        time,
        total
      });
    }, 500);
  }
  render() {
    return (
      <div className="App">
        <h2>This is VTG-Sheets</h2>
        <h6>
          {this.state.date} {this.state.time}
        </h6>

        <br></br>
        <h3>Total Time:</h3>
        <h2>{this.formatMilliseconds(this.state.total)}</h2>
        <h4>
          Time left for 40 Hours:{" "}
          {this.formatMilliseconds(1 * 60 * 60 * 1000 - this.state.total)}
        </h4>
        <button onClick={() => this.addCurrentTime(this.state.in)}>
          {!this.state.in ? "Clock In" : "Clock Out"}
        </button>
        <div className="timeSheet">
          <div>
            <p>Ins</p>
            {this.state.punchesIn.map((punch, index) => {
              let date = new Date(punch);
              date = date.toString();
              date = date.split(" ");
              let time = `${date[4]}`;
              date = `${date[0]} ${date[1]} ${date[2]} ${date[3]}`;
              return (
                <p>
                  {date} {time}
                </p>
              );
            })}
          </div>
          <div>
            <p>Outs</p>
            {this.state.punchesOut.map((punch, index) => {
              let date = new Date(punch);
              date = date.toString();
              date = date.split(" ");
              let time = `${date[4]}`;
              date = `${date[0]} ${date[1]} ${date[2]} ${date[3]}`;
              return (
                <p>
                  {date} {time}
                </p>
              );
            })}
          </div>
          <div>
            <p>Time In</p>

            {this.state.punchesTime.map((punch, index) => {
              return <p>{this.formatMilliseconds(punch)}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
