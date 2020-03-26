import React, { useState } from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';


export default function Register() {


    const history = useHistory();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        const data = { nome, email, cidade, estado: uf, whatsapp };

        try {
            const res = await api.post('ongs', data);
            console.log(res.data)
            alert(`Seu ID de acesso: ${res.data.id}`);
            history.push("/");
        } catch (erro) {
            alert("Erro no cadastro. Tente novamente");
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajuda pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nome da ONG"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                        />
                        <input
                            placeholder="UF" style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}