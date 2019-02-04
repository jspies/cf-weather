import Link from 'next/link';
import Head from 'next/head';
import { StyleProvider } from '@cloudflare/style-nextjs';
import { Header, NavList, NavItem } from '@cloudflare/component-header';
import { Heading } from '@cloudflare/component-heading';
import { createComponent } from '@cloudflare/style-container';
import PropTypes from 'prop-types';

const Page = createComponent(({ theme }) => ({
  margin: theme.space[4]
}));

const Center = createComponent(({ theme }) => ({
  margin: '0px auto'
}));

const ForecastLayout = ({ children }) => (
  <StyleProvider>
    <div>
      <Page>
        {children}
      </Page>
    </div>
  </StyleProvider>
);

ForecastLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ForecastLayout;
