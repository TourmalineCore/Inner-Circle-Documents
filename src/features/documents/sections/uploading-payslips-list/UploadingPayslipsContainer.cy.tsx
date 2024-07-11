import { PayslipsState } from '../state/PayslipsState';
import { PayslipsStateContext } from '../state/PayslipsStateContext';
import { UploadingPayslipsContainer } from './UploadingPayslipsContainer';

describe('UploadingPayslipsContainer', () => {
  beforeEach(() => {
    const EMPLOYEES_RESPONSE = {
      employees: [
        {
          lastName: 'Ivanov',
        },
        {
          lastName: 'Petrov',
        },
      ],
    };

    cy.intercept(
      'GET',
      '**/getEmployees',
      EMPLOYEES_RESPONSE,
    )
      .as('get-employees');
  });

  describe('Error', errorTests);

  describe('E2E', e2eTests);
});

function e2eTests() {
  it(`
  GIVEN upload payslips
  WHEN upload new payslips
  THEN call request to get employees and trigger validation
  AND render no errors
  `, () => {
    mountComponent();

    cy
      .intercept(
        'POST',
        '**/sendMailingPayslips',
        {},
      )
      .as('sendPayslips');

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Payslip for Ivanov for November 2023.pdf',
        'cypress/fixtures/Petrov payslip NON_EXISTING_TEXT for March 2024.pdf',
      ], {
        force: true,
      });

    cy
      .wait('@get-employees');

    cy
      .getByData('uploaded-payslip-card-error')
      .should('not.exist');

    cy
      .getByData('uploading-payslips-content-button')
      .click();

    cy
      .wait('@sendPayslips');

    cy
      .getByData('uploading-payslips-content-list')
      .should('not.exist');
  });
}

function errorTests() {
  it(`
  GIVEN error message
  WHEN call request to send payslips
  THEN render toasify with error message
  `, () => {
    mountComponent();

    cy
      .intercept(
        'POST',
        '**/sendMailingPayslips',
        {
          forceNetworkError: true,
        },
      )
      .as('sendPayslips');

    cy
      .get('input[type=file]')
      .selectFile([
        'cypress/fixtures/Payslip for Ivanov for November 2023.pdf',
      ], {
        force: true,
      });

    cy
      .getByData('uploading-payslips-content-button')
      .click();

    cy
      .wait('@sendPayslips');

    cy
      .get('.Toastify__toast')
      .should('exist');

    cy
      .contains('Network Error')
      .should('exist');
  });
}

function mountComponent() {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const payslipsState = new PayslipsState();

  cy.mount(
    <PayslipsStateContext.Provider value={payslipsState}>
      <UploadingPayslipsContainer />
    </PayslipsStateContext.Provider>,
  );
}
