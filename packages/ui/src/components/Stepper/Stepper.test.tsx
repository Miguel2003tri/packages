import { render } from '@redwoodjs/testing/web'

import Stepper from './Stepper'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Stepper', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <Stepper
          steps={['Selecciona el plan', 'Realiza el pago', 'Finalizar']}
          current={0}
        />
      )
    }).not.toThrow()
  })
})
