import React from 'react';
import { Header } from 'semantic-ui-react';

export default class Title extends React.Component {
    render() {
        const incompleteTasks = this.props.tasks.filter(item => !item.completed).length;
        
        return (
            <Header as='h2' attached='top' color='teal'>
                {`${incompleteTasks} - Tasks ToDo`}
            </Header>
        );
    }
}