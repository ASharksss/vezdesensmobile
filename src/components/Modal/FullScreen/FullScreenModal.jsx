import React from 'react';
import styles from './fullScreenModal.module.css'

const FullScreenModal = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default FullScreenModal;