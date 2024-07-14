import React from 'react'
import styles from "./playButton.module.css"

const PlayButton = (props) => {
    let handleJoinRoom = props.action;
    return (
        <div>
            <button className={styles.playButton} onClick={handleJoinRoom}>
                P L A Y
                <div id={styles.clip}>
                    <div id={styles.leftTop} class={styles.corner}></div>
                    <div id={styles.rightBottom} class={styles.corner}></div>
                    <div id={styles.rightTop} class={styles.corner}></div>
                    <div id={styles.leftBottom} class={styles.corner}></div>
                </div>
                <span id={styles.rightArrow} class={styles.arrow}></span>
                <span id={styles.leftArrow} class={styles.arrow}></span>
            </button>
        </div>
    )
}

export default PlayButton
