/** @jsx jsx */
import { rgba } from "polished";
import Image from "components/image";
import { jsx, Box, Heading, Text } from "theme-ui";

const Feature = ({ data: feature, type }) => {
  return (
    <Box key={feature.id} sx={styles.featureItem}>
      {feature.icon && (
        <Image loading="lazy" src={feature.icon} alt={feature.title} />
      )}
      <Heading as="h3">{feature.title}</Heading>
      <Text style={{ fontWeight: "bold", marginLeft: "10px",textAlign : 'center' }} as={feature.type || type || "p"}>
        {feature.description}
      </Text>
    </Box>
  );
};

export default Feature;

const styles = {
  featureItem: {
    textAlign: ["center", null, null, null, "left"],
    h3: {
      lineHeight: 2.5,
      fontWeight: 500,
      letterSpacing: "heading",
      fontSize: [18, null, null, null, null, 20],
    },
    p: {
      color: rgba("#343D48", 0.75),
      fontSize: [null, null, null, null, 14, 15],
      lineHeight: 1.47,
    },
    "@media only screen and (min-width: 320px) and (max-width: 420px) and (max-height: 760px)": {
      h3: { 
           fontSize : '15px'
      },
      p: {
           fontSize : '13px'
      }
    },
  },
};
