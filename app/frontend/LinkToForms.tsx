import { surveys } from './form-templates/registry';

export function LinkToForms() {
  return (
    <div className='surveyLinkContainer'>
      {Object.keys(surveys).map((surveyKey, i) => {
        return (
          surveyKey !== 'feedback' && (
            <a key={i} href={`/surveys/${surveyKey}`}>
              <button className='formButton'>
                {surveys[surveyKey].surveyName}
              </button>
            </a>
          )
        );
      })}
    </div>
  );
}
