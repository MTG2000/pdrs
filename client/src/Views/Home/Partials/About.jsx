import React from "react";
import { Box, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");

  return (
    <Box pt={22} pb={6}>
      <div>
        <Typography variant="h4" color="primary">
          {t("what is pdrs")}
        </Typography>

        <Typography variant="h6" color="textSecondary">
          {t("pdrs is a system")} <br />
          {t("pdrs helps docs")}
          <br />- {t("1-1")} <br />- {t("1-2")} <br />- {t("1-3")} <br />-{" "}
          {t("1-4")} <br />- {t("1-5")} <br />
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="primary">
          {t("how get account")}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {t("2-1")}
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="primary">
          {t("how create prescription")}
        </Typography>

        <Typography variant="h6" color="textSecondary">
          - {t("3-1")} <br />- {t("3-2")} <br />- {t("3-3")} <br />- {t("3-4")}{" "}
          <br />- {t("3-5")} <br />- {t("3-6")} <br />- {t("3-7")} <br />-{" "}
          {t("3-8")} <br />- {t("3-9")}
        </Typography>
      </div>

      <div className="mt-5">
        <Typography variant="h4" color="primary">
          {t("how check prescription")}
        </Typography>

        <Typography variant="h6" color="textSecondary">
          - {t("4-1")} <br />- {t("4-2")} <br />- {t("4-3")} <br />- {t("4-4")}
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="primary">
          {t("how dispense prescription")}
        </Typography>

        <Typography variant="h6" color="textSecondary">
          - {t("5-1")} <br />- {t("5-2")} <br />- {t("5-3")} <br />- {t("5-4")}
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="primary">
          {t("how to contact")}
        </Typography>

        <Typography variant="h6" color="textSecondary">
          - {t("6-1")} <br />- {t("6-2")} <br />- {t("6-3")} <br />
        </Typography>
      </div>
      <div className="mt-5">
        <Typography variant="h4" color="primary">
          {t("tech info")}
        </Typography>

        <Typography variant="h6" color="textSecondary">
          {t("system built using")} <br />
        </Typography>
        <Typography variant="h5" className="mt-3" color="primary">
          {t("front end")}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {t("client app built")} <br />-{" "}
          <span className="font-weight-bold">React Js</span> Front-End Framework
          <br />- <span className="font-weight-bold">Material UI</span>&
          <span className="font-weight-bold">Bootstrap</span>
          <br />- <span className="font-weight-bold">MobX</span> for State
          Management <br />
          - "Google ReCaptcha" for Anti-Bots <br />- Multiple langauges (Arabic
          & English) using <span className="font-weight-bold">
            i18next
          </span>{" "}
          <br />
          The Admin Panel can be used for checking new accounts requests,
          messages, managing users, managing (medicins, classifications,
          conditions), seeing reports & statistics about the system and the
          usage data <br />
        </Typography>
        <Typography variant="h5" className="mt-3" color="primary">
          Back End
        </Typography>
        <Typography variant="h6" color="textSecondary">
          - Uses <span className="font-weight-bold">Node Js</span> &{" "}
          <span className="font-weight-bold">Express Js</span> Web Framework{" "}
          <br />- <span className="font-weight-bold">Domain Driven Design</span>{" "}
          (DDD) architecture
          <br />- <span className="font-weight-bold">JWT</span> for Role-Based
          Authentication + Refresh Tokens for revoking access and improving
          security <br />- <span className="font-weight-bold">Sqlite</span>{" "}
          DataBase (No ORM library has been used because it is a university
          project)
          <br />
          - Centeral Error Handling <br />- Basic Unit Testing using{" "}
          <span className="font-weight-bold">Jest</span> &{" "}
          <span className="font-weight-bold">Chai</span>
          <br />
          - A DB Seeding Script for automated random data for all tables <br />-{" "}
          <span className="font-weight-bold">node-cache</span> A caching service
          to improve data access layer speed and reduces DB requests number
          <br />
        </Typography>
      </div>
    </Box>
  );
};

export default About;
