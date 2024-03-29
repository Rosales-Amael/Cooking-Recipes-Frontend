/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Flex,
  Avatar,
  IconButton,
  Accordion,
  AccordionItem,
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
  Center,
  Image,
  Container,
  Divider,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from '@chakra-ui/react';
import Badge from 'react-bootstrap/Badge';
import { Rating } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import Carousel from 'react-bootstrap/Carousel';
import ListGroup from 'react-bootstrap/ListGroup';

import './RecipeDetails.scss';
import { useRef, useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

function RecipeDetails() {
  const toast = useToast();
  const cancelRef = useRef();
  const {
    isOpen: isRatingModalOpen,
    onOpen: onRatingModalOpen,
    onClose: onRatingModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const [isRecipeBelongToUser, setRecipeBelongToUser] = useState(true);
  const [isRecipeLiked, setRecipeLiked] = useState(false);

  return (
    <Flex className="main_container">
      <Box
        className="main_box"
        id="recipe_details_box"
        boxShadow="xl"
        borderRadius="md"
        bg="gray.100"
        py={10}
        px={3}
      >
        <Text fontSize="4xl" mb={4}>
          <Center>Pancakes</Center>
        </Text>

        {/* CAROUSEL */}
        <Container maxW="2xl">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            pr={5}
            position="relative"
          >
            <IconButton
              onClick={() => {
                setRecipeLiked(!isRecipeLiked);
                if (isRecipeLiked) {
                  toast.closeAll();
                }
                if (!isRecipeLiked) {
                  toast({
                    title: 'Recette enregistrée',
                    description: 'Rendez-vous sur votre profil !',
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
              // eslint-disable-next-line react/jsx-boolean-value
              isRound={true}
              icon={
                isRecipeLiked ? (
                  <FavoriteIcon id="recipe_details_favorite_icon" />
                ) : (
                  <FavoriteBorderIcon id="recipe_details_favorite_icon" />
                )
              }
            />
            <Rating size="medium" defaultValue={4} readOnly />
            <Text id="number_ratings">(4)</Text>
          </Flex>
          <Carousel>
            <Carousel.Item>
              <Image
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
            </Carousel.Item>
          </Carousel>
          <section className="tags_container">
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
          </section>
          <Flex alignItems="center">
            <LocalDiningIcon className="recipe_icons_section" />
            <Text fontSize="2xl" mr={2}>
              Ingrédients
            </Text>
            <Divider mt={6} />
          </Flex>
          <ListGroup className="list">
            <ListGroup.Item>Farines 500 g</ListGroup.Item>
            <ListGroup.Item>Lait 1 L</ListGroup.Item>
            <ListGroup.Item>Oeufs 4 Unitées</ListGroup.Item>
          </ListGroup>

          <Flex alignItems="center">
            <FormatListNumberedIcon className="recipe_icons_section" />
            <Text fontSize="2xl" mr={2}>
              Etapes
            </Text>
            <Divider mt={6} />
          </Flex>
          <ListGroup as="ol" numbered className="list">
            <ListGroup.Item as="li">
              Mélanger la farine et le lait
            </ListGroup.Item>
            <ListGroup.Item as="li">Rajoutez les oeufs</ListGroup.Item>
            <ListGroup.Item as="li">Laissez reposez la pate</ListGroup.Item>
            <ListGroup.Item as="li">Faire cuire les pancakes</ListGroup.Item>
          </ListGroup>

          <Flex alignItems="center">
            <MicrowaveIcon className="recipe_icons_section" />
            <Text fontSize="2xl" mr={2}>
              Ustenciles
            </Text>
            <Divider mt={6} />
          </Flex>
          <ListGroup as="ul" className="list">
            <ListGroup.Item as="li">Fouet</ListGroup.Item>
            <ListGroup.Item as="li">Four</ListGroup.Item>
            <ListGroup.Item as="li">Bol</ListGroup.Item>
            <ListGroup.Item as="li">Poelle</ListGroup.Item>
          </ListGroup>
          <Flex mt={2} alignItems="center" justifyContent="space-between">
            {isRecipeBelongToUser ? (
              <>
                <div>
                  <Flex alignItems="center">
                    <IconButton
                      colorScheme="red"
                      className="delete_button"
                      size="sm"
                      onClick={onDeleteModalOpen}
                      icon={<DeleteIcon />}
                    />
                  </Flex>
                </div>

                <Link to="/modifier/pancakes/2">
                  <Button colorScheme="teal" onClick={onRatingModalOpen}>
                    Modifier la recette
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div>
                  <Flex alignItems="center">
                    <Avatar src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" />
                    <Text fontWeight="bold" ml={3}>
                      Stupid guy
                    </Text>
                  </Flex>
                </div>

                <Button colorScheme="teal" onClick={onRatingModalOpen}>
                  Noter la recette
                </Button>
              </>
            )}

            {/* RATING MODAL */}
            <Modal
              isOpen={isRatingModalOpen}
              onClose={onRatingModalClose}
              id="modals"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Noter la recette : Pancakes</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Rating name="simple-controlled" />
                </ModalBody>

                <ModalFooter>
                  <Button variant="ghost" mr={2} onClick={onRatingModalClose}>
                    Annuler
                  </Button>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={onRatingModalClose}
                  >
                    Noter
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* DELETE ALERT */}
            <AlertDialog
              isOpen={isDeleteModalOpen}
              leastDestructiveRef={cancelRef}
              onClose={onDeleteModalClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Supprimer la recette
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Vous allez supprimer la recette. Êtes-vous sur de vouloir
                    continuer ?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button onClick={onDeleteModalClose}>Annuler</Button>
                    <Button
                      colorScheme="red"
                      onClick={onDeleteModalClose}
                      ml={3}
                    >
                      Supprimer
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Flex>
        </Container>
      </Box>
    </Flex>
  );
}

export default RecipeDetails;
