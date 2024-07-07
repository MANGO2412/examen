import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const ListItem = styled.li`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 10px;
`;

const TaskTitle = styled.div`
  font-size: 18px;
  color: #007bff;
  font-weight: bold;
`;

const CustomModalHeader = styled(Modal.Header)`
  background-color: #007bff;
  color: white;
`;

const CustomModalFooter = styled(Modal.Footer)`
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 10px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks/list');
      const data = response.data;
      setTasks(data);
      setActiveTasks(data.filter(task => task["status"] === false));
      setCompletedTasks(data.filter(task => task["status"] === true));
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      await axios.post('http://localhost:8000/api/tasks/create', newTask);
      fetchTasks();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (editedTask) => {
    try {
      await axios.put(`http://localhost:8000/api/tasks/update/${editedTask.id}`, editedTask);
      fetchTasks();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      const completedTask = {
        status: true,
      };
      try {
        await axios.put(`http://localhost:8000/api/tasks/complete/${taskId}`, completedTask);
        fetchTasks();
      } catch (error) {
        console.error('Error completing task:', error);
      }
    }
  };

  const filteredActiveTasks = activeTasks.filter(task =>
    task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompletedTasks = completedTasks.filter(task =>
    task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-5">
      <div className="row">
        <div className="col">
          <Title>Mis Tareas Activas</Title>
          <Button variant="primary" className="mb-3" onClick={() => setShowAddModal(true)}>
            Agregar Nueva Tarea
          </Button>
          <Form.Control
            type="text"
            placeholder="Buscar tareas..."
            className="mb-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ol className="list-group list-group-numbered">
            {filteredActiveTasks.map(task => (
              <ListItem key={task.id} className="list-group-item">
                <div className="ms-2 me-auto">
                  <TaskTitle>{task.title}</TaskTitle>
                  <p>Descripción: {task.description}</p>
                  <p>Fecha de finalización: {task.final_date}</p>
                </div>
                <div>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setCurrentTask(task);
                      setShowEditModal(true);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCompleteTask(task.id)}
                  >
                    Marcar Completada
                  </Button>
                </div>
              </ListItem>
            ))}
          </ol>
        </div>
      </div>

      <Container className="mt-5">
        <div className="row">
          <div className="col">
            <Title>Mis Tareas Finalizadas</Title>
            <ol className="list-group list-group-numbered">
              {filteredCompletedTasks.map(task => (
                <ListItem key={task.id} className="list-group-item">
                  <div className="ms-2 me-auto">
                    <TaskTitle>{task.title}</TaskTitle>
                    <p>Descripción: {task.description}</p>
                    <p>Fecha de finalización: {task.final_date}</p>
                  </div>
                </ListItem>
              ))}
            </ol>
          </div>
        </div>
      </Container>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <CustomModalHeader closeButton>
          <Modal.Title>Agregar Nueva Tarea</Modal.Title>
        </CustomModalHeader>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            const newTask = {
              title: e.target.newTaskInput.value,
              description: e.target.newTaskDescription.value,
              user: 1,
              final_date: e.target.newTaskDueDate.value,
              status: false,
            };
            handleAddTask(newTask);
          }}>
            <Form.Group className="mb-3">
              <Form.Label>Nueva Tarea</Form.Label>
              <Form.Control type="text" id="newTaskInput" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" id="newTaskDescription" rows={3} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Finalización</Form.Label>
              <Form.Control type="date" id="newTaskDueDate" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Agregar Tarea
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <CustomModalHeader closeButton>
          <Modal.Title>Editar Tarea</Modal.Title>
        </CustomModalHeader>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            const editedTask = {
              ...currentTask,
              title: e.target.taskInput.value,
              description: e.target.taskDescription.value,
              final_date: e.target.taskDueDate.value,
              status: false,
            };
            handleEditTask(editedTask);
          }}>
            <Form.Group className="mb-3">
              <Form.Label>Tarea</Form.Label>
              <Form.Control type="text" id="taskInput" defaultValue={currentTask.title} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" id="taskDescription" rows={3} defaultValue={currentTask.description} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Finalización</Form.Label>
              <Form.Control type="date" id="taskDueDate" defaultValue={currentTask.final_date} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TaskList;
