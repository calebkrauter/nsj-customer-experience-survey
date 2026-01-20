'use client';
import { Left } from './components/Left';
import { Prompt } from './components/Prompt';
import { Prompts } from './components/Prompts';
import { Right } from './components/Right';
import { Stars } from './components/Stars';

export default function Home() {
  return (
    <main className='main'>
      <div className='surveryContainer'>
        <div className='header'>NORTH STAR JET</div>
        <div className='surveyStructure'>
          <Left className='left'>
            <Prompts />
          </Left>
          <Right className='right'>
            <input className='starsRating'></input>
            <Stars />
          </Right>
        </div>
      </div>
    </main>
  );
}
