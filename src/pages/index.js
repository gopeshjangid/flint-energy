import React, { useState } from "react";
import { ThemeProvider } from "theme-ui";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import Banner from "sections/banner";
import FeaturedSpace from "sections/featured-space";
import OurCustomer from "sections/our-customer";
import Gallery from "sections/gallery";
import ContactForm from "sections/ContactForm";
import Blog from "sections/blog";
import Subscription from "sections/subscription";

export default function IndexPage() {
  const [bill, setBill] = useState(3500);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO title="FlinTech" />
        <Banner setBillAmount={setBill} />
        <ContactForm bill={bill} />
        <Blog />
      </Layout>
    </ThemeProvider>
  );
}
