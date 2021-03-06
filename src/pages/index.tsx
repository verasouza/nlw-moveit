import { CompletedChallegens } from '../components/CompletedChallegens';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../context/CountdownContext';
import {GetServerSideProps} from 'next';
import {ChallegensProvider} from '../context/ChallengesContext';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export default function Home(props: HomeProps) {
 
  return (
    <ChallegensProvider 
    level={props.level}
    currentExperience = {props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >

    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />
      <CountdownProvider>
      <section>
        <div>
          <Profile />
          <CompletedChallegens />
          <Countdown />
        </div>
        <div>
          <ChallengeBox />

        </div>
      </section>
      </CountdownProvider>

    </div>
    </ChallegensProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>{
  const{level, currentExperience,challengesCompleted } = ctx.req.cookies;

  return{
    props:{
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}