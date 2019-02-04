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

const Layout = ({ children, title = 'My Favorite Cities' }) => (
  <StyleProvider>
    <div>
      <Page>
        <Heading size={1}>{title}</Heading>
        {children}
      </Page>
    </div>
  </StyleProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Layout;
