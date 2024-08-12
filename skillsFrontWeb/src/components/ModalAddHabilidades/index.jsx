import React, { useState, useEffect } from 'react';
import { Modal } from '../ModalGenerico';
import styles from './styles.module.css';

export const ModalAddHabilidades = ({ isOpen, onClose, onSave }) => {
    const [habilidadesDisponiveis, setHabilidadesDisponiveis] = useState([]);
    const [nomeHabilidade, setNomeHabilidade] = useState('');
    const [nivel, setNivel] = useState('');
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        fetchHabilidadesDisponiveis();
    }, []);

    const fetchHabilidadesDisponiveis = async () => {
        try {
            const response = await fetch('http://localhost:8080/habilidades');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setHabilidadesDisponiveis(data);
        } catch (error) {
            console.error("Erro ao buscar habilidades:", error);
        }
    };

    const handleSave = async () => {
        const novaHabilidade = {
            nomeHab: nomeHabilidade,
            nivelHab: parseInt(nivel, 10),
            descricao: descricao,
        };

        try {
            const response = await fetch('http://localhost:8080/habilidades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaHabilidade),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            onSave(data);
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar habilidade:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.modalContent}>
                <h2>Adicionar Habilidade</h2>
                <input
                    type="text"
                    placeholder="Nome da habilidade"
                    value={nomeHabilidade}
                    onChange={e => setNomeHabilidade(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Nível"
                    value={nivel}
                    onChange={e => setNivel(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                />
                <div className={styles.modalButtons}>
                    <button className={styles.botaoSalvar} onClick={handleSave}>Salvar</button>
                    <button className={styles.botaoCancelar} onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </Modal>
    );
};
