import React, { Component } from 'react';
import { Segment, Container, Grid } from 'semantic-ui-react';
import gql from "graphql-tag";

import Title from './component/title/title.js';
import Add from './component/todo-add/add.js';
import TaskList from './component/todo-list/list.js';
import {client} from './index';

class App extends Component {
  state = {
    tasks: []
  }

componentDidMount = () => {
  this.getTaskList();
}

  render() {
    return (     
        <Container>
          <Title tasks={this.state.tasks} />

          <Segment attached>
            <Grid >              
                <Add onAdd = {this.getTaskList} />              
            </Grid>
            <TaskList tasks={this.state.tasks} onTaskUpdate = {this.getTaskList} />
          </Segment>
        </Container>     
    );
  }
  
  getTaskList = () => {
    client.query({
      query: gql`
        {
          tasks{
            id,
            task,
            completed
          }
        }
      `,
      fetchPolicy: "no-cache"
    }).then(result => {
      console.log(result.data.tasks);
      this.setState({
        tasks: result.data.tasks
      });
    });
  }
}

export default App;