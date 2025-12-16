import React from 'react';
import  AuthLayout  from '@common/ui/layouts/auth-layout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
