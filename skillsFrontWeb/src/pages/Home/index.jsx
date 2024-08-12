import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { ModalAddHabilidades } from '../../components/ModalAddHabilidades';
import { ListaHabilidade } from '../../components/ListaDeHabilidades';

const Home = () => {
    const [habilidades, setHabilidades] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchHabilidades();
    }, []);

    const fetchHabilidades = async () => {
        try {
            const response = await fetch('http://localhost:8080/habilidades');
            const data = await response.json();
            setHabilidades(data);
        } catch (error) {
            console.error("Erro ao buscar habilidades:", error);
        }
    };

    const handleAddHabilidade = async (novaHabilidade) => {
        try {
            const response = await fetch('http://localhost:8080/habilidades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novaHabilidade)
            });
            if (!response.ok) {
                throw new Error('Erro ao adicionar habilidade');
            }
            const habilidadeAdicionada = await response.json();
            setHabilidades([...habilidades, habilidadeAdicionada]);
        } catch (error) {
            console.error("Erro ao adicionar habilidade:", error);
        }
    };

    const handleDeleteHabilidade = async (habilidadeId) => {
        if (!habilidadeId) {
            console.error("ID da habilidade está indefinido");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/habilidades/${habilidadeId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar habilidade');
            }
            setHabilidades(habilidades.filter(habilidade => habilidade.habId !== habilidadeId));
        } catch (error) {
            console.error("Erro ao deletar habilidade:", error);
        }
    };

    const handleUpdateNivelHabilidade = async (habilidadeId, novoNivel) => {
        if (!habilidadeId) {
            console.error("ID da habilidade está indefinido");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/habilidades/${habilidadeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nivelHab: novoNivel })
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar nível da habilidade');
            }
            const habilidadeAtualizada = await response.json();
            setHabilidades(habilidades.map(habilidade => 
                habilidade.habId === habilidadeId ? habilidadeAtualizada : habilidade
            ));
        } catch (error) {
            console.error("Erro ao atualizar nível da habilidade:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.container}>
                <h1>Minhas Habilidades</h1>
                <div className={styles.habilidadeListContainer}>
                    <ListaHabilidade
                        habilidades={habilidades}
                        onDeletarHabilidade={handleDeleteHabilidade}
                        onAtualizarNivelHabilidade={handleUpdateNivelHabilidade}
                    />
                </div>
                <button className={styles.botaoAdicionar} onClick={() => setIsModalOpen(true)}>
                    Adicionar Habilidade
                </button>
                <button className={styles.botaoLogout} onClick={handleLogout}>
                    Logout
                </button>
                <ModalAddHabilidades
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleAddHabilidade}
                />
            </div>
        </div>
    );
};

export default Home;
