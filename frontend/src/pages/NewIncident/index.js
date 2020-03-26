import React, { useState } from 'react';
import "./style.css";
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';


export default function NewIncident() {

    const history = useHistory();
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const ongId = localStorage.getItem("ongId");

    async function handleNewIncident(e) {
        e.preventDefault();
        const data = { titulo, descricao, valor };
        try {
            await api.post("incidents", data, { headers: { authorization: ongId } });
            history.push("/perfil");
        } catch (error) {
            alert("Erro ao cadastrar caso. Tente novamente.")
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text"
                        placeholder="Título do caso"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <textarea
                        placeholder="Descricao"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}>
                    </textarea>
                    <input
                        placeholder="Valor em reais"
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                    />

                    <button className="button">Cadastrar</button>

                </form>
            </div>
        </div >
    );
}
