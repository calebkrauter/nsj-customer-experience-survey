export type FieldType = 'text_input' | 'text_box' | 'stars' | 'rating' | 'dropdown_select' | 'question_base' | 'check_box';

interface QuestionBase {
  helpText?: string,
  id: string,
  label: string,
  showLabel: boolean,
  required: boolean,
  header: boolean,
  showLine: boolean,
  type: FieldType,
}

interface TextQuestion extends QuestionBase {
  maxLength: number,
  minLength: number,
  placeholder: string,
}

interface StarsQuestion extends QuestionBase {
  max: number,
  min: number,
}

interface RatingRadioQuestion extends QuestionBase, StarsQuestion {
  options: string[]
}

type CheckBoxQuestion = RatingRadioQuestion;

interface DropdownSelectQuestion extends QuestionBase {
  placeholder: string,
  options: object[],
}


export type SurveyQuestion = TextQuestion | StarsQuestion | RatingRadioQuestion | DropdownSelectQuestion | QuestionBase

export interface SurveyDefinition {
  surveyKey: string,
  surveyName: string,
  surveyPath: string,
  version: number,
  questions: SurveyQuestion[],
}

const enum Keys {
  PLACEHOLDER = 'placeholder',
  OPTIONS = 'options',
}

export const enum FieldTypes {
  TEXT_INPUT = 'text_input',
  TEXT_BOX = 'text_box',
  STARS = 'stars',
  RATING = 'rating',
  DROPDOWN_SELECT = 'dropdown_select',
  QUESTION_BASE = 'question_base',
  CHECK_BOX = 'check_box',
}
  export function hasPlaceholder(question: SurveyQuestion): question is TextQuestion | DropdownSelectQuestion {
    return Keys.PLACEHOLDER in question;
  }

  export function hasOptionsDropdownSelect(question: SurveyQuestion): question is DropdownSelectQuestion {
    return Keys.OPTIONS in question;
  }

  export function hasOptionsRatingRadio(question: SurveyQuestion): question is RatingRadioQuestion {
    return Keys.OPTIONS in question;
  }

  export function hasOptionsCheckBox(question: SurveyQuestion): question is CheckBoxQuestion {
    return question.type === FieldTypes.CHECK_BOX;
  }

export const enum KeyValue {
  KEY = 0,
  VALUE = 1,
}