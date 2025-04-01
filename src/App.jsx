import { Button, Container, Form } from 'react-bootstrap'
import './App.css'
import { useState } from 'react';

function App() { 
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    priority: 'low',
    isCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Container className='my-4'>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="name" name='name' placeholder="Entrez votre nom" required value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name='date' required value={formData.date} onChange={handleChange}/>
          </Form.Group>
          <Form.Label>Priorité</Form.Label>
          <Form.Select aria-label="Default select example" name='priority' value={formData.priority} onChange={handleChange}>
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Elevée</option>
          </Form.Select>
          <Form.Group className="my-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" name='isCompleted' label="Complet ?" required value={formData.isCompleted} onChange={handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default App
