import Image from "next/image";
import styles from "../styles/Home.module.css";
import PageLayout from "components/PageLayout";

export default function Home({ articles }) {
  return (
    <PageLayout title="News app - Home">
      <div className={styles.container}>
        {articles.length === 0 && <p>No tenemos artículos</p>}
        {articles.length > 0 &&
          articles.map((article, index) => (
            <div key={index}>
              <Image
                alt={`Image for the article ${article.title}`}
                src={article.urlToImage}
                width={450}
                height={300}
                quality={50}
              />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </div>
          ))}
      </div>
    </PageLayout>
  );
}

// N requests ---> se ejecuta 1 vez en build time o para refrescar la página
export async function getStaticProps() {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=7e85cb1cb9b64cbe8280dff24e180cd2"
  );
  const { articles } = await response.json();
  return {
    props: {
      articles
    }
  }
}


// N requests --> se ejecuta N veces
// para datos que necesitas que sean MUY live
// tiene demasiados datos dinámicos

// export async function getServerSideProps() {
//   const response = await fetch(
//     "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=7e85cb1cb9b64cbe8280dff24e180cd2"
//   );
//   const { articles } = await response.json();
//   return {
//     props: {
//       articles
//     }
//   }
// }
