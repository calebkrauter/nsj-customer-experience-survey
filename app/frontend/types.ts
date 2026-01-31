export type FieldType = 'text_input' | 'text_box' | 'stars' | 'dropdown_select_one';

interface QuestionBase {
  helpText: string,
  id: string,
  label: string,
  showLabel: boolean,
  required: boolean,
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

interface DropdownSelect extends QuestionBase {
  placeholder: string,
  options: string[],
}

export type SurveyQuestion = TextQuestion | StarsQuestion | DropdownSelect

export interface SurveyDefinition {
  surveyKey: string,
  surveyName: string,
  surveyPath: string,
  version: number,
  questions: SurveyQuestion[],
}

const enum Keys {
  PLACEHOLDER = 'placeholder',
  OPTIONS ='options',
}

export const enum FieldTypes {
  TEXT_INPUT = 'text_input',
  TEXT_BOX = 'text_box',
  STARS = 'stars',
  DROPDOWN_SELECT_ONE = 'dropdown_select_one',

}
  export function hasPlaceholder(question: SurveyQuestion): question is TextQuestion | DropdownSelect {
    return 'placeholder' in question;
  }

  export function hasOptions(question: SurveyQuestion): question is DropdownSelect {
    return 'options' in question;
  }