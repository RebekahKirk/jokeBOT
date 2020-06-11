import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const theme = {
    background: '#F5B700',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#DC0073',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#89FC00',
    botFontColor: 'black',
    userBubbleColor: '#008BF8',
    userFontColor: 'black',
};

class Chat extends Component {

    state = {
        loaded: false,
        joke: "",
        steps: [
            {
              id: '1',
              message: 'What is your name?',
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: 'Hi {previousValue}!',
              trigger: '4',
            },
            {
                id: '4',
                message: 'Would you like to hear a joke?',
                trigger: '5',
            },
            {
                id: '5',
                options: [
                    { value: 1, label: 'Yes', trigger: '6' },
                    { value: 2, label: 'No', trigger: '7' },
                ]
            },
            {
                id: '6',
                message: '',
                end: true,
            },
            {
                id: '7',
                message: 'Ok, come back when you want to have your funny bone tickled!',
                end: true,
            }
          ]
    }

    componentDidMount () {
        this.handleFetch()
    }

    handleFetch = async () => {
        let newJoke = ""

        await fetch('http://api.icndb.com/jokes/random')
            .then(res => res.json())
            .then(data => {
                newJoke = data.value.joke; 
                this.setState({ joke: newJoke })
            })

        let newSteps = this.state.steps

        newSteps[5].message = newJoke

        this.setState({ steps: newSteps, loaded: true })
    }

    render () {
        return(
            <div>
                <ThemeProvider theme={theme} >
                    {this.state.loaded ? 
                        <ChatBot steps={this.state.steps} 
                        botAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgcbLtWksT0B8vxfl4FdQe7bEw6ja_WzUfVdzckgtVg2sw2g2f&usqp=CAU"
                        headerTitle="JokeBOT"/> 
                            : <p>Loading...</p>}
                </ThemeProvider>
            </div>
        )
    }
}
export default Chat;
