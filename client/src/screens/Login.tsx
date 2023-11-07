import { useState, memo } from 'react';
import { useHistory } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { uploadEmployees } from '../data/fetching';

let activeUser;

export const login = (employees, email, password) => {
    const user = employees!.find(
        (employee) => employee.email === email &&
            Number(employee.password) === Number(password)
    );

    if (user) {
        return user;
    } else {
        throw new Error('Invalid username or password');
    }
};

export function LoginScreen() {
    const [currentUser, setCurrentUser] = useState<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const employees = uploadEmployees();
    //const tasks = uploadTasks();

    const handleLogin = (email, password) => {
        try {
            activeUser = memo(() => login(employees, email, password));
            setCurrentUser(activeUser);
            console.log(login(employees, email, password).username);

        } catch(err) {
            console.log(err)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin(email, password);

        history.push('/home')
    };

    return (
        <FormContainer>
            <h1>UDV Group</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Электронная почта:
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        Пароль:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <div>
                    <button type="submit">Войти</button>
                </div>
            </form>
        </FormContainer>
    );
}

export default memo(activeUser)
