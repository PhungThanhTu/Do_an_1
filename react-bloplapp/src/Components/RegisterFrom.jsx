import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RegisterForm() {
  return (
    <Form style={{}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Enter your name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formRetypePassword">
        <Form.Label>Retype Password</Form.Label>
        <Form.Control type="re-password" placeholder="Password" />
      </Form.Group>
      <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',}}>
        <Button variant="primary" type="submit" > Register</Button></div>
    </Form>
  );
}

export default RegisterForm;