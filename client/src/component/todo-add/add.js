import React from 'react';
import { Grid, Button, Icon, Input } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from "graphql-tag";

class Add extends React.Component {
    state = {
        task: ''
    }

    render() {
        return (
            <Grid.Row>
                <Grid.Column width={14}>
                    <Input 
                        size='big' 
                        placeholder='I want to...' 
                        icon='pencil' 
                        fluid 
                        value={this.state.task} 
                        onChange={e => this.setState({ task: e.target.value })} 
                    />
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button 
                        animated 
                        floated='right' 
                        color='teal' 
                        onClick={this.addHandler}
                        disabled={!this.state.task.trim()}
                    >
                        <Button.Content visible>Done</Button.Content>
                        <Button.Content hidden>
                            <Icon name='right arrow' />
                        </Button.Content>
                    </Button>
                </Grid.Column>
            </Grid.Row>
        );
    }

    addHandler = async () => {        
        const { task } = this.state;
        await this.props.addMutation({
          variables: {
            task
          }
        });        
        this.setState({task : ''});
        this.props.onAdd();        
    }
}

const ADD_MUTATION = gql`
  mutation addTask($task: String!) {
    addTask(task: $task) {
      id,
      task,
      completed
    }
  }
`
export default graphql(
    ADD_MUTATION, 
    { 
        name: 'addMutation'
    }
)(Add)