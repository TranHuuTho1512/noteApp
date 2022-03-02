import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
    // Context
    const { registerUser } = useContext(AuthContext)
    //Router
    const [registerForm, setRegisterForm] = useState(
        {
            username: '',
            password: '',
            confirmPassword: '',
        }
    )

    const [alert, setAlert] = useState(null)

    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (event) => {
        setRegisterForm({
            ...registerForm, [event.target.name]: event.target.value
        });
    }
    const register = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Password do not match' })
            setTimeout(() => setAlert(null), 3000)
            return;
        }
        try {
            const registerData = await registerUser(registerForm);
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message })
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <>
            <Form onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group className='my-4'>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className='my-4'>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className='my-4'>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="cofirmPassword"
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group >
                <Button variant="success" type="submit">Register</Button>
            </Form>
            <p className='my-4'>Already have an account?
                <Link to="/login">
                    <Button variant="info" size="sm" className='m1-2'>Login</Button>
                </Link>
            </p>
        </>

    )
}

export default RegisterForm
