/* eslint-disable import/extensions */
import './commands';
import '../env-config';
// import '../../public/env-config';

/// <reference types="cypress" />

// styles
import 'react-loading-skeleton/dist/skeleton.css';

import '../../src/styles/index.scss';

// commands
import { mount } from 'cypress/react';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount);
