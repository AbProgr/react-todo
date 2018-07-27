import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Icon, List, Button } from 'semantic-ui-react'
import gql from "graphql-tag";

import {client} from '../../index';

export default class CompletedTaskList extends React.Component {
    render() {

        let taskList = this.props.tasks.map(item => {
            return (
                <List.Item key={item.id}>                   
                    <List.Content floated='right'>                        
                        <Button circular color='red' icon='remove' onClick={() => this.onDeleteClickHandler(item.id)} />                    
                    </List.Content>       
                    <Icon name='right triangle' />                                  
                    <List.Content>
                        <List.Header style={{textDecorationLine: 'line-through'}}>{item.task}</List.Header>                        
                    </List.Content>                   
                </List.Item>
            );
        });

        return (            
            <Grid.Column> 
                <List divided animated verticalAlign='middle' size={'large'}>
                    { taskList }
                </List>
            </Grid.Column>
        );
    }
    
    onDeleteClickHandler = (taskId) => {
        client.mutate({
            mutation: gql`
                mutation deleteTask($taskId: String!) {
                    deleteTask(id: $taskId) {
                      id,
                      task,
                      completed
                    }
                }
            `,
            variables:{
                taskId: taskId
            }
          }).then(result => {
            this.props.onTaskUpdate();
          });
    }
}