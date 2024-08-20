import { Box, Heading, VStack, Button, Spacer, Flex } from '@chakra-ui/react';
import SpecialsCard from './SpecialsCard';
import { useProps } from '../Context';
import { Link } from 'react-router-dom';

const menus = [
    {
        title: "Greek Salad",
        description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with garlic and rosemary croutons.",
        price: "$12.99",
        getImageSrc: "assets/greeksalad.jpg"
    },
    {
        title: "Bruschetta",
        description: "Our Bruschetta is made from grilled sourdough bread that has been smeared with garlic and seasoned with salt and olive oil.",
        price: "$5.99",
        getImageSrc: "assets/bruchetta.jpg"
    },
    {
        title: "Lemon Dessert",
        description: "This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
        price: "$5.00",
        getImageSrc:"assets/lemondessert.jpg"
    },
];

const Specials = () => {
    const { mobile } = useProps();
    return (
        <Box bg={'#edefee'}>
            <VStack
                maxWidth={1280}
                marginInline={'auto'}
                p={8}
                py={16}
                spacing={8}
                role="region"
                aria-labelledby="specials-heading"
            >
                <Box spacing={8} py={4} width={'100%'}>
                    <Flex gap={'2'}>
                        <Heading
                            as="h1"
                            color={'#495e57'}
                            id="specials-heading"
                        >
                            Specials
                        </Heading>
                        <Spacer />
                        <Button
                            color={'#333333'}
                            size={'lg'}
                            bg={'#f4ce14'}
                            _hover={{ bg: 'yellow.500' }}
                            aria-label="View online menu"
                        >
                            <Link to={'#'}>Online Menu</Link>
                        </Button>
                    </Flex>
                </Box>
                <Box
                    display="grid"
                    gridTemplateColumns={`repeat(${mobile ? "1" : "3"}, minmax(0px, 1fr))`}
                    gridGap={8}
                    role="list"
                >
                    {menus.map((menu) => (
                        <SpecialsCard
                            key={menu.title}
                            title={menu.title}
                            description={menu.description}
                            imageSrc={menu.getImageSrc}
                            price={menu.price}
                            role="listitem"
                        />
                    ))}
                </Box>
            </VStack>
        </Box>
    );
}

export default Specials;
