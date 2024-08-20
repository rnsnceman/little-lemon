import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Image, useDisclosure, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import BookingForm from "./BookingForm";
import { useProps } from "../Context";
import NavMenu from "./NavMenu";

const Nav = () => {
    const menuModal = useDisclosure();
    const bookingformModal = useDisclosure();
    const { mobile } = useProps();

    const headerRef = useRef(null);
    useEffect(() => {
        let prevScrollPos = window.scrollY;

        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const headerElement = headerRef.current;
            if (!headerElement) {
                return;
            }
            if (prevScrollPos > currentScrollPos) {
                headerElement.style.transform = "translateY(0)";
            } else {
                headerElement.style.transform = "translateY(-200px)";
            }
            prevScrollPos = currentScrollPos;
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header>
            <Box
                zIndex={99}
                position="sticky"
                top={0}
                left={0}
                right={0}
                translateY={0}
                transitionProperty={'transform'}
                transitionDuration={'.3s'}
                transitionTimingFunction={'ease-in-out'}
                bg={'#edefee'}
                ref={headerRef}
                role="banner"
            >
                <Box color="#333333" maxWidth="1280px" margin="0 auto">
                    <HStack
                        px={8}
                        py={4}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <nav aria-label="Main Navigation">
                            {
                                mobile ?
                                    <>
                                        <HamburgerIcon
                                            cursor={"pointer"}
                                            fontSize={"x-large"}
                                            onClick={menuModal.onOpen}
                                            aria-label="Open Navigation Menu"
                                            aria-controls="navigation-menu"
                                        />
                                        <Drawer
                                            placement={"left"}
                                            onClose={menuModal.onClose}
                                            isOpen={menuModal.isOpen}
                                            zIndex={1000}
                                            id="navigation-menu"
                                        >
                                            <DrawerOverlay />
                                            <DrawerContent>
                                                <DrawerHeader borderBottomWidth='1px'>Navigation</DrawerHeader>
                                                <DrawerBody>
                                                    <VStack alignItems={"flex-start"}>
                                                        <NavMenu onOpen={bookingformModal.onOpen} />
                                                    </VStack>
                                                </DrawerBody>
                                            </DrawerContent>
                                        </Drawer>
                                    </>
                                    :
                                    <HStack spacing={8} fontSize={'lg'}>
                                        <NavMenu onOpen={bookingformModal.onOpen} />
                                    </HStack>
                            }
                        </nav>
                        <nav aria-label="Home">
                            <HStack>
                                <Image
                                    src='assets/logo.png'
                                    alt={'logo'}
                                    width={'200'}
                                    height={'55'}
                                />
                            </HStack>
                        </nav>
                    </HStack>
                </Box>
            </Box>
            <BookingForm isOpen={bookingformModal.isOpen} onClose={bookingformModal.onClose} />
        </header>
    );
}

export default Nav;
