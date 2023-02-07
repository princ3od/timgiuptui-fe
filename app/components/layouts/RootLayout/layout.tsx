import { Container, ContainerProps } from '@chakra-ui/react';

interface Props extends ContainerProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <h1>Header</h1>
      <Container as="main" maxW="7xl" flex="1" pt="20" pb="10" {...props}>
        {children}
      </Container>
      <h1>Footer</h1>
    </>
  );
};

export default DefaultLayout;
