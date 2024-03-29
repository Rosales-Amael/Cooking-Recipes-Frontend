import {
  Box,
  Flex,
  Button,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Image,
  IconButton,
  Center,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import Badge from 'react-bootstrap/Badge';
import Carousel from 'react-bootstrap/Carousel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Rating from '@mui/material/Rating';
import './MyRecipes.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FavoriteBorder } from '@mui/icons-material';

function MyRecipes() {
  const toast = useToast();
  const [isRecipeLiked, setRecipeLiked] = useState(false);
  return (
    <>
      <h2>
        <AccordionButton bg="telegram">
          <Box as="span" flex="1" textAlign="left">
            Mes recettes
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Flex justifyContent="center" mt={12}>
          <Box borderRadius="md" bg="gray.100" w="100%">
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              id="grid_cards"
            >
              <Card className="card">
                <CardHeader>
                  <Heading size="md">
                    <Center>Pancakes</Center>
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Flex className="tags_container">
                    <Badge bg="primary" className="tags">
                      <AccessTimeIcon className="tag_icons" />
                      10 - 15min
                    </Badge>
                    <Badge bg="primary" className="tags">
                      <MenuBookIcon className="tag_icons" />
                      Facile
                    </Badge>
                    <Badge bg="primary" className="tags">
                      <RestaurantIcon className="tag_icons" />
                      Dessert
                    </Badge>
                    <Badge bg="primary" className="tags">
                      <PeopleAltIcon className="tag_icons" />4 Pers.
                    </Badge>
                  </Flex>
                  <Carousel>
                    <Carousel.Item>
                      <Image
                        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                        alt="Green double couch with wooden legs"
                        borderRadius="lg"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <Image
                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        alt="Green double couch with wooden legs"
                        borderRadius="lg"
                      />
                    </Carousel.Item>
                  </Carousel>
                </CardBody>
                <CardFooter className="card_footer">
                  <IconButton
                    // eslint-disable-next-line react/jsx-boolean-value
                    isRound={true}
                    onClick={() => {
                      setRecipeLiked(!isRecipeLiked);
                      if (isRecipeLiked) {
                        toast.closeAll();
                      }
                      if (!isRecipeLiked) {
                        toast({
                          title: 'Recette enregistrée',
                          description: 'Miam !!!',
                          status: 'success',
                          variant: 'subtle',
                          containerStyle: {
                            marginTop: '130px',
                          },
                          duration: 5000,
                          isClosable: true,
                        });
                      }
                    }}
                    icon={
                      isRecipeLiked ? (
                        <FavoriteIcon id="favorite_icon" />
                      ) : (
                        <FavoriteBorder id="favorite_icon" />
                      )
                    }
                  />
                  <Link to="/details-recette/1">
                    <Button>Voir la recette</Button>
                  </Link>
                </CardFooter>
              </Card>
            </SimpleGrid>
          </Box>
        </Flex>
      </AccordionPanel>
    </>
  );
}

export default MyRecipes;
