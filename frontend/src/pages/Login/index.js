import React, { useState, useEffect } from 'react';

import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Login() {
    const [id, setId] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        if (ongId) {
            history.push('/profile');
        }
    }, [history, ongId]);

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('session', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
        }
        catch(error) {
            alert('Falha no login, tente novamente');
        }

        history.push('/profile');
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input
                        placeholder="Seu ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Login</button>

                    <Link className="link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}
