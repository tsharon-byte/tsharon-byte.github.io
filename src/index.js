import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class GameField extends React.PureComponent {
    render() {
        return (<button onClick={this.props.onClick} value={this.props.id}>{this.props.text}</button>);
    }
}

class Board extends React.PureComponent {
    render() {
        return (
            <div className="board">
                <table>
                    <tbody>
                    <tr>
                        <td><GameField text={this.props.buttonsList[0]} id={0} onClick={this.props.onClick}/></td>
                        <td><GameField text={this.props.buttonsList[1]} id={1} onClick={this.props.onClick}/></td>
                        <td><GameField text={this.props.buttonsList[2]} id={2} onClick={this.props.onClick}/></td>
                    </tr>
                    <tr>
                        <td><GameField text={this.props.buttonsList[3]} id={3} onClick={this.props.onClick}/></td>
                        <td><GameField text={this.props.buttonsList[4]} id={4} onClick={this.props.onClick}/></td>
                        <td><GameField text={this.props.buttonsList[5]} id={5} onClick={this.props.onClick}/></td>
                    </tr>
                    <tr>
                        <td><GameField text={this.props.buttonsList[6]} id={6} onClick={this.props.onClick}/></td>
                        <td><GameField text={this.props.buttonsList[7]} id={7} onClick={this.props.onClick}/></td>
                        <td><GameField text={this.props.buttonsList[8]} id={8} onClick={this.props.onClick}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

function checkGameFinished(currentIx, buttonsList) {
    let winner = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let mas of winner) {
        if (mas.includes(+currentIx)) {
            let [a, b, c] = mas;
            if (buttonsList[a] === buttonsList[b] && buttonsList[b] === buttonsList[c])
                return true;
        }
    }
    return false
}

class App extends React.Component {
    constructor(props) {
        super(props);
        let buttons = [];
        for (let i = 0; i < 9; i++) {
            buttons[i] = null;
        }
        this.state = {
            currentPlayer: "X",
            buttonsList: buttons,
            gameFinished: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        let currentPlayer = (this.state.currentPlayer === "X" ? "O" : "X");
        if (this.state.gameFinished) {
            alert("Игра окончена.  Победитель: " + currentPlayer);
            return;
        }
        if (this.state.buttonsList[event.target.value] != null) {
            return;
        }
        let buttons = this.state.buttonsList.slice();
        buttons[event.target.value] = this.state.currentPlayer;
        let gameFinished = checkGameFinished(event.target.value, buttons);
        this.setState({
            currentPlayer: currentPlayer,
            buttonsList: buttons,
            gameFinished: gameFinished
        });
    }

    render() {
        return (
            <div>
                <h1>Крестики-нолики</h1>
                <Board buttonsList={this.state.buttonsList} onClick={this.handleClick}/>
                <label>
                    {this.state.gameFinished ? ("Игра окончена.  Победитель: " + (this.state.currentPlayer === "X" ? "O" : "X")) : ("Ваш шаг, игрок " + this.state.currentPlayer)}
                </label>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
