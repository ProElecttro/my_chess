import React from 'react';
import styles from './inviteButton.module.css';

const InviteButton = () => {
  return (
    <div class={styles.buttonBorders}>
      <button class={styles.primaryButton}> SEND ROOM CODE
      </button>
    </div>
  );
};

export default InviteButton;
