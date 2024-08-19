import { Button, Heading, HStack, VStack, Text, Spacer, Flex, Image, Box, useDisclosure } from "@chakra-ui/react";
import BookingForm from "./BookingForm";
import { useProps } from "../Context";

const Hero = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { mobile } = useProps();

    return (
        <Box
            bg={'#495e57'}
            role="banner"
            aria-labelledby="hero-heading"
        >
            <Flex
                maxWidth={1280}
                margin={"auto"}
                mt={0}
                spacing={8}
                py={16}
                p={0}
                flexDir={mobile ? 'column-reverse' : 'row'}
            >
                <HStack
                    p={8}
                    pb={16}
                    pt={mobile ? 0 : 16}
                    height={mobile ? null : 400}
                >
                    <VStack alignItems={'flex-start'} maxWidth={600}>
                        <Heading as="h1" color={'#f4ce14'} gap='4' id="hero-heading">Little Lemon</Heading>
                        <Spacer />
                        <Heading fontSize={'2xl'} color={'#edefee'}>Chicago</Heading>
                        <Spacer />
                        <Text fontSize={'lg'} color={'#edefee'}>
                            We are a family owned Mediterranean restaurant, located on Little Lemon St in Chicago, Illinois. We focus on traditional recipes served with a modern twist.
                        </Text>
                        <Spacer />
                        <Spacer />
                        <Spacer />
                        <Button
                            onClick={onOpen}
                            color={'#333333'}
                            size={'lg'}
                            bg={'#f4ce14'}
                            _hover={{ bg: 'yellow.500' }}
                            aria-label="Reserve a Table"
                        >
                            Reserve a Table
                        </Button>
                        <BookingForm isOpen={isOpen} onClose={onClose} />
                    </VStack>
                </HStack>
                <Spacer />
                <HStack
                    position={"relative"}
                    p={8}
                    ml={mobile ? null : 6}
                    pt={16}
                    pb={mobile ? 8 : 16}
                    spacing={16}
                    minWidth={mobile ? 'max-content' : 400}
                    alignItems={'center'}
                >
                    <Image
                        right={mobile ? null : 8}
                        top={"56px"}
                        position={mobile ? undefined : "absolute"}
                        src={'/restaurantfood.jpg'}
                        alt={'Little Lemon restaurant cuisine'}
                        objectFit={'cover'}
                        width={mobile ? "100%" : 400}
                        height={400}
                        rounded={'lg'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    />
                </HStack>
            </Flex>
        </Box>
    );
}

export default Hero;
