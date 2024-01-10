import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <h3>Escreva sobre o que você tem interesse</h3>
        <p>MiniBlog &copy; 2023</p>

        <p>projeto criado pra colocar em prática aprendizados no Curso de React.</p>
        <a href="https://github.com/fabcode01" target='_blank'>
          <p>GitHub</p>
        </a>
    </footer>
  )
}

export default Footer