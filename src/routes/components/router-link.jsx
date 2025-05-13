'use client';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

const RouterLink = forwardRef(({ href, ...other }, ref) => (
  <Link ref={ref} href={href} {...other} />
));

RouterLink.propTypes = {
  href: PropTypes.string.isRequired,
};

export default RouterLink;
