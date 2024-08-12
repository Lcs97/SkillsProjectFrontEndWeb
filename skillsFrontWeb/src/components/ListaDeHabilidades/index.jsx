import React from 'react';
import styles from './styles.module.css';

export const ListaHabilidade = ({ habilidades }) => {
    return (
        <ul className={styles.listaHabilidade}>
            {Array.isArray(habilidades) && habilidades.length > 0 ? (
                habilidades.map(habilidade => (
                    <li key={habilidade.habId} className={styles.habilidadeItem}>
                        {habilidade.imageUrl && (
                            <img src={habilidade.imageUrl} alt={habilidade.nomeHab} className={styles.imagemHabilidade} />
                        )}
                        <div className={styles.infoHabilidade}>
                            <h3>{habilidade.nomeHab}</h3>
                            <p>{habilidade.descricao}</p>
                        </div>
                    </li>
                ))
            ) : (
                <p>Não há habilidades disponíveis.</p>
            )}
        </ul>
    );
};
