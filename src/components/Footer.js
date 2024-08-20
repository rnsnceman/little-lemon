import { Box, Container, SimpleGrid, Stack, Image, Text, Link, Flex, useDisclosure } from "@chakra-ui/react";
import BookingForm from "./BookingForm";
import { useProps } from "../Context";
import NavMenu from "./NavMenu";

const Footer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { mobile } = useProps();

    return (
        <footer>
            <Box
                backgroundColor="#495e57"
                color={"white"}
                p={6}
                alignItems={"center"}
                spacing={8}
                aria-labelledby="footer-heading"
                role="contentinfo"
            >
                <Container as={Stack} maxW={'6xl'} py={10}>
                    <SimpleGrid columns={mobile ? 2 : 4} spacingX='40px' spacingY='20px' spacing={8}>
                        <Stack spacing={6}>
                            <Box>
                                <Image
                                    src="footerlogo.png"
                                    alt="Little Lemon footer logo"
                                    objectFit="cover"
                                    w="136px"
                                    h="240px"
                                    gap="4"
                                />
                            </Box>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <Text fontWeight={'500'} fontSize={'2xl'} mb={2} id="footer-heading-company">Company</Text>
                            <NavMenu onOpen={onOpen} aria-labelledby="footer-heading-company" />
                        </Stack>
                        <Stack align={'flex-start'}>
                            <Text fontWeight={'500'} fontSize={'2xl'} mb={2} id="footer-heading-contact">Contact Us</Text>
                            <Text fontWeight={'semibold'}>Address:</Text>
                            <Text>123 Little Lemon Street,</Text>
                            <Text>Chicago, Illinois</Text>
                            <Text fontWeight={'semibold'}>Phone number:</Text>
                            <Text>(123) 456-7890</Text>
                            <Text fontWeight={'semibold'}>Email:</Text>
                            <Text>contact@littlelemon.com</Text>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <Text fontWeight={'500'} fontSize={'2xl'} mb={2} id="footer-heading-social">Social Media</Text>
                            <Link href={'https://www.facebook.com/'} aria-label="Facebook">Facebook</Link>
                            <Link href={'https://www.instagram.com/'} aria-label="Instagram">Instagram</Link>
                            <Link href={'https://www.linkedin.com/'} aria-label="LinkedIn">LinkedIn</Link>
                        </Stack>
                    </SimpleGrid>
                </Container>
            </Box>
            <Box backgroundColor="#edefee">
                <Flex
                    alignItems={'center'}
                    justifyContent={'center'}
                    maxWidth={'1024px'}
                    margin={'0 auto'}
                    px={'12'}
                    height={'16'}
                    aria-labelledby="footer-legal"
                >
                    <Text id="footer-legal">© 2024 Little Lemon. All rights reserved</Text>
                </Flex>
            </Box>
            <BookingForm isOpen={isOpen} onClose={onClose} />
        </footer>
    );
}

export default Footer;
