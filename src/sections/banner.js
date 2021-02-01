/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, Box, Container, Heading, Text, Button, Link } from "theme-ui";
import { rgba } from "polished";
import Input from "components/input";
import bannerBg from "assets/images/banner-bg.png";
import Modal from "../components/home/cityModal";
import { useRouter } from "next/router";
import CALC_VARIABLES from "../../app.config";
import Feature from "components/cards/feature";

export default function Banner(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting...");
  };

  const [open, setOpen] = useState(false);
  const [bill, setBill] = useState(0);
  const [city, setCity] = useState({ id: -1, city: "Vadodara" });

  const [cardInfo, setCardInfo] = useState({
    monthlySaving: 0,
    suggestedSystem: 0,
    emiStarts: 0,
  });

  const onChangeHandler = (e) => {
    setBill(e.target.value);
    if (props.setBillAmount) {
      props.setBillAmount(e.target.value);
    }
  };
  useEffect(() => {
    // --- CALCULATION ---
    const suggestedSystemSize = bill / (720 * 2);

    const meterCharge =
      suggestedSystemSize > 6000
        ? city.city.toLowerCase() === "torrentahmedabad" ||
          city.city.toLowerCase() === "torrentsurat"
          ? 16835.74
          : 15166.51
        : city.city.toLowerCase() === "torrentahmedabad" ||
          city.city.toLowerCase() === "torrentsurat"
        ? 5396.86
        : 4045.08;

    const { SYSTEM_COST, SUBSIDY, STRUCTURE_COST } = CALC_VARIABLES;
    const netCost = SYSTEM_COST - SUBSIDY + STRUCTURE_COST + meterCharge;
    const downPayment = netCost * 0.3;

    setCardInfo({
      monthlySaving: (suggestedSystemSize * 720).toFixed(2),
      suggestedSystem: suggestedSystemSize.toFixed(2),
      emiStarts: (((netCost - downPayment) * 1.18) / 18).toFixed(2),
    });
  }, [bill]);

  const router = useRouter();
  const BookNowHandler = () => {
    router.push("/#verification");
  };

  return (
    <Box as="section" id="home" sx={styles.section}>
      <Container>
        <Box sx={styles.contentWrapper}>
          <Modal
            city={city}
            modalHandler={(stat) => setOpen(stat)}
            open={open}
            selectCity={(city) => setCity(city)}
          />
          <Box sx={styles.bannerContent}>
            <Heading as="h1" sx={styles.heroTitle}>
              Concerned About your Electicity Bill?
            </Heading>
            <Box as="form" onSubmit={handleSubmit}>
              <Input
                onChange={onChangeHandler}
                value={bill}
                type="number"
                id="billAmount"
                placeholder="Enter Your Bill Amount"
              />
              <Box sx={styles.cityWrapper}>
                <Text as="h2" sx={styles.city}>
                  {" "}
                  {city.city || "Select City"} - &nbsp;{" "}
                </Text>
              </Box>
              <Box sx={styles.cityWrapper}>
                <Text as="h4" sx={styles.city}>
                  <Link
                    color="primary"
                    aria-setsize="small"
                    styles={{ display: "block" }}
                    onClick={() => setOpen(!open)}
                    href="#"
                  >
                    Change Location
                  </Link>
                </Text>
              </Box>
              <Box sx={styles.featureWrapper}>
                <Feature
                  data={{
                    title: "Suggested System",
                    type: "h2",
                    description: cardInfo.suggestedSystem + " KWP",
                  }}
                />
                <Feature
                  data={{
                    title: "Monthly Savings",
                    type: "h2",
                    description:
                      String.fromCharCode("0x20b9") +
                      " " +
                      cardInfo.monthlySaving,
                  }}
                />
                <Feature
                  data={{
                    title: "EMI Starting at",
                    type: "h2",
                    description:
                      String.fromCharCode("0x20b9") + " " + cardInfo.emiStarts,
                  }}
                />
              </Box>
              <Button
                type="submit"
                onClick={BookNowHandler}
                sx={styles.button}
                variant="primary"
              >
                Go Solar!
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

const styles = {
  section: {
    background: `url(${bannerBg}) no-repeat center top / cover ,linear-gradient(180deg, rgba(255, 255, 255, 0) 12.92%, #0057FF 34.86%, #0057FF 53.44%, #0157FF 84.3%)`,
    backgroundSize: ["100%", null, null, null, "cover"],
  },

  contentWrapper: {
    display: "flex",
    alignItems: "center",
    minHeight: [null, null, null, null, "100vh", "100vh"],
    paddingBottom: "50px",
    textAlign: "center",
  },
  featureWrapper: {
    gap: ["40px 20px", null, null, null, "30px"],
    display: "grid",
    padding: "10px",
    gridTemplateColumns: [
      "repeat(2,1fr)",
      null,
      null,
      "repeat(3,180px)",
      "repeat(3,1fr)",
    ],
    justifyContent: ["unset", null, null, "center", "flex-start"],
  },
  cityWrapper: {
    padding: "10px",
    display: "flex !important",
    justifyContent: "center",
    "@media only screen and (min-width: 320px) and (max-width: 420px) and (max-height: 760px)": {
      h2: {
        fontSize: "16px",
      },
    },
  },
  changeCity: {
    color: (theme) => theme.colors.text,
  },
  bannerContent: {
    backgroundColor: rgba("#fff", 0.93),
    boxShadow: [
      "0px 10px 16px rgba(52, 61, 72, 0.12)",
      null,
      null,
      null,
      "none",
    ],
    maxWidth: "80%",
    padding: [
      "20px",
      "30px",
      null,
      null,
      null,
      "30px 50px 60px",
      "50px 60px 90px",
    ],
    borderRadius: 5,
    m: ["110px 0 0", null, null, "110px auto 0", "0px 0 0", null, 0],
    margin: "0 auto",
    "@media only screen and (min-height: 720px) and (max-height: 760px), (min-width: 1501px) and (max-width: 1560px) ": {
      maxWidth: "80%",
      mt: 70,
      padding: "30px 50px 65px",
      margin: "0 auto",
      marginTop: "0% !important",
    },
    "@media only screen and (min-width: 320px) and (max-width: 420px) and (max-height: 760px)": {
      maxWidth: "100%",
      marginTop: "30% !important",
    },
  },
  heroTitle: {
    fontSize: [22, 28, 28, 40, , 5, 6],
    fontWeight: 700,
    padding: "10px",
    letterSpacing: "heading",
    lineHeight: [1.4, null, null, null, null, null, 1.57],
    "@media only screen and (min-height: 720px) and (max-height: 760px), (min-width: 1501px) and (max-width: 1560px) ": {
      fontSize: 40,
    },
    city: {
      fontSize: [25, 25, 32, 40, , 5, 6],
      fontWeight: 700,
    },
  },
  desc: {
    fontSize: [15, 16, 15, 17],
    lineHeight: [1.53, 1.53, 1.53, 2, 2.4, 2, 2.48],
    maxWidth: 440,
    marginTop: [15, 15, 15, null, null, null, 30],
    "@media only screen and (min-height: 720px) and (max-height: 760px), (min-width: 1501px) and (max-width: 1560px) ": {
      mt: 15,
    },
  },
  select: {
    marginTop: 30,
    select: {
      minWidth: ["auto", "auto", "initial"],
    },
  },
  input: {
    border: "2px solid ",
  },
  button: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 20,
    width: "100%",
    minHeight: [50, null, null, null, 60],
    fontSize: [16, 16, 16, 20],
    ":focus": {
      outline: "0 none",
    },
  },
};
