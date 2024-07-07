import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('URL');
      const data = await response.json();
      setTasks(data);
      setActiveTasks(data.filter(task => task.status === 'activo'));
      setCompletedTasks(data.filter(task => task.status === 'inactivo'));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      await fetch('URL_DE_TU_API/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      fetchTasks();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = async (editedTask) => {
    try {
      await fetch(`URL_DE_TU_API/tasks/${editedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
      });
      fetchTasks();
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    /// este es la carta para las tasks que faltan por hacer, buscar por su nombre o id 
    
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h2>Mis Tareas Activas</h2>
          <Button variant="primary" className="mb-3" onClick={() => setShowAddModal(true)}>
            Agregar Nueva Tarea
          </Button>
          <ol className="list-group list-group-numbered">
            {activeTasks.map(task => (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{task.nombre}</div>
                  <p>Descripción: {task.Descripcion}</p>
                  <p>Fecha de finalización: {task.Fecha}</p>
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
                  <Button variant="danger" size="sm">Marcar Completada</Button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      {/* //////////////////////////////////////////// */}

      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h2>Mis Tareas Finalizadas</h2>
            <ol className="list-group list-group-numbered">
              {completedTasks.map(task => (
                <li key={task.id} className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{task.nombre}</div>
                    <p>Descripción: {task.Descripcion}</p>
                    <p>Fecha de finalización: {task.Fecha}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            const newTask = {
              nombre: e.target.newTaskInput.value,
              Descripcion: e.target.newTaskDescription.value,
              Fecha: e.target.newTaskDueDate.value,
              status: 'activo',
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
        <Modal.Header closeButton>
          <Modal.Title>Editar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            const editedTask = {
              ...currentTask,
              nombre: e.target.taskInput.value,
              Descripcion: e.target.taskDescription.value,
              Fecha: e.target.taskDueDate.value,
            };
            handleEditTask(editedTask);
          }}>
            <Form.Group className="mb-3">
              <Form.Label>Tarea</Form.Label>
              <Form.Control type="text" id="taskInput" defaultValue={currentTask.nombre} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" id="taskDescription" rows={3} defaultValue={currentTask.Descripcion} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Finalización</Form.Label>
              <Form.Control type="date" id="taskDueDate" defaultValue={currentTask.Fecha} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskList;
