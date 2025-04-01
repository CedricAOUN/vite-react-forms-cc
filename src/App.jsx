import { Button, Container, Form } from 'react-bootstrap'
import './App.css'
import { useForm } from 'react-hook-form';

function App() { 
  const { register, handleSubmit, reset, formState: { errors }} = useForm({
    defaultValues: {
      name: '',
      date: '',
      priority: 'low',
      isCompleted: false,
    }
  });
    
  const onSubmit = (data) => {
    console.log(data);
    reset();
  }
  return (
    <>
      <Container className='my-4'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nom</Form.Label>
            <Form.Control 
              {...register("name", { required: 'Le nom est requis' })} 
              type="name" 
              placeholder="Entrez votre nom"
            />
            {errors.name && <p className='text-danger'>{errors.name.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="date"
              {...register("date", { required: 'La date est requise'})}
            />
            {errors.date && <p className='text-danger'>{errors.date.message}</p>}
          </Form.Group>
          <Form.Group className="my-3" controlId="priority">
            <Form.Label>Priorité</Form.Label>
            <Form.Select 
              {...register("priority")} 
            >
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Elevée</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="my-3" controlId="isCompleted">
            <Form.Check 
              {...register("isCompleted")} 
              type="checkbox" 
              label="Complet ?"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default App;
