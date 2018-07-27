import React from 'react';
import { Grid } from 'semantic-ui-react';
import { List, Button, Modal, Icon, Input } from 'semantic-ui-react';
import gql from "graphql-tag";

import {client} from '../../index';

export default class InCompleteTaskList extends React.Component {

    state = { modalOpen: false, id: '', oldtask: '', newTask: '' }
    handleOpen = (taskId, taskText) => this.setState({ modalOpen: true, id: taskId, oldtask: taskText, newTask: taskText })
    handleClose = () => this.setState({ modalOpen: false, id: '', oldtask: '', newTask: '' })

    render() {
        let taskList = this.props.tasks.map(item => {
            return (
                <List.Item key={item.id} onClick={() => this.handleOpen(item.id, item.task)}>
                    <List.Content floated='left'>
                        <Button circular color='teal' icon='check' onClick={() => this.onCheckClickHandler(item.id)} />  
                    </List.Content>
                    <List.Content floated='right'>
                        <Button circular color='red' icon='remove' onClick={() => this.onDeleteClickHandler(item.id)} />
                    </List.Content>                                        
                    <List.Content>
                        <List.Header>{item.task}</List.Header>                        
                    </List.Content>                                   
                </List.Item>
            );
        });
        
        return (            
            <Grid.Column> 
                <List selection divided animated verticalAlign='middle' size={'large'}>
                    { taskList }
                </List>

                <Modal 
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    basic
                    size='tiny'
                >
                    <Modal.Header>Update task todo</Modal.Header>
                    <Modal.Content >                        
                        <Modal.Description>
                            <Input 
                                size='big' 
                                placeholder='I want to...' 
                                icon='pencil' 
                                fluid 
                                value={this.state.newTask} 
                                onChange={e => this.setState({ newTask: e.target.value })} 
                            />
                            <br />                    
                            <Button 
                                animated 
                                floated='right' 
                                color='teal' 
                                onClick={this.onUpdateClickHandler}
                                disabled={this.state.oldtask === this.state.newTask || !this.state.newTask.trim()} 
                            >
                                <Button.Content visible>Done</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='right arrow' />
                                </Button.Content>
                            </Button>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>

            </Grid.Column>
        );
    }

    onCheckClickHandler = (taskId) => {
        client.mutate({
            mutation: gql`
                mutation updateTaskStatus($taskId: String!) {
                    updateTaskStatus(id: $taskId, completed: true) {
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

    onUpdateClickHandler = () => {
        client.mutate({
            mutation: gql`
                mutation updateTask($taskId: String!, $taskText: String!) {
                    updateTask(id: $taskId, task: $taskText) {
                      id,
                      task,
                      completed
                    }
                }
            `,
            variables:{
                taskId: this.state.id,
                taskText: this.state.newTask
            }
          }).then(result => {
            this.handleClose();
            this.props.onTaskUpdate();
          });
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

