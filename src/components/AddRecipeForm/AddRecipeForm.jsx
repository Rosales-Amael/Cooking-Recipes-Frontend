/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Center,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import SelectComponent from '../SelectComponent/SelectComponent';
import './AddRecipeForm.scss';
import {
  changeCategory,
  changeDifficulty,
  changeDuration,
  changeTitle,
  deleteIngredient,
  deleteStep,
  deleteUtensil,
  saveIngredient,
  saveStep,
  saveUtensil,
} from '../../actions/addRecipe';
import {
  categoriesOptions,
  difficultyOptions,
  durationOptions,
  unitsOptions,
} from '../../utils/selectOptions';
import { userGetUser } from '../../actions/user';

function AddRecipeForm({ isFormIsEdit }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!user) {
      dispatch(userGetUser());
    }
  }, []);

  const titleValue = useSelector((state) => state.addRecipe.title);
  const categoryValue = useSelector((state) => state.addRecipe.category);
  const difficultyValue = useSelector((state) => state.addRecipe.category);
  const durationValue = useSelector((state) => state.addRecipe.category);

  const ingredientsList = useSelector(
    (state) => state.addRecipe.ingredientsList
  );
  const stepsList = useSelector((state) => state.addRecipe.stepsList);
  const utensilsList = useSelector((state) => state.addRecipe.utensilsList);

  const {
    isOpen: isIngredientModalOpen,
    onOpen: onIngredientModalOpen,
    onClose: onIngredientModalClose,
  } = useDisclosure();
  const {
    isOpen: isStepsModalOpen,
    onOpen: onStepsModalOpen,
    onClose: onStepsModalClose,
  } = useDisclosure();
  const {
    isOpen: isUtensilsModalOpen,
    onOpen: onUtensilsModalOpen,
    onClose: onUtensilsModalClose,
  } = useDisclosure();

  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [ingredientUnitValue, setIngredientUnitValue] = useState('');
  const [ingredientUnitText, setIngredientUnitText] = useState('');

  const [stepDescription, setStepDescription] = useState('');
  const [utensilName, setUtensilName] = useState('');

  const handleSubmitIngredient = (e) => {
    e.preventDefault();

    const countIngredients = ingredientsList.length;

    const newIngredient = {
      id: countIngredients + 1,
      name: ingredientName,
      quantity: ingredientQuantity,
      unitValue: ingredientUnitValue,
      unitText: ingredientUnitText,
    };
    dispatch(saveIngredient(newIngredient));
    setIngredientName('');
    setIngredientQuantity('');
    setIngredientUnitText('');
    onIngredientModalClose();
  };

  const handleSubmitStep = (e) => {
    e.preventDefault();

    const countSteps = stepsList.length;
    const newStep = {
      id: countSteps + 1,
      description: stepDescription,
    };
    dispatch(saveStep(newStep));
    setStepDescription('');
    onStepsModalClose();
  };

  const handleSubmitUtensil = (e) => {
    e.preventDefault();

    const countUtensils = utensilsList.length;
    const newUtensil = {
      id: countUtensils + 1,
      name: utensilName,
    };
    dispatch(saveUtensil(newUtensil));
    setUtensilName('');
    onUtensilsModalClose();
  };

  return (
    <>
      <Flex justifyContent="center">
        <Box borderRadius="md" w="70%" p={4} color="black" mt={20}>
          <Center fontSize="3xl" mb={3}>
            Créer une recette
          </Center>

          {/* TITLE */}
          <Flex>
            <FormControl mb={4} isRequired>
              <FormLabel>Titre</FormLabel>
              <Input
                type="text"
                placeholder="Pancakes délicieux"
                value={titleValue}
                onChange={(e) => {
                  dispatch(changeTitle(e.target.value));
                }}
              />
            </FormControl>
          </Flex>
          {/* SELECTED COMPONENTS */}
          <Flex>
            <FormControl mr={4} isRequired>
              <FormLabel>Catégorie</FormLabel>
              <SelectComponent
                options={categoriesOptions}
                value={categoryValue}
                changeValue={changeCategory}
                placeholder="catégorie"
              />
            </FormControl>
            <FormControl mr={4} isRequired>
              <FormLabel>Difficulté</FormLabel>
              <SelectComponent
                options={difficultyOptions}
                value={difficultyValue}
                changeValue={changeDifficulty}
                placeholder="difficulté"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Durée</FormLabel>
              <SelectComponent
                options={durationOptions}
                value={durationValue}
                changeValue={changeDuration}
                placeholder="durée"
              />
            </FormControl>
          </Flex>

          {/* INGREDIENT TABLE */}
          <TableContainer mt={5}>
            <Table>
              <Thead>
                <Tr>
                  <Th>Ingrédient(s)</Th>
                  <Th>Quantité(s)</Th>
                  <Th>Unitée</Th>
                  <Th>
                    <IconButton
                      variant="solid"
                      colorScheme="blue"
                      size="sm"
                      className="add_button"
                      onClick={onIngredientModalOpen}
                      icon={<AddIcon />}
                    />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {ingredientsList.map((ingredient) => (
                  <Tr id={ingredient.id} key={ingredient.id}>
                    <Td>{ingredient.name}</Td>
                    <Td>{ingredient.quantity}</Td>
                    <Td>{ingredient.unitText}</Td>
                    <IconButton
                      id={ingredient.id}
                      colorScheme="red"
                      className="delete_button"
                      size="sm"
                      onClick={(e) => {
                        dispatch(deleteIngredient(e.target.id));
                      }}
                      icon={<DeleteIcon id={ingredient.id} />}
                    />
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          {/* STEPS TABLE */}
          <TableContainer mt={10}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>étape(s)</Th>
                  <Th>description</Th>
                  <Th>
                    <IconButton
                      variant="solid"
                      colorScheme="blue"
                      className="add_button"
                      size="sm"
                      onClick={onStepsModalOpen}
                      icon={<AddIcon />}
                    />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {stepsList.map((step) => (
                  <Tr id={step.id} key={step.id}>
                    <Td>{step.id}</Td>
                    <Td>{step.description}</Td>
                    <IconButton
                      id={step.id}
                      colorScheme="red"
                      size="sm"
                      className="delete_button"
                      onClick={(e) => {
                        dispatch(deleteStep(e.target.id));
                      }}
                      icon={<DeleteIcon id={step.id} />}
                    />
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          {/* UTENSILS TABLE */}
          <TableContainer mt={10}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Ustencil(s)</Th>
                  <Th>
                    <IconButton
                      variant="solid"
                      colorScheme="blue"
                      className="add_button"
                      size="sm"
                      onClick={onUtensilsModalOpen}
                      icon={<AddIcon />}
                    />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {utensilsList.map((utensil) => (
                  <Tr key={utensil.id} id={utensil.id}>
                    <Td>{utensil.name}</Td>
                    <IconButton
                      id={utensil.id}
                      colorScheme="red"
                      className="delete_button"
                      size="sm"
                      onClick={(e) => {
                        dispatch(deleteUtensil(e.target.id));
                      }}
                      icon={<DeleteIcon id={utensil.id} />}
                    />
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <Button
            id="submit_button"
            variant="solid"
            colorScheme="green"
            size="sm"
            mt={4}
          >
            Créer la recette
          </Button>
        </Box>
      </Flex>

      {/* INGREDIENT MODAL */}
      <Modal
        isOpen={isIngredientModalOpen}
        onClose={onIngredientModalClose}
        id="modals"
      >
        <ModalOverlay />

        <ModalContent>
          <form onSubmit={handleSubmitIngredient}>
            <ModalHeader>Ajouter un ingrédient à votre recette !</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input
                  placeholder="Poivron"
                  value={ingredientName}
                  onChange={(e) => {
                    setIngredientName(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Quantité</FormLabel>
                <Input
                  placeholder="3"
                  value={ingredientQuantity}
                  onChange={(e) => {
                    setIngredientQuantity(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Unité</FormLabel>
                <SelectComponent
                  options={unitsOptions}
                  value={setIngredientUnitValue}
                  changeValue={setIngredientUnitValue}
                  text={ingredientUnitText}
                  changeText={setIngredientUnitText}
                  placeholder="unitée"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onIngredientModalClose} mr={3}>
                Annuler
              </Button>
              <Button colorScheme="blue" type="submit">
                Ajouter
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* STEPS MODAL */}
      <Modal isOpen={isStepsModalOpen} onClose={onStepsModalClose} id="modals">
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmitStep}>
            <ModalHeader>Ajouter une étape à votre recette !</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Enfournez pendant 50 min à 180°C"
                  value={stepDescription}
                  onChange={(e) => {
                    setStepDescription(e.target.value);
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onStepsModalClose} mr={3}>
                Annuler
              </Button>
              <Button type="submit" colorScheme="blue">
                Ajouter
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* UTENSILS MODAL */}
      <Modal
        isOpen={isUtensilsModalOpen}
        onClose={onUtensilsModalClose}
        id="modals"
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmitUtensil}>
            <ModalHeader>Ajouter un ustensile à votre recette !</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input
                  placeholder="Casserol"
                  value={utensilName}
                  onChange={(e) => {
                    setUtensilName(e.target.value);
                  }}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onUtensilsModalClose} mr={3}>
                Annuler
              </Button>
              <Button colorScheme="blue" type="submit">
                Ajouter
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
AddRecipeForm.propTypes = {
  isFormIsEdit: PropTypes.bool.isRequired,
};

export default AddRecipeForm;
