import React from 'react';
import { Grid } from 'semantic-ui-react';

import CompletedTaskList from './completedList';
import InCompleteTaskList from './incompleteList';


export default class TaskList extends React.Component {
    render() {
        const completedTaskList = this.props.tasks.filter(item => item.completed);
        const inompletedTaskList = this.props.tasks.filter(item => !item.completed);

        return (
            <Grid columns={2} divided>
                <Grid.Row>
                    <InCompleteTaskList tasks={inompletedTaskList} onTaskUpdate = {this.props.onTaskUpdate} />
                    <CompletedTaskList tasks={completedTaskList} onTaskUpdate = {this.props.onTaskUpdate} />
                </Grid.Row>
            </Grid>
        );
    }    
}