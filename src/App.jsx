import { Button, Container, Form } from 'react-bootstrap'
import './App.css'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Le nom est requis')
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .max(15, 'Le nom ne peut pas dépasser 15 caractères'),
  date: yup
    .string()
    .required("La date est requise")
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Le format doit être jj/mm/AAAA')
    .test("max-date", "La date ne doit pas être antérieure à la date du jour", (value) => {
      const [day, month, year] = value.split('/');
      const reconstructedDate = new Date(`${year}-${month}-${day}`);
      reconstructedDate.setDate(reconstructedDate.getDate() + 1); // Add 1 day so current date is valid.
      return new Date(reconstructedDate) >= new Date();
    }),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"], "La priorité doit être 'Basse', 'Moyenne' ou 'Elevée"),
  isCompleted: yup
    .boolean()
});

function App() { 
  const { register, handleSubmit, reset, formState: { errors }} = useForm({
    defaultValues: {
      name: '',
      date: '',
      priority: 'low',
      isCompleted: false,
    },
    resolver: yupResolver(schema),
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
              {...register("name")}
              type="name" 
              placeholder="Entrez votre nom"
            />
            {errors.name && <p className='text-danger'>{errors.name.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="text"
              {...register("date")}
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
