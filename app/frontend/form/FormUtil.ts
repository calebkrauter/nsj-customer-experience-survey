import { surveys } from '../form-templates/registry';
import { hasOptionsCheckBox, hasOptionsDropdownSelect, hasOptionsRatingRadio, hasPlaceholder, SurveyQuestion } from '../types';

export function placeholder(i: number, surveyKey: string) {
    const questions: SurveyQuestion[] = surveys[surveyKey].questions;
    return hasPlaceholder(questions[i]) ? questions[i].placeholder : '';
  }

  export function optionsDropdownSelect(i: number, surveyKey: string) {
    const questions: SurveyQuestion[] = surveys[surveyKey].questions;
    return hasOptionsDropdownSelect(questions[i]) ? questions[i].options : [];
  }
  export function optionsRatingRadio(i: number, surveyKey: string) {
    const questions: SurveyQuestion[] = surveys[surveyKey].questions;
    return hasOptionsRatingRadio(questions[i]) ? questions[i].options : [];
  }
  export function optionsCheckBox(i: number, surveyKey: string) {
    const questions: SurveyQuestion[] = surveys[surveyKey].questions;
    return hasOptionsCheckBox(questions[i]) ? questions[i].options : [];
  }
