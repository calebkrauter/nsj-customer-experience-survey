
import { describe, it, expect, test } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { optionsCheckBox, optionsDropdownSelect, optionsRatingRadio, placeholder } from '../../frontend/form/FormUtil';
import { hasOptionsCheckBox, hasOptionsDropdownSelect, hasOptionsRatingRadio, hasPlaceholder, SurveyQuestion } from '../../../app/frontend/types';
import { surveys } from '../../../app/frontend/form-templates/registry';

describe('placeholder', () => {
  it('Should get a placeholder for the input field', async () => {
    expect(placeholder(0, 'customer_experience')).toBe('N123AB');
  });
});

describe('optionsDropdownSelect', () => {
  it('Should get a placeholder for the dropdown select', async () => {
    expect(optionsDropdownSelect(1, 'customer_experience')).toStrictEqual(['CAA', 'Contract Fuel', 'Prices', 'Customer Service', 'Word of Mouth', 'Other'],
);
  });
});

describe('optionsRatingRadio', () => {
  it('Should get a placeholder for the rating radio', async () => {
    expect(optionsRatingRadio(2, 'fbo_workshop_survey')).toStrictEqual([
					'Very effectively',
					'Effectively',
					'Moderately effectively',
					'Slightly effectively',
					'Not effectively',
				]);
  });
});

describe('optionsRatingRadio', () => {
  it('Should get a placeholder for the rating radio', async () => {
    expect(optionsCheckBox(15, 'fbo_workshop_survey')).toStrictEqual([
					'Number of Ramp Services Performed',
					'Lav’s',
					'GPU’s',
					'Potable Water',
					'Belt Loader',
					'Call Out’s',
					'Transient Hangar Service',
					'Number of Aircraft Fueled (NSJ Ramp)',
					'Number of aircraft serviced (NSJ Ramp)',
					'Number of GSE Fuelings Performed',
					'Number of NSJ Gallons Pumped',
					'Number of Airline Gallons Pumped',
					'Number of Airlines Serviced',
					'Number of Accepted Fuel Loads',
					'Number of Gallons Delivered',
					'Number of Fueler Top-Offs Completed',
					'Number of Aircraft De-Iced',
					'Total Gallons Pumped (All Operations)',
				]);
  });
});

		const questions: SurveyQuestion[] = surveys['customer_experience'].questions;

describe('hasPlaceholder', () => {
	it('is a type gaurd to check if a given component should have a placeholder', async ()=> {
		expect(hasPlaceholder(questions[1])).toBe(true)
	})
})

describe('hasOptionsDropdownSelect', () => {
	it('is a type gaurd to check if a given component should have a dropdown select', async ()=> {
		expect(hasOptionsDropdownSelect(questions[3])).toBe(true)
	})
})

describe('hasOptionsRatingRadio', () => {
	it('is a type gaurd to check if a given component should have a rating radio select', async ()=> {
		expect(hasOptionsRatingRadio(questions[3])).toBe(false)
	})
})

describe('hasOptionsCheckBox', () => {
	it('is a type gaurd to check if a given component should have a rating radio select', async ()=> {
		expect(hasOptionsCheckBox(questions[3])).toBe(false)
	})
})

		const questions_fbo_workshop_survey: SurveyQuestion[] = surveys['fbo_workshop_survey'].questions;


describe('hasOptionsCheckBox', () => {
	it('is a type gaurd to check if a given component should have a rating radio select', async ()=> {
		expect(hasOptionsCheckBox(questions_fbo_workshop_survey[15])).toBe(true)
	})
})