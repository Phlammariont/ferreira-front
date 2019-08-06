import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import Typography from '@material-ui/core/Typography'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import {propEq} from 'ramda'
import {Paper} from '@material-ui/core'

const isStepOptional = () => false
const isStepSkipped = () => false
const isStepComplete = propEq('complete', true)

const FerreiraStepper = ({activeStep, steps, handleStep}) => (
  <Paper>
    <Stepper alternativeLabel nonLinear activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const buttonProps = {};
        if (isStepOptional(index)) {
          buttonProps.optional = <Typography variant="caption">Optional</Typography>;
        }
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }
        return (
          <Step key={label} {...stepProps}>
            <StepButton
              onClick={() => handleStep(index)}
              completed={isStepComplete(label)}
              {...buttonProps}
            >
              {label.title}
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  </Paper>
)

export default FerreiraStepper