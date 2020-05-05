import React from "react";
import { Box, Typography } from "@material-ui/core";

const About = () => {
  return (
    <Box pt={10} pb={6}>
      <div>
        <Typography variant="h4" color="primary">
          What is P.D.R.S?
        </Typography>

        <Typography variant="h6" color="textSecondary">
          Prescriptions Dispensing Regulating System is a system that helps
          doctors to:
          <br />
          - Get a better Diagnose <br />
          - Easliy Avoid medical contradactions <br />
          - Checking whether the patient took his medicins <br />
          - Avoiding multi dispensing the same prescription <br />
          - Dispense prescriptions quickly from anywhere <br />
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="primary">
          How to get an account
        </Typography>

        <Typography variant="h6" color="textSecondary">
          If you are a doctor or a pharmacian all you gotta do to get an account
          is to use the form below to send us a message and we will contact you
          shortly and give you a username & a password and you are set to go
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="primary">
          How To Create a new Prescription (Doctor)
        </Typography>

        <Typography variant="h6" color="textSecondary">
          - Go to 'New Prescription' page <br />
          - Enter the patient Id <br />
          - if he already exist, his name will appear, otherwise a name input
          field will appear
          <br />
          - choose a classification <br />
          - descripe the patient state briefly so that you and other doctors
          later get an idea about import PropTypes from 'pro <br />
          -types' <br />
          - choose the medicins from the search list to be added to the
          prescription <br />
          - you can mark a medicine 'bold' or 'chronic' ('bold' means that it
          stand out more in the prescriptions page ) <br />- Click 'Submit' !!
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="primary">
          How To Check a patient prescriptions (Doctor)
        </Typography>

        <Typography variant="h6" color="textSecondary">
          - Go to 'Patient Prescriptions' page <br />
          - Enter the patient Id
          <br />
          - All the patient prescriptions will appear from newer to older with
          their date, classification, state note and medicins <br />- You can
          choose one of the classifications to see only prescriptions for it
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="primary">
          How To Check a patient prescriptions (Doctor)
        </Typography>

        <Typography variant="h6" color="textSecondary">
          - Go to 'Patient Prescriptions' page <br />
          - Enter the patient Id <br />
          - All the patient prescriptions will appear from newer to older with
          their date, classification, state note and medicins <br />- You can
          choose one of the classifications to see only prescriptions for it
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="primary">
          How To Dispense A prescription (Pharmacian)
        </Typography>

        <Typography variant="h6" color="textSecondary">
          - Go to 'Patient Prescriptions' page <br />
          - Enter the patient Id <br />
          - All the patient prescriptions with un-dispensed medicins will appear
          from newer to older
          <br />- check the medicins that you want to dispense the click the
          'Dispense' button
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="primary">
          How To Contact Us (Doctor or Pharmacian)
        </Typography>

        <Typography variant="h6" color="textSecondary">
          - Go to 'Technical Support' page <br />
          - Choose your message categorey <br />
          - Enter your message <br />
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="primary">
          Technical Info ( For Developers )
        </Typography>

        <Typography variant="h6" color="textSecondary">
          The System is build using multiple technoligies ant frameworks on the
          front-end & the back-end <br />
        </Typography>
        <Typography variant="h5" className="mt-3" color="primary">
          Front End
        </Typography>
        <Typography variant="h6" color="textSecondary">
          The Client App has been build using: <br />
          - "React" Framework and Material UI <br />
          - MobX for state management <br />
          - Google ReCaptcha for Anti-Bots <br />
          - Has multiple langauges (Arabic & English) <br />
          The Admin Panel is used for checking new accounts requests, messages,
          managing users, managing medicins, seeing reports & statistics about
          the system and the usage data <br />
        </Typography>
        <Typography variant="h5" className="mt-3" color="primary">
          Back End
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Uses NodeJs & Express Framework to create a server <br />
          - Clean Project Architecture (DDD) <br />
          - Uses JWT AccessTokens for Role-Based Authentication + Refresh Tokens
          for revoking access and improving security <br />
          - Centeral Error Handling <br />
          - Has Unit Testing <br />
          - A DB Seeding Script for automated random data <br />
          - A caching service to improve data access layer speed and reduces DB
          requests number
          <br />
        </Typography>
      </div>
    </Box>
  );
};

export default About;
