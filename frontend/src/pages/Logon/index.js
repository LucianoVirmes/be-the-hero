import React, { useState } from 'react';
import './style.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Logon() {

    const history = useHistory();
    const [id, setId] = useState('');

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post("sessions", { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.nome);
            history.push("/perfil");

        } catch (error) {
            alert("Falha no login. Tente novamente.")
        }
    }


    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        type="text"
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>
                    <Link className="back-link" to="/cadastro">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="heroes" />
        </div>
    );
}
