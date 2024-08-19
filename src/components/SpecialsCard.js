import { VStack, Image, Heading, Text, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SpecialsCard = ({title, description, imageSrc, price}) => {
    return (
        <>
            <VStack
                color={'black'}
                bg={'white'}
                cursor="pointer"
                rounded={'lg'}
                role="article"
                aria-labelledby={`specials-card-${title}`}
            >
                <Image
                    src={imageSrc}
                    alt={title}
                    rounded={'lg'}
                />
                <VStack height={'100%'} spacing={4} p={4} alignItems={'flex-start'} justifyContent={'space-between'}>
                    <HStack width={'100%'} justifyContent={'space-between'} alignItems={'center'} spacing={2}>
                        <Heading as="h3" size={'md'} id={`specials-card-${title}`}>
                            {title}
                        </Heading>
                        <Heading as="h3" size={'md'} color={'#ee9972'}>
                            {price}
                        </Heading>
                    </HStack>
                    <Text color={'#495e57'} fontSize={'lg'}>
                        {description}
                    </Text>
                    <HStack fontWeight={'bold'}>
                        <Link to="#" aria-label={`Order a delivery of ${title}`} spacing={2}>
                            Order a delivery
                        </Link>
                    </HStack>
                </VStack>
            </VStack>
        </>
    );
}

export default SpecialsCard;
